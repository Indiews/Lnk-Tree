import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/auth";
import DashboardClientShell from "@/app/components/DashboardClientShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    let user = { name: "Admin", surname: "User", email: "admin@lnktree.com" };

    if (sessionToken) {
        try {
            const payload = await decrypt(sessionToken);
            const dbUser = await prisma.user.findUnique({
                where: { id: payload.userId as number },
                select: { name: true, surname: true, email: true }
            });
            if (dbUser) {
                user = dbUser;
            }
        } catch (e) {
            // Fallback to placeholder or handle error
        }
    }

    return (
        <DashboardClientShell user={user}>
            {children}
        </DashboardClientShell>
    );
}
