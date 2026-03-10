import { prisma } from "@/app/lib/prisma";
import { addLink, deleteLink, updateLinkOrder } from "@/app/actions/links";
import { ArrowDown, ArrowUp, Link as LinkIcon, Trash2, BarChart2, QrCode } from "lucide-react";
import { AddLinkForm } from "@/app/components/AddLinkForm";
import { LinkQRCode } from "@/app/components/LinkQRCode";
import Link from "next/link";

export default async function LinksPage() {
    const links = await prisma.link.findMany({
        orderBy: { order: "asc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Links</h2>
                    <p className="text-sm text-gray-500 mt-1">Create and track your custom short links.</p>
                </div>
            </div>

            <AddLinkForm />

            {/* Links List */}
            <div className="space-y-4">
                {links.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                        <p className="font-semibold text-gray-500">No links added yet.</p>
                        <p className="text-sm text-gray-400 mt-1">Create your first link above to see it here.</p>
                    </div>
                ) : (
                    links.map((link: any) => (
                        <div key={link.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all gap-4">
                            <div className="flex flex-col">
                                <h4 className="font-bold text-gray-900">{link.name}</h4>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="font-mono text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                                        /{link.slug}
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                        {link.clicks} clicks
                                    </span>
                                </div>
                                <a href={link.link} target="_blank" rel="noreferrer" className="block text-sm text-blue-500 hover:text-blue-600 font-medium hover:underline truncate max-w-sm mt-2 flex items-center gap-1.5">
                                    <LinkIcon className="w-3.5 h-3.5" /> {link.link}
                                </a>
                            </div>
                            <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href={`/dashboard/links/${link.id}`} title="View Analytics" className="p-2.5 rounded-xl border border-gray-200 text-blue-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors bg-white shadow-sm">
                                    <BarChart2 className="w-4 h-4" />
                                </Link>
                                <LinkQRCode slug={link.slug} linkName={link.name} />
                                <div className="w-px h-6 bg-gray-200 mx-1"></div>
                                <form action={async () => { "use server"; await updateLinkOrder(link.id, link.order - 1); }}>
                                    <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:hover:bg-transparent" disabled={link.order <= 0}>
                                        <ArrowUp className="w-4 h-4" />
                                    </button>
                                </form>
                                <form action={async () => { "use server"; await updateLinkOrder(link.id, link.order + 1); }}>
                                    <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                        <ArrowDown className="w-4 h-4" />
                                    </button>
                                </form>
                                <form action={async () => { "use server"; await deleteLink(link.id); }}>
                                    <button className="p-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors bg-red-50/50">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
