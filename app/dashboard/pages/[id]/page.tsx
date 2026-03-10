import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Globe, LinkIcon, Settings2 } from "lucide-react";
import { updatePage, togglePageLink } from "@/app/actions/pages";
import { UpdatePageForm } from "@/app/components/UpdatePageForm";
import { notFound } from "next/navigation";

export default async function PageEditor(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const pageId = parseInt(params.id);

    if (isNaN(pageId)) return notFound();

    // Fetch the page with its attached links
    const page = await prisma.page.findUnique({
        where: { id: pageId },
        include: {
            links: true
        }
    });

    if (!page) return notFound();

    // Fetch ALL global links to let the user pick from
    const allGlobalLinks = await prisma.link.findMany({
        orderBy: { order: "asc" }
    });

    const attachedLinkIds = new Set(page.links.map((pl: any) => pl.linkId));

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/pages" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Editing: {page.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline text-sm font-mono flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" /> /{page.slug}
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Left Column: Appearance & Details */}
                <div className="space-y-8">
                    <UpdatePageForm page={page} />
                </div>

                {/* Right Column: Link Attachments */}
                <div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative h-full flex flex-col">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-indigo-500" />
                            Attached Global Links
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">Select which links from your global pool should appear on this particular page. You can manage the actual URLs in the main <Link href="/dashboard/links" className="text-indigo-500 hover:underline">Links page</Link>.</p>

                        <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                            {allGlobalLinks.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="font-semibold text-gray-500 text-sm">No global links exist.</p>
                                    <Link href="/dashboard/links" className="text-indigo-600 hover:underline text-xs mt-1 block">Create global links first</Link>
                                </div>
                            ) : (
                                allGlobalLinks.map((link: any) => {
                                    const isAttached = attachedLinkIds.has(link.id);
                                    return (
                                        <div key={link.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isAttached ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                            <div className="flex flex-col">
                                                <span className={`font-semibold text-sm ${isAttached ? 'text-indigo-900' : 'text-gray-900'}`}>{link.name}</span>
                                                <span className="text-xs text-gray-500 font-mono mt-0.5 truncate max-w-[200px] md:max-w-xs">{link.link}</span>
                                            </div>
                                            <form action={async () => { "use server"; await togglePageLink(page.id, link.id, isAttached); }}>
                                                <button type="submit" className={`p-2 rounded-lg border transition-all flex items-center gap-2 text-xs font-semibold ${isAttached ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
                                                    {isAttached ? (
                                                        <><Check className="w-3.5 h-3.5" /> Added</>
                                                    ) : (
                                                        <><Plus className="w-3.5 h-3.5" /> Add</>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
