"use server";

import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { decrypt } from "@/app/lib/auth";
import { generateTOTPSecret, verifyTOTPCode } from "@/app/lib/totp";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

async function getCurrentUserId(): Promise<number | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    if (!sessionToken) return null;

    try {
        const payload = await decrypt(sessionToken);
        return payload.userId as number;
    } catch {
        return null;
    }
}

/**
 * Step 1: Generate TOTP secret and return the provisioning URI for QR code.
 */
export async function enable2FA() {
    const userId = await getCurrentUserId();
    if (!userId) return { error: "Not authenticated." };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { error: "User not found." };

    if (user.twoFactorEnabled) {
        return { error: "2FA is already enabled." };
    }

    const { secret, uri } = generateTOTPSecret(user.email);

    // Temporarily store the secret (not yet confirmed)
    await prisma.user.update({
        where: { id: userId },
        data: { twoFactorSecret: secret },
    });

    return { success: true, uri, secret };
}

/**
 * Step 2: User enters the first code from their authenticator to confirm setup.
 */
export async function confirm2FA(prevState: any, formData: FormData) {
    const code = formData.get("code") as string;

    if (!code || code.length !== 6) {
        return { error: "Please enter a valid 6-digit code." };
    }

    const userId = await getCurrentUserId();
    if (!userId) return { error: "Not authenticated." };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.twoFactorSecret) {
        return { error: "2FA setup not started. Please try again." };
    }

    const isValid = verifyTOTPCode(user.twoFactorSecret, code);
    if (!isValid) {
        return { error: "Invalid code. Please check your authenticator and try again." };
    }

    await prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
    });

    revalidatePath("/dashboard/security");
    return { success: true };
}

/**
 * Disable 2FA (requires password confirmation).
 */
export async function disable2FA(prevState: any, formData: FormData) {
    const password = formData.get("password") as string;

    if (!password) {
        return { error: "Please enter your password to confirm." };
    }

    const userId = await getCurrentUserId();
    if (!userId) return { error: "Not authenticated." };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { error: "User not found." };

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
        return { error: "Incorrect password." };
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            twoFactorEnabled: false,
            twoFactorSecret: null,
        },
    });

    revalidatePath("/dashboard/security");
    return { success: true };
}

/**
 * Change password (requires current password).
 */
export async function changePassword(prevState: any, formData: FormData) {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: "All fields are required." };
    }

    if (newPassword.length < 8) {
        return { error: "New password must be at least 8 characters." };
    }

    if (newPassword !== confirmPassword) {
        return { error: "New passwords do not match." };
    }

    const userId = await getCurrentUserId();
    if (!userId) return { error: "Not authenticated." };

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { error: "User not found." };

    const isCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrect) {
        return { error: "Current password is incorrect." };
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
    });

    revalidatePath("/dashboard/security");
    return { success: true };
}
