"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { isSlugAvailable } from "@/app/lib/slugs";

export async function addPage(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    if (!name || !slug) {
        return { success: false, error: "Name and Slug are required" };
    }

    const available = await isSlugAvailable(slug);
    if (!available) {
        return { success: false, error: "Slug is already being used by another link or page" };
    }

    try {
        await prisma.page.create({
            data: {
                name,
                slug,
            },
        });
        revalidatePath("/dashboard/pages");
        return { success: true };
    } catch (e) {
        console.error("Failed to create page", e);
        return { success: false, error: "Failed to create page" };
    }
}

export async function deletePage(id: number) {
    try {
        await prisma.page.delete({
            where: { id },
        });
        revalidatePath("/dashboard/pages");
    } catch (e) {
        console.error("Failed to delete page", e);
    }
}

export async function updatePage(id: number, prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const bkcolor = formData.get("bkcolor") as string;
    const btbkcolor = formData.get("btbkcolor") as string;
    const btbocolor = formData.get("btbocolor") as string;
    const logo = formData.get("logo") as string;

    const available = await isSlugAvailable(slug, id);
    if (!available) {
        return { success: false, error: "Slug is already being used by another link or page" };
    }

    try {
        await prisma.page.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                bkcolor,
                btbkcolor,
                btbocolor,
                logo: logo || null,
            },
        });
        revalidatePath(`/dashboard/pages/${id}`);
        return { success: true };
    } catch (e) {
        console.error("Failed to update page", e);
        return { success: false, error: "Failed to update page" };
    }
}

export async function togglePageLink(pageId: number, linkId: number, isAttached: boolean) {
    try {
        if (isAttached) {
            // Detach finding the junction record
            await prisma.pageLink.delete({
                where: {
                    pageId_linkId: {
                        pageId,
                        linkId,
                    }
                }
            });
        } else {
            // Attach
            await prisma.pageLink.create({
                data: {
                    pageId,
                    linkId,
                    order: 0,
                }
            });
        }
        revalidatePath(`/dashboard/pages/${pageId}`);
    } catch (e) {
        console.error("Failed to toggle page link", e);
    }
}

export async function setHomePage(id: number) {
    try {
        await prisma.$transaction([
            prisma.page.updateMany({
                data: { isHome: false }
            }),
            prisma.page.update({
                where: { id },
                data: { isHome: true }
            })
        ]);
        revalidatePath("/dashboard/pages");
        revalidatePath("/");
    } catch (e) {
        console.error("Failed to set home page", e);
    }
}
