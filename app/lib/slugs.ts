import { prisma } from "./prisma";

/**
 * Checks if a slug is available globally across both Links and Pages.
 * 
 * @param slug The slug to check
 * @param excludePageId (Optional) ID of a page to exclude from the check (useful for updates)
 * @param excludeLinkId (Optional) ID of a link to exclude from the check (useful for future link updates)
 * @returns boolean True if the slug is available, false otherwise
 */
export async function isSlugAvailable(slug: string, excludePageId?: number, excludeLinkId?: number) {
    // Check Links
    const link = await prisma.link.findUnique({
        where: { slug }
    });

    if (link && link.id !== excludeLinkId) {
        return false;
    }

    // Check Pages
    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (page && page.id !== excludePageId) {
        return false;
    }

    return true;
}
