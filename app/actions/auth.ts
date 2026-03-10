"use server";

import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { encrypt, encryptPending2FA, decryptPending2FA } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { verifyTOTPCode } from "@/app/lib/totp";
import { headers } from "next/headers";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;

async function getClientIP(): Promise<string> {
    const headerList = await headers();
    return headerList.get("x-forwarded-for")?.split(",")[0]?.trim()
        || headerList.get("x-real-ip")
        || "unknown";
}

async function checkRateLimit(ip: string): Promise<boolean> {
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

    const attempts = await prisma.loginAttempt.count({
        where: {
            ipAddress: ip,
            attemptTime: { gte: windowStart },
        },
    });

    return attempts < MAX_ATTEMPTS;
}

async function recordAttempt(ip: string) {
    await prisma.loginAttempt.create({
        data: { ipAddress: ip },
    });
}

async function clearAttempts(ip: string) {
    await prisma.loginAttempt.deleteMany({
        where: { ipAddress: ip },
    });
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Please provide both email and password." };
    }

    // Rate limiting
    const ip = await getClientIP();
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
        return { error: "Too many failed attempts. Please try again in 15 minutes." };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        await recordAttempt(ip);
        return { error: "Invalid credentials." };
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
        await recordAttempt(ip);
        return { error: "Invalid credentials." };
    }

    // Clear rate limit on success
    await clearAttempts(ip);

    // Check if 2FA is enabled
    if (user.twoFactorEnabled && user.twoFactorSecret) {
        // Issue a short-lived pending 2FA token
        const pending2FAToken = await encryptPending2FA(user.id);

        const cookieStore = await cookies();
        cookieStore.set("pending_2fa", pending2FAToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 5 * 60, // 5 minutes
        });

        return { requires2FA: true };
    }

    // No 2FA — create session directly
    const sessionData = { userId: user.id, email: user.email, permission: user.permission };
    const token = await encrypt(sessionData);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
    });

    redirect("/dashboard");
}

export async function verify2FA(prevState: any, formData: FormData) {
    const code = formData.get("code") as string;

    if (!code || code.length !== 6) {
        return { error: "Please enter a valid 6-digit code." };
    }

    const cookieStore = await cookies();
    const pendingToken = cookieStore.get("pending_2fa")?.value;

    if (!pendingToken) {
        return { error: "Session expired. Please log in again." };
    }

    const pending = await decryptPending2FA(pendingToken);
    if (!pending) {
        cookieStore.delete("pending_2fa");
        return { error: "Session expired. Please log in again." };
    }

    const user = await prisma.user.findUnique({
        where: { id: pending.userId },
    });

    if (!user || !user.twoFactorSecret) {
        cookieStore.delete("pending_2fa");
        return { error: "User not found." };
    }

    const isValid = verifyTOTPCode(user.twoFactorSecret, code);
    if (!isValid) {
        return { error: "Invalid code. Please try again." };
    }

    // Clear pending token
    cookieStore.delete("pending_2fa");

    // Create session
    const sessionData = { userId: user.id, email: user.email, permission: user.permission };
    const token = await encrypt(sessionData);

    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    redirect("/dashboard");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.delete("pending_2fa");
    redirect("/login");
}
