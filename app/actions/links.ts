"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { isSlugAvailable } from "@/app/lib/slugs";

export async function addLink(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const slug = formData.get("slug") as string;
    const order = parseInt(formData.get("order") as string || "0");

    if (!name || !link || !slug) {
        return { success: false, error: "Name, Link, and Slug are required" };
    }

    const available = await isSlugAvailable(slug);
    if (!available) {
        return { success: false, error: "Slug is already being used by another link or page" };
    }

    await prisma.link.create({
        data: { name, link, slug, order },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/links");
    return { success: true };
}

export async function deleteLink(id: number) {
    await prisma.link.delete({
        where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/links");
}

export async function updateLinkOrder(id: number, order: number) {
    await prisma.link.update({
        where: { id },
        data: { order },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/links");
}
