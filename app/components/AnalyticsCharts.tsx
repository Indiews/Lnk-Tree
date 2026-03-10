"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

const COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6", "#ec4899", "#14b8a6"];

// --- Clicks Over Time (Area Chart) ---
export function ClicksOverTimeChart({ data }: { data: { date: string; clicks: number }[] }) {
    if (!data || data.length === 0) {
        return <p className="text-sm text-gray-400 py-8 text-center">No data available yet.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        fontSize: "13px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                    }}
                    labelStyle={{ fontWeight: 700, color: "#1f2937" }}
                />
                <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// --- Device Donut Chart ---
export function DeviceDonutChart({ data }: { data: { name: string; value: number }[] }) {
    if (!data || data.length === 0) {
        return <p className="text-sm text-gray-400 py-8 text-center">No data available yet.</p>;
    }

    return (
        <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "10px",
                            fontSize: "12px"
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
                {data.map((entry: any, index: number) => (
                    <div key={entry.name} className="flex items-center gap-2 text-sm">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-gray-600 capitalize">{entry.name}</span>
                        <span className="text-gray-400 font-mono text-xs ml-auto">{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Top Items Horizontal Bar Chart ---
export function TopItemsBarChart({ data }: { data: { name: string; value: number }[] }) {
    if (!data || data.length === 0) {
        return <p className="text-sm text-gray-400 py-8 text-center">No data available yet.</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={Math.max(160, data.length * 40)}>
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis
                    dataKey="name"
                    type="category"
                    width={100}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        fontSize: "12px"
                    }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
}
