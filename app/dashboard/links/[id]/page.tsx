import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Globe, Link as LinkIcon } from "lucide-react";
import { ClicksOverTimeChart, DeviceDonutChart, TopItemsBarChart } from "@/app/components/AnalyticsCharts";
import { FlagImage } from "@/app/components/FlagImage";

export default async function LinkAnalyticsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const linkId = parseInt(params.id);

    if (isNaN(linkId)) {
        return <div className="p-8 text-center text-red-500 font-bold">Invalid Link ID</div>;
    }

    const link = await prisma.link.findUnique({
        where: { id: linkId },
        include: {
            analytics: {
                orderBy: { timestamp: "desc" }
            }
        }
    });

    if (!link) {
        return <div className="p-8 text-center text-gray-500 font-bold">Link not found.</div>;
    }

    const now = new Date();
    const ago24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const ago7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const ago30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const clicks24h = link.analytics.filter((a: any) => new Date(a.timestamp) >= ago24h).length;
    const clicks7d = link.analytics.filter((a: any) => new Date(a.timestamp) >= ago7d).length;
    const clicks30d = link.analytics.filter((a: any) => new Date(a.timestamp) >= ago30d).length;
    const totalClicks = link.analytics.length;

    // Aggregations
    const aggregate = (key: string, fallback: string = "Unknown") => {
        return link.analytics.reduce((acc: any, curr: any) => {
            const val = curr[key] || fallback;
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    };

    const devices = aggregate("device", "desktop");
    const os = aggregate("os");
    const browsers = aggregate("browser");
    const referers = aggregate("referer", "Direct");
    const countries = aggregate("country");
    const cities = aggregate("city");

    // Clicks over time (last 30 days)
    const clicksByDay: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split("T")[0];
        clicksByDay[key] = 0;
    }
    link.analytics.forEach((a: any) => {
        const key = new Date(a.timestamp).toISOString().split("T")[0];
        if (clicksByDay[key] !== undefined) clicksByDay[key]++;
    });
    const clicksOverTime = Object.entries(clicksByDay).map(([date, clicks]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clicks
    }));

    // Chart data
    const deviceChartData = Object.entries(devices).map(([name, value]) => ({ name, value: value as number }));
    const countryChartData = Object.entries(countries).sort((a: any, b: any) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value: value as number }));

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <Link href="/dashboard/links" className="p-2 bg-white rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics: {link.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-200">/{link.slug}</span>
                        <a href={link.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-sm flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" /> External Link
                        </a>
                    </div>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Last 24 Hours</p>
                    <h3 className="text-3xl font-bold text-gray-900">{clicks24h}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Last 7 Days</p>
                    <h3 className="text-3xl font-bold text-gray-900">{clicks7d}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Last 30 Days</p>
                    <h3 className="text-3xl font-bold text-gray-900">{clicks30d}</h3>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-blue-600 mb-2">All Time Clicks</p>
                    <h3 className="text-3xl font-bold text-blue-900">{totalClicks}</h3>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4">📈 Clicks Over Time (Last 30 Days)</h4>
                    <ClicksOverTimeChart data={clicksOverTime} />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4"><Smartphone className="w-4 h-4 inline text-gray-400 mr-1" /> Device Breakdown</h4>
                    <DeviceDonutChart data={deviceChartData} />
                </div>
            </div>

            {/* Top Countries Bar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /> Top Countries</h4>
                <TopItemsBarChart data={countryChartData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Referrers */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /> Top Referrers</h4>
                    {Object.keys(referers).length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                        <div className="space-y-3">
                            {Object.entries(referers).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([ref, count]: any) => (
                                <div key={ref} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 truncate max-w-[150px]">{ref}</span>
                                    <span className="font-semibold bg-gray-50 px-2 py-0.5 rounded-md text-xs border border-gray-100">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cities */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /> Top Cities</h4>
                    {Object.keys(cities).length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                        <div className="space-y-3">
                            {Object.entries(cities).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([city, count]: any) => (
                                <div key={city} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 font-medium truncate">{city}</span>
                                    <span className="font-semibold bg-gray-50 px-2 py-0.5 rounded-md text-xs border border-gray-100">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* OS */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">💻 Operating Systems</h4>
                    {Object.keys(os).length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                        <div className="space-y-3">
                            {Object.entries(os).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([o, count]: any) => (
                                <div key={o} className="flex items-center justify-between text-sm">
                                    <span className="capitalize text-gray-600">{o}</span>
                                    <span className="font-semibold bg-gray-50 px-2 py-0.5 rounded-md text-xs border border-gray-100">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Browsers */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Monitor className="w-4 h-4 text-gray-400" /> Browsers</h4>
                    {Object.keys(browsers).length === 0 ? <p className="text-sm text-gray-400">No data</p> : (
                        <div className="space-y-3">
                            {Object.entries(browsers).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([br, count]: any) => (
                                <div key={br} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{br}</span>
                                    <span className="font-semibold bg-gray-50 px-2 py-0.5 rounded-md text-xs border border-gray-100">{count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Clicks Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h4 className="font-bold text-gray-800 mb-6">Recent Clicks (Anonymized)</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-100">
                                <th className="pb-3 font-semibold">Date & Time</th>
                                <th className="pb-3 font-semibold">Location</th>
                                <th className="pb-3 font-semibold">Device / OS</th>
                                <th className="pb-3 font-semibold">Referrer</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {link.analytics.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-400">No clicks recorded yet.</td>
                                </tr>
                            ) : (
                                link.analytics.slice(0, 20).map((click: any) => (
                                    <tr key={click.id} className="text-gray-600">
                                        <td className="py-4 whitespace-nowrap">{new Date(click.timestamp).toLocaleString()}</td>
                                        <td className="py-4"><span className="inline-flex items-center gap-1.5"><FlagImage country={click.country || ''} />{click.city !== "Unknown" ? `${click.city}, ` : ''}{click.country}</span></td>
                                        <td className="py-4 capitalize">{click.device} • {click.os}</td>
                                        <td className="py-4 truncate max-w-[200px]">{click.referer}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
