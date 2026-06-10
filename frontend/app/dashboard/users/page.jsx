"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/sidebar";
import Topbar from "../../../components/Topbar";

export default function UsersPage() {
  const users = [
    ["Suraj Vishwakarma", "Admin", "Active", "suraj@gmail.com"],
    ["Rahul Sharma", "Developer", "Active", "rahul@gmail.com"],
    ["Amit Verma", "Designer", "Pending", "amit@gmail.com"],
    ["Priya Singh", "Manager", "Active", "priya@gmail.com"],
  ];

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#080b1a]">
        <Sidebar />
        <section className="flex-1">
          <Topbar user={{ name: "Suraj" }} />

          <div className="p-6 text-white">
            <h1 className="text-3xl font-black">Users Management</h1>
            <p className="mt-2 text-gray-400">Manage team members and roles.</p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-3">Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} className="border-b border-white/10">
                      <td className="py-4 font-bold">{user[0]}</td>
                      <td>{user[1]}</td>
                      <td>
                        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
                          {user[2]}
                        </span>
                      </td>
                      <td className="text-gray-300">{user[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}