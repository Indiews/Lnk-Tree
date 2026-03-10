import { prisma } from "@/app/lib/prisma";
import { updateSettings } from "@/app/actions/settings";
import { Paintbrush, Settings2 } from "lucide-react";

export default async function SettingsPage() {
    const settings = await prisma.website.findFirst();

    if (!settings) {
        return <div className="p-8 text-center text-gray-500">Settings not found. Please run the database seed.</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Configure your brand identity and colors.</p>
                </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <form action={updateSettings} className="space-y-8">
                    {/* General Settings */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Settings2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">General Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website Name</label>
                                <input type="text" name="webname" defaultValue={settings.webname} required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Logo Image URL</label>
                                <input type="url" name="logo" defaultValue={settings.logo} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" />
                                <p className="text-xs font-medium mt-1.5 text-gray-400">Provide a direct URL to your logo.</p>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <input type="text" name="description" defaultValue={settings.description} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Appearance Settings */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Paintbrush className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">Appearance Settings</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Background Color</label>
                                <div className="flex gap-4 items-center">
                                    <input type="color" name="bkcolor" defaultValue={settings.bkcolor} className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-white border border-gray-200" />
                                    <span className="font-mono text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{settings.bkcolor}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Link Button Fill</label>
                                <div className="flex gap-4 items-center">
                                    <input type="color" name="btbkcolor" defaultValue={settings.btbkcolor} className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-white border border-gray-200" />
                                    <span className="font-mono text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{settings.btbkcolor}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Text & Borders</label>
                                <div className="flex gap-4 items-center">
                                    <input type="color" name="btbocolor" defaultValue={settings.btbocolor} className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-white border border-gray-200" />
                                    <span className="font-mono text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200">{settings.btbocolor}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-200 flex items-center justify-center gap-2">
                            <Settings2 className="w-5 h-5" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
