"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/sidebar";
import Topbar from "../../../components/Topbar";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#080b1a]">
        <Sidebar />
        <section className="flex-1">
          <Topbar user={{ name: "Suraj" }} />

          <div className="p-6 text-white">
            <h1 className="text-3xl font-black">Settings</h1>
            <p className="mt-2 text-gray-400">Manage account and dashboard preferences.</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <h2 className="mb-5 text-2xl font-black">Profile Settings</h2>

                <div className="space-y-4">
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="Full Name" />
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="Email Address" />
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="Phone Number" />

                  <button className="rounded-xl bg-cyan-500 px-6 py-3 font-bold hover:bg-cyan-600">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <h2 className="mb-5 text-2xl font-black">Security</h2>

                <div className="space-y-4">
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="Old Password" />
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="New Password" />
                  <input className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none" placeholder="Confirm Password" />

                  <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}