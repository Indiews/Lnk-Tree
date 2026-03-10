import { prisma } from "@/app/lib/prisma";
import { inviteUser, deleteUser } from "@/app/actions/users";
import { Trash2, UserPlus, Shield } from "lucide-react";

export default async function TeamPage() {
    const users = await prisma.user.findMany();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Team</h2>
                    <p className="text-sm text-gray-500 mt-1">Add or remove administrators and staff members.</p>
                </div>
            </div>

            {/* Add New User Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <UserPlus className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Add New User</h3>
                </div>

                <form action={async (formData) => { "use server"; await inviteUser(formData); }} className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                        <input type="text" name="name" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Surname</label>
                        <input type="text" name="surname" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <input type="email" name="email" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm" placeholder="john@example.com" />
                    </div>
                    <div className="md:col-span-2 pt-2">
                        <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm shadow-blue-200">
                            Invite User
                        </button>
                    </div>
                </form>
            </div>

            {/* Users List */}
            <div className="space-y-4">
                {users.map((user: any) => (
                    <div key={user.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100 shrink-0">
                                {user.name.charAt(0)}{user.surname.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{user.name} {user.surname}</h4>
                                <p className="text-sm text-gray-500 font-medium">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 md:ml-auto">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 font-semibold text-xs rounded-full border border-gray-200 mr-2">
                                {user.permission === 'admin' && <Shield className="w-3.5 h-3.5 text-blue-500" />}
                                {user.permission.toUpperCase()}
                            </div>

                            <form action={async () => { "use server"; await deleteUser(user.id); }}>
                                <button className="p-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors bg-red-50/50 opacity-100 md:opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
