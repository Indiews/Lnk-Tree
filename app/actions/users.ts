"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import crypto from 'crypto';
import { sendInvitationEmail } from "@/app/lib/email";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth";

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

export async function inviteUser(formData: FormData) {
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const email = formData.get("email") as string;
    const permission = formData.get("permission") as string || "admin";

    if (!name || !email) {
        console.error("Missing required fields.");
        return { success: false, error: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        console.error("Email already in use.");
        return { success: false, error: "Email already in use." };
    }

    // Check if there's already a pending invitation
    const existingInvite = await (prisma as any).invitation.findUnique({ where: { email } });
    if (existingInvite) {
        console.error("User already has a pending invitation.");
        return { success: false, error: "User already has a pending invitation." };
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // Expires in 24 hours

    try {
        await (prisma as any).invitation.create({
            data: {
                name,
                surname,
                email,
                role: permission,
                token,
                expires,
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const inviteUrl = `${baseUrl}/invite/${token}`;

        // Send email
        const emailSent = await sendInvitationEmail(email, inviteUrl, "Admin");

        if (!emailSent) {
            console.error("Failed to send invitation email.");
            return { success: false, error: "Failed to send invitation email but invitation was created." };
        }

        revalidatePath("/dashboard/team");
        return { success: true };
    } catch (error) {
        console.error("Error creating invitation:", error);
        return { success: false, error: "Internal server error" };
    }
}

export async function deleteUser(id: number) {
    // Prevent deleting everyone to avoid locking out. Add minimum 1 user check if needed.
    const count = await prisma.user.count();
    if (count <= 1) {
        console.error("Cannot delete the last user.");
        return;
    }

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/dashboard/team");
}

export async function updateProfile(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const email = formData.get("email") as string;

    if (!name || !surname || !email) {
        return { error: "All fields are required." };
    }

    const userId = await getCurrentUserId();
    if (!userId) return { error: "Not authenticated." };

    try {
        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
                NOT: { id: userId }
            }
        });

        if (existingUser) {
            return { error: "Email already in use by another user." };
        }

        await prisma.user.update({
            where: { id: userId },
            data: { name, surname, email },
        });

        revalidatePath("/dashboard/profile");
        // Also revalidate layout to update sidebar
        revalidatePath("/dashboard", "layout");

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile." };
    }
}
