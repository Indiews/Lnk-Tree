"use client";

import { useActionState } from "react";
import { updatePage } from "@/app/actions/pages";
import { AlertCircle, CheckCircle2, Palette } from "lucide-react";

const initialState = {
    success: false,
    error: "",
};

export function UpdatePageForm({ page }: { page: any }) {
    // We need a wrapped action because updatePage expects (id, formData)
    const updatePageWithId = (state: any, formData: FormData) => updatePage(page.id, state, formData);
    const [state, formAction, isPending] = useActionState(updatePageWithId, initialState);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-indigo-500" />
                Page Appearance
            </h3>

            <form action={formAction} className="space-y-5">
                {state?.error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {state.error}
                    </div>
                )}
                {state?.success && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Appearance saved successfully!
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Title</label>
                        <input type="text" name="name" defaultValue={page.name} required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug</label>
                        <input type="text" name="slug" defaultValue={page.slug} required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm font-mono" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Logo URL (Optional)</label>
                    <input type="url" name="logo" defaultValue={page.logo || ""} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" placeholder="https://example.com/logo.png" />
                    <p className="text-xs text-gray-400 mt-1">Leave empty to use the default fallback (first letter of title).</p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio / Description</label>
                    <textarea name="description" defaultValue={page.description || ""} rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Background</label>
                        <div className="flex items-center gap-3">
                            <input type="color" name="bkcolor" defaultValue={page.bkcolor} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
                            <span className="text-sm font-mono text-gray-500 uppercase">{page.bkcolor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Button BG</label>
                        <div className="flex items-center gap-3">
                            <input type="color" name="btbkcolor" defaultValue={page.btbkcolor} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
                            <span className="text-sm font-mono text-gray-500 uppercase">{page.btbkcolor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Button Text</label>
                        <div className="flex items-center gap-3">
                            <input type="color" name="btbocolor" defaultValue={page.btbocolor} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
                            <span className="text-sm font-mono text-gray-500 uppercase">{page.btbocolor}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200 h-[42px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Saving..." : "Save Appearance"}
                    </button>
                </div>
            </form>
        </div>
    );
}
