import { prisma } from "@/app/lib/prisma";
import { addPage, deletePage, setHomePage } from "@/app/actions/pages";
import { Trash2, Settings, FileText, Globe, Home, BarChart3 } from "lucide-react";
import { AddPageForm } from "@/app/components/AddPageForm";
import Link from "next/link";

export default async function PagesPage() {
    const pages = await prisma.page.findMany({
        orderBy: { id: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Pages</h2>
                    <p className="text-sm text-gray-500 mt-1">Create multiple link tree pages with unique styles.</p>
                </div>
            </div>

            <AddPageForm />

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                        <p className="font-semibold text-gray-500">No pages created yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Create your first custom page above.</p>
                    </div>
                ) : (
                    pages.map((page: any) => (
                        <div key={page.id} className={`group flex flex-col p-6 bg-white rounded-2xl border ${page.isHome ? 'border-2 border-indigo-500 shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md'} transition-all gap-4 ring-1 ring-transparent hover:ring-indigo-50`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg" style={{ backgroundColor: page.bkcolor + '20', color: page.btbkcolor !== '#ffffff' ? page.btbkcolor : '#000' }}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    {page.isHome && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                                            <Home className="w-3.5 h-3.5" /> Homepage
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!page.isHome && (
                                        <form action={async () => { "use server"; await setHomePage(page.id); }}>
                                            <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors tooltip" title="Set as Global Homepage">
                                                <Home className="w-4 h-4" />
                                            </button>
                                        </form>
                                    )}
                                    <Link href={`/dashboard/pages/${page.id}/analytics`} className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 transition-colors" title="View Analytics">
                                        <BarChart3 className="w-4 h-4" />
                                    </Link>
                                    <Link href={`/dashboard/pages/${page.id}`} className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors">
                                        <Settings className="w-4 h-4" />
                                    </Link>
                                    <form action={async () => { "use server"; await deletePage(page.id); }}>
                                        <button className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-lg mb-1">{page.name}</h4>
                                <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-mono text-gray-500 hover:text-indigo-600 hover:underline">
                                    <Globe className="w-3.5 h-3.5" /> /{page.slug}
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
