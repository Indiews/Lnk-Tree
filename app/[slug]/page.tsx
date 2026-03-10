import { prisma } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { userAgentFromString } from "next/server";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const page = await prisma.page.findUnique({
        where: { slug: params.slug },
        select: { name: true }
    });

    if (!page) return { title: "Not Found | Lnk-Tree" };

    return {
        title: `${page.name} | Lnk-Tree`
    };
}

export default async function PublicPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = params.slug;

    // Fetch the page based on the slug, and include its associated links
    const page = await prisma.page.findUnique({
        where: { slug: slug },
        include: {
            links: {
                include: {
                    link: true // fetch the global link details
                },
                orderBy: { order: "asc" }
            }
        }
    });

    if (!page) {
        // If it's not a page, check if it's a URL shortener link
        let redirectUrl = "";

        try {
            const link = await prisma.link.update({
                where: { slug: slug },
                data: {
                    clicks: {
                        increment: 1
                    }
                }
            });

            redirectUrl = link.link;

            // Track analytics
            try {
                const headerList = await headers();
                const userAgentStr = headerList.get("user-agent") || "";
                const { browser, os, device } = userAgentFromString(userAgentStr);
                const referer = headerList.get("referer") || headerList.get("referrer");
                let country = headerList.get("x-geoip-country") || headerList.get("x-country-code") || "Unknown";
                const city = headerList.get("x-geoip-city") || "Unknown";

                if (country === "Unknown") {
                    const acceptLang = headerList.get("accept-language");
                    if (acceptLang) {
                        const primaryLocale = acceptLang.split(",")[0];
                        if (primaryLocale && primaryLocale.includes("-")) {
                            country = primaryLocale.split("-")[1].toUpperCase();
                        }
                    }
                }

                let extractedReferer = "Direct";
                if (referer) {
                    try {
                        extractedReferer = new URL(referer).hostname;
                    } catch {
                        extractedReferer = referer;
                    }
                }

                await prisma.linkAnalytics.create({
                    data: {
                        linkId: link.id,
                        browser: browser.name || "Unknown",
                        os: os.name || "Unknown",
                        device: device.type || "desktop",
                        referer: extractedReferer,
                        country: country || "Unknown",
                        city: city || "Unknown"
                    }
                });
            } catch (analyticsError) {
                console.error("Failed to track analytics:", analyticsError);
            }
        } catch (e) {
            // Slug is neither a page nor a link
            return notFound();
        }

        // Redirect if it was a link
        if (redirectUrl) {
            redirect(redirectUrl);
        }

        // If it was not a link either, we return notFound.
        return notFound();
    }

    // Track page view
    try {
        const headerList = await headers();
        const userAgentStr = headerList.get("user-agent") || "";
        const { browser, os, device } = userAgentFromString(userAgentStr);
        const referer = headerList.get("referer") || headerList.get("referrer");
        let country = headerList.get("x-geoip-country") || headerList.get("x-country-code") || "Unknown";
        const city = headerList.get("x-geoip-city") || "Unknown";

        if (country === "Unknown") {
            const acceptLang = headerList.get("accept-language");
            if (acceptLang) {
                const primaryLocale = acceptLang.split(",")[0];
                if (primaryLocale && primaryLocale.includes("-")) {
                    country = primaryLocale.split("-")[1].toUpperCase();
                }
            }
        }

        let extractedReferer = "Direct";
        if (referer) {
            try {
                extractedReferer = new URL(referer).hostname;
            } catch {
                extractedReferer = referer;
            }
        }

        await prisma.pageAnalytics.create({
            data: {
                pageId: page.id,
                browser: browser.name || "Unknown",
                os: os.name || "Unknown",
                device: device.type || "desktop",
                referer: extractedReferer,
                country: country || "Unknown",
                city: city || "Unknown"
            }
        });
    } catch (trackError) {
        console.error("Failed to track page view:", trackError);
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center py-20 px-4 transition-colors font-sans"
            style={{ backgroundColor: page.bkcolor }}
        >
            <div className="w-full max-w-md flex flex-col items-center">
                {/* Profile Placeholder / Logo */}
                {page.logo ? (
                    <img src={page.logo} alt={page.name} className="w-24 h-24 rounded-full shadow-lg mb-6 object-cover border-4 border-white/20" />
                ) : (
                    <div className="w-24 h-24 rounded-full shadow-lg mb-6 bg-white flex items-center justify-center text-3xl font-bold border-4 border-white/20" style={{ color: page.btbkcolor }}>
                        {page.name.charAt(0).toUpperCase()}
                    </div>
                )}

                <h1 className="text-2xl font-bold text-center mb-2" style={{ color: page.btbocolor }}>
                    {page.name}
                </h1>

                {page.description && (
                    <p className="text-center font-medium opacity-80 mb-8 max-w-sm" style={{ color: page.btbocolor }}>
                        {page.description}
                    </p>
                )}

                <div className="w-full flex flex-col gap-4 mt-4">
                    {page.links.map((pageLink: any) => {
                        const l = pageLink.link;
                        return (
                            <a
                                key={l.id}
                                href={`/${l.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md hover:shadow-lg"
                                style={{
                                    backgroundColor: page.btbkcolor,
                                    color: page.btbocolor,
                                    border: `2px solid ${page.btbocolor}20`
                                }}
                            >
                                {l.name}
                            </a>
                        );
                    })}
                </div>

                <div className="mt-16 opactiy-50 pt-8 border-t border-black/10 w-full text-center">
                    <a href="/" className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity" style={{ color: page.btbocolor }}>
                        Powered by Lnk-Tree
                    </a>
                </div>
            </div>
        </div>
    );
}
