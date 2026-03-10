"use client";

import { useActionState } from "react";
import { addLink } from "@/app/actions/links";
import { Plus, Link as LinkIcon, AlertCircle, CheckCircle2 } from "lucide-react";

const initialState = {
    success: false,
    error: "",
};

export function AddLinkForm() {
    const [state, formAction, isPending] = useActionState(addLink, initialState);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Add New Link</h3>
            </div>

            <form action={formAction} className="flex flex-col gap-5">
                {state?.error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {state.error}
                    </div>
                )}
                {state?.success && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Link added successfully!
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="flex-1 w-full relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link Title</label>
                        <input type="text" name="name" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="My Awesome Portfolio" />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Slug</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-gray-400 text-sm font-mono pointer-events-none">/</span>
                            <input type="text" name="slug" required className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-mono" placeholder="portfolio" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 w-full items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination URL</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                            <input type="url" name="link" required className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="https://example.com" />
                        </div>
                    </div>
                    <div className="w-full md:w-28">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order</label>
                        <input type="number" name="order" defaultValue={0} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200 h-[42px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Saving..." : "Save Link"}
                    </button>
                </div>
            </form>
        </div>
    );
}
