"use client";

import { useActionState, useState, useTransition } from "react";
import { enable2FA, confirm2FA, disable2FA, changePassword } from "@/app/actions/two-factor";
import { Shield, ShieldCheck, ShieldOff, Key, AlertCircle, CheckCircle2, Copy, Check } from "lucide-react";

export default function SecurityPage() {
    // 2FA Setup
    const [setupData, setSetupData] = useState<{ uri: string; secret: string } | null>(null);
    const [isStarting, startTransition] = useTransition();
    const [startError, setStartError] = useState("");
    const [confirmState, confirmAction, confirmPending] = useActionState(confirm2FA, null);
    const [disableState, disableAction, disablePending] = useActionState(disable2FA, null);

    // Password Change
    const [passwordState, passwordAction, passwordPending] = useActionState(changePassword, null);

    // Copy to clipboard
    const [copied, setCopied] = useState(false);

    // We need a way to know if 2FA is currently enabled on the client.
    // We'll track it with a local state that gets updated.
    const [twoFAEnabled, setTwoFAEnabled] = useState<boolean | null>(null);
    const [checkedUser, setCheckedUser] = useState(false);

    // Handle enable 2FA step 1
    async function handleStartSetup() {
        setStartError("");
        startTransition(async () => {
            const result = await enable2FA();
            if (result.error) {
                setStartError(result.error);
                if (result.error === "2FA is already enabled.") {
                    setTwoFAEnabled(true);
                }
            } else if (result.success && result.uri && result.secret) {
                setSetupData({ uri: result.uri, secret: result.secret });
                setTwoFAEnabled(false);
            }
        });
    }

    function handleCopy(text: string) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    // After confirm2FA succeeds, update local state
    if (confirmState?.success && twoFAEnabled === false) {
        setTwoFAEnabled(true);
        setSetupData(null);
    }

    // After disable2FA succeeds, update local state
    if (disableState?.success && twoFAEnabled === true) {
        setTwoFAEnabled(false);
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Security</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your account security and two-factor authentication.</p>
                </div>
            </div>

            <div className="space-y-8">

                {/* 2FA Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <Shield className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Two-Factor Authentication</h3>
                            <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                    </div>

                    {/* No setup in progress, not enabled */}
                    {!setupData && twoFAEnabled !== true && (
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <ShieldOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-amber-800 text-sm">2FA is not enabled</p>
                                    <p className="text-xs text-amber-700 mt-0.5">Your account is protected by password only. Enable 2FA for enhanced security.</p>
                                </div>
                            </div>

                            {startError && (
                                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {startError}
                                </div>
                            )}

                            <button
                                onClick={handleStartSetup}
                                disabled={isStarting}
                                className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                            >
                                {isStarting ? "Setting up..." : "Enable 2FA"}
                            </button>
                        </div>
                    )}

                    {/* Setup in progress — show secret + confirm form */}
                    {setupData && (
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                <p className="text-sm text-blue-800 font-semibold mb-2">Step 1: Add to your authenticator app</p>
                                <p className="text-xs text-blue-700 mb-4">
                                    Scan the QR code below or manually enter the secret key in your authenticator app (Google Authenticator, Authy, etc.)
                                </p>

                                {/* QR Code via Google Charts API */}
                                <div className="flex justify-center mb-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupData.uri)}`}
                                            alt="QR Code for 2FA"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                </div>

                                {/* Manual secret */}
                                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                                    <code className="flex-1 text-xs font-mono text-gray-700 break-all select-all">{setupData.secret}</code>
                                    <button
                                        onClick={() => handleCopy(setupData.secret)}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
                                        title="Copy secret"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                <p className="text-sm text-indigo-800 font-semibold mb-3">Step 2: Enter the code from your app</p>

                                <form action={confirmAction} className="space-y-4">
                                    {confirmState?.error && (
                                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {confirmState.error}
                                        </div>
                                    )}

                                    <input
                                        name="code"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        maxLength={6}
                                        required
                                        placeholder="000000"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-center text-xl font-mono tracking-[0.5em]"
                                    />

                                    <button
                                        type="submit"
                                        disabled={confirmPending}
                                        className="w-full bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {confirmPending ? "Verifying..." : "Confirm & Enable 2FA"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* 2FA is enabled */}
                    {twoFAEnabled === true && !setupData && (
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-100 rounded-xl">
                                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-green-800 text-sm">2FA is enabled</p>
                                    <p className="text-xs text-green-700 mt-0.5">Your account is protected with two-factor authentication.</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-3">Disable 2FA</p>
                                <form action={disableAction} className="space-y-3">
                                    {disableState?.error && (
                                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 shrink-0" />
                                            {disableState.error}
                                        </div>
                                    )}

                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Enter your password to confirm"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={disablePending}
                                        className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                                    >
                                        {disablePending ? "Disabling..." : "Disable 2FA"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Change Password Section */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Key className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
                            <p className="text-xs text-gray-500">Update your account password</p>
                        </div>
                    </div>

                    <form action={passwordAction} className="space-y-5">
                        {passwordState?.error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {passwordState.error}
                            </div>
                        )}
                        {passwordState?.success && (
                            <div className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2 text-green-600 text-sm">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                Password changed successfully!
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
                            <input
                                name="currentPassword"
                                type="password"
                                required
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                                <input
                                    name="newPassword"
                                    type="password"
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                                    placeholder="Min. 8 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={passwordPending}
                            className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200 disabled:opacity-50"
                        >
                            {passwordPending ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
