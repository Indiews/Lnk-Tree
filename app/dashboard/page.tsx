import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { BarChart3, LinkIcon, FileText, MousePointerClick, TrendingUp, Eye } from "lucide-react";
import { ClicksOverTimeChart } from "@/app/components/AnalyticsCharts";
import { FlagImage } from "@/app/components/FlagImage";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
    const [links, pages, recentClicks] = await Promise.all([
        prisma.link.findMany({
            include: { analytics: true },
            orderBy: { clicks: "desc" }
        }),
        prisma.page.findMany({
            include: { analytics: true }
        }),
        prisma.linkAnalytics.findMany({
            orderBy: { timestamp: "desc" },
            take: 10,
            include: { link: true }
        })
    ]);

    const totalLinks = links.length;
    const totalPages = pages.length;
    const totalClicks = links.reduce((sum: number, l: any) => sum + l.analytics.length, 0);
    const totalPageViews = pages.reduce((sum: number, p: any) => sum + p.analytics.length, 0);

    // Top 10 most clicked links
    const topLinks = links
        .map((l: any) => ({ id: l.id, name: l.name, slug: l.slug, clicks: l.analytics.length }))
        .sort((a: any, b: any) => b.clicks - a.clicks)
        .slice(0, 10);

    // Clicks over time (last 30 days) — combined from all links
    const now = new Date();
    const clicksByDay: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        clicksByDay[d.toISOString().split("T")[0]] = 0;
    }
    links.forEach((l: any) => {
        l.analytics.forEach((a: any) => {
            const key = new Date(a.timestamp).toISOString().split("T")[0];
            if (clicksByDay[key] !== undefined) clicksByDay[key]++;
        });
    });
    const clicksOverTime = Object.entries(clicksByDay).map(([date, clicks]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clicks
    }));

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Your link ecosystem at a glance.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <LinkIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Total Links</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalLinks}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Total Pages</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalPages}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <MousePointerClick className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Total Link Clicks</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalClicks}</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                        <Eye className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500">Total Page Views</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalPageViews}</h3>
                    </div>
                </div>
            </div>

            {/* Global Clicks Over Time Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500" /> All Clicks Over Time (Last 30 Days)
                </h4>
                <ClicksOverTimeChart data={clicksOverTime} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Most Clicked Links */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-500" /> Most Clicked Links
                    </h4>
                    {topLinks.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No links created yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {topLinks.map((link: any, index: number) => (
                                <Link key={link.id} href={`/dashboard/links/${link.id}`} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-colors border border-gray-100 hover:border-indigo-200 group">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${index < 3 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-semibold text-gray-800 group-hover:text-indigo-700 text-sm">{link.name}</p>
                                            <p className="text-xs text-gray-400 font-mono">/{link.slug}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg text-xs border border-indigo-100">{link.clicks}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <MousePointerClick className="w-4 h-4 text-emerald-500" /> Recent Activity
                    </h4>
                    {recentClicks.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No activity yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentClicks.map((click: any) => (
                                <div key={click.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                            <MousePointerClick className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{click.link.name}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                {click.country !== "Unknown" && <FlagImage country={click.country || ''} className="w-4 h-3 rounded-sm object-cover" />}
                                                {click.country !== "Unknown" ? click.country : ""} {click.device ? `• ${click.device}` : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {new Date(click.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
