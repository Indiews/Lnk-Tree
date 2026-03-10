"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { Home, LinkIcon, Settings, Users, FileText, Shield, User, X } from "lucide-react";
import Image from "next/image";
import { getGravatarUrl } from "../lib/gravatar";

interface SidebarProps {
    user: {
        name: string;
        email: string;
        surname: string;
    };
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ user, isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const navLinks = [
        { name: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { name: "Pages", href: "/dashboard/pages", icon: <FileText className="w-5 h-5" /> },
        { name: "Links", href: "/dashboard/links", icon: <LinkIcon className="w-5 h-5" /> },
        { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
        { name: "Profile", href: "/dashboard/profile", icon: <User className="w-5 h-5" /> },
        { name: "Team", href: "/dashboard/team", icon: <Users className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 shadow-sm z-[60]
                    fixed inset-y-0 left-0 transition-transform duration-300 transform md:static md:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                            <Image
                                src={getGravatarUrl(user.email, 80)}
                                alt={`${user.name}'s avatar`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate">{user.name} {user.surname}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 mt-6 overflow-y-auto font-sans">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <span>{link.icon}</span>
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Promo Card & Logout */}
                <div className="p-4 mt-auto">
                    {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white mb-4 shadow-md hidden lg:block">
                        <h4 className="font-bold text-sm mb-1">Cloud Hosted Lnk Tree</h4>
                        <p className="text-xs text-blue-100 mb-4 opacity-90 leading-relaxed">
                            Upgrade your experience with premium features.
                        </p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl text-xs font-bold backdrop-blur-sm border border-white/10">
                            ✨ Check Cloud
                        </button>
                    </div> */}
                    <button
                        onClick={() => logout()}
                        className="w-full text-left px-4 py-3 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors rounded-xl flex items-center gap-3"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
