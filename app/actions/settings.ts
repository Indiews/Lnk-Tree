"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
    const webname = formData.get("webname") as string;
    const description = formData.get("description") as string;
    const logo = formData.get("logo") as string || "";
    const bkcolor = formData.get("bkcolor") as string;
    const btbkcolor = formData.get("btbkcolor") as string;
    const btbocolor = formData.get("btbocolor") as string;

    // Assuming there's only one settings row (ID 1) created by the seed
    await prisma.website.update({
        where: { id: 1 },
        data: {
            webname,
            description,
            logo,
            bkcolor,
            btbkcolor,
            btbocolor,
        },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/settings");
}
