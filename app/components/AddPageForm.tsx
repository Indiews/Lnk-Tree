"use client";

import { useActionState } from "react";
import { addPage } from "@/app/actions/pages";
import { Plus, AlertCircle, CheckCircle2 } from "lucide-react";

const initialState = {
    success: false,
    error: "",
};

export function AddPageForm() {
    const [state, formAction, isPending] = useActionState(addPage, initialState);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Create New Page</h3>
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
                        Page created successfully!
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-5 w-full items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Title</label>
                        <input type="text" name="name" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm" placeholder="My Tech Portfolio" />
                    </div>
                    <div className="flex-1 w-full relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Slug</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-gray-400 text-sm font-mono pointer-events-none">/</span>
                            <input type="text" name="slug" required className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm font-mono" placeholder="portfolio" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200 h-[42px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Creating..." : "Create Page"}
                    </button>
                </div>
            </form>
        </div>
    );
}
