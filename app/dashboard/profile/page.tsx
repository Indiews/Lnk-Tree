import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import ProfileClient from "@/app/components/ProfileClient";

export const dynamic = "force-dynamic";

async function getCurrentUser() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    if (!sessionToken) return null;

    try {
        const payload = await decrypt(sessionToken);
        const userId = payload.userId as number;
        return await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                twoFactorEnabled: true,
            }
        });
    } catch {
        return null;
    }
}

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Update your personal information and security preferences.</p>
                </div>
            </div>

            <ProfileClient user={user} />
        </div>
    );
}
