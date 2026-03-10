import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { ArrowRight, Globe, Layers, Link as LinkIcon, Shield } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const homePage = await prisma.page.findFirst({
        where: { isHome: true },
        select: { name: true }
    });

    if (homePage) {
        return {
            title: `${homePage.name}`
        };
    }

    return {
        title: "Lnk-Tree | Infinite Custom Pages"
    };
}

export const dynamic = "force-dynamic";

export default async function IndexPage() {
    const homePage = await prisma.page.findFirst({
        where: { isHome: true },
        include: {
            links: {
                include: {
                    link: true // fetch the global link details
                },
                orderBy: { order: "asc" }
            }
        }
    });

    if (homePage) {
        // Render the Custom Page as the root
        return (
            <div
                className="min-h-screen flex flex-col items-center py-20 px-4 transition-colors font-sans"
                style={{ backgroundColor: homePage.bkcolor }}
            >
                <div className="w-full max-w-md flex flex-col items-center">
                    {/* Profile Placeholder / Logo */}
                    {homePage.logo ? (
                        <img src={homePage.logo} alt={homePage.name} className="w-24 h-24 rounded-full shadow-lg mb-6 object-cover border-4 border-white/20" />
                    ) : (
                        <div className="w-24 h-24 rounded-full shadow-lg mb-6 bg-white flex items-center justify-center text-3xl font-bold border-4 border-white/20" style={{ color: homePage.btbkcolor }}>
                            {homePage.name.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <h1 className="text-2xl font-bold text-center mb-2" style={{ color: homePage.btbocolor }}>
                        {homePage.name}
                    </h1>

                    {homePage.description && (
                        <p className="text-center font-medium opacity-80 mb-8 max-w-sm" style={{ color: homePage.btbocolor }}>
                            {homePage.description}
                        </p>
                    )}

                    <div className="w-full flex flex-col gap-4 mt-4">
                        {homePage.links.map((pageLink: any) => {
                            const l = pageLink.link;
                            return (
                                <a
                                    key={l.id}
                                    href={`/${l.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md hover:shadow-lg"
                                    style={{
                                        backgroundColor: homePage.btbkcolor,
                                        color: homePage.btbocolor,
                                        border: `2px solid ${homePage.btbocolor}20`
                                    }}
                                >
                                    {l.name}
                                </a>
                            );
                        })}
                    </div>

                    
                </div>
            </div>
        );
    }

    // Default Landing Page if no homepage is set
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100">
            {/* Header */}
            <header className="absolute top-0 w-full p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-950">
                    <Layers className="w-6 h-6 text-indigo-600" />
                    Lnk-Tree
                </div>
                <nav className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Log in</Link>
                    <Link href="/login" className="text-sm font-semibold bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-indigo-700 transition-all">Get Started</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50 to-transparent -z-10" />

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
                    One global link system.<br />
                    <span className="text-indigo-600">Infinite custom pages.</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Create beautiful, branded link-in-bio pages. Manage a global library of short links and attach them to as many custom profiles as you need. Full GDPR-compliant analytics included.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <Link href="/login" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                        Start for free <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-bold border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all text-center">
                        Explore Features
                    </Link>
                </div>

                {/* Feature Grid */}
                <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto px-6 text-left">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                            <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Decoupled Links</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">Links are no longer tied to one page. Build a global library of short URLs and attach them anywhere.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">Custom Slugs & Pages</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">Create dozens of specific profiles (`/portfolio`, `/store`) with entirely distinct aesthetic styles.</p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">GDPR Compliant</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">Detailed device and geo-analytics gathered automatically via privacy-first header extraction.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
