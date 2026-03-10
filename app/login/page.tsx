"use client";

import { useActionState, useState } from "react";
import { login, verify2FA } from "@/app/actions/auth";
import { Shield } from "lucide-react";

export default function LoginPage() {
    const [loginState, loginAction, loginPending] = useActionState(login, null);
    const [verifyState, verifyAction, verifyPending] = useActionState(verify2FA, null);

    const needs2FA = loginState?.requires2FA === true;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1a1a1a] p-8">
                <div className="mb-8 text-center">
                    {needs2FA ? (
                        <>
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-2">Two-Factor Auth</h1>
                            <p className="text-gray-400">Enter the 6-digit code from your authenticator app</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-white mb-2">Login</h1>
                            <p className="text-gray-400">Manage your Lnk-Tree dashboard</p>
                        </>
                    )}
                </div>

                {needs2FA ? (
                    /* 2FA Code Entry */
                    <form action={verifyAction} className="space-y-6">
                        {verifyState?.error && (
                            <div className="bg-red-500 text-white p-3 font-medium text-sm text-center">
                                {verifyState.error}
                            </div>
                        )}

                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="code">
                                Authentication Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                required
                                autoFocus
                                className="w-full bg-[#333] border-none text-white p-4 focus:ring-2 focus:ring-white outline-none transition-colors text-center text-2xl font-mono tracking-[0.5em]"
                                placeholder="000000"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={verifyPending}
                            className="w-full bg-white text-black font-bold p-4 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {verifyPending ? "Verifying..." : "Verify Code"}
                        </button>

                        <div className="text-center">
                            <a href="/login" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                                ← Back to login
                            </a>
                        </div>
                    </form>
                ) : (
                    /* Email + Password Entry */
                    <form action={loginAction} className="space-y-6">
                        {loginState?.error && (
                            <div className="bg-red-500 text-white p-3 font-medium text-sm text-center">
                                {loginState.error}
                            </div>
                        )}

                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full bg-[#333] border-none text-white p-4 focus:ring-2 focus:ring-white outline-none transition-colors"
                                placeholder="lnktree@indiews.com"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full bg-[#333] border-none text-white p-4 focus:ring-2 focus:ring-white outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loginPending}
                            className="w-full bg-white text-black font-bold p-4 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {loginPending ? "Logging in..." : "Sign In"}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    Maintained by Indiews
                </div>
            </div>
        </div>
    );
}
