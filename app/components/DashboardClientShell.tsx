"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

interface DashboardClientShellProps {
    user: {
        name: string;
        email: string;
        surname: string;
    };
    children: React.ReactNode;
}

export default function DashboardClientShell({ user, children }: DashboardClientShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex h-screen bg-[#f8f9fa] overflow-hidden font-sans text-gray-800">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-40 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        L
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight">Lnk-Tree</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Sidebar with Mobile Support */}
            <Sidebar
                user={user}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative pt-16 md:pt-0">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
