"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/sidebar";
import Topbar from "../../../components/Topbar";

export default function ProjectsPage() {
  const projects = [
    ["E-Commerce Website", "Active", "₹45,000", 80],
    ["Admin Dashboard", "Completed", "₹30,000", 100],
    ["Portfolio Website", "Completed", "₹12,000", 100],
    ["Mobile App UI", "Review", "₹25,000", 65],
    ["CRM System", "Pending", "₹55,000", 35],
  ];

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#080b1a]">
        <Sidebar />
        <section className="flex-1">
          <Topbar user={{ name: "Suraj" }} />

          <div className="p-6 text-white">
            <h1 className="text-3xl font-black">Projects</h1>
            <p className="mt-2 text-gray-400">Manage Suraj-Tech client projects.</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl">
                  <h2 className="text-xl font-black">{p[0]}</h2>
                  <p className="mt-3 text-gray-400">Budget: {p[2]}</p>

                  <span className="mt-5 inline-block rounded-full bg-cyan-500/20 px-4 py-1 text-sm font-bold text-cyan-400">
                    {p[1]}
                  </span>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span>{p[3]}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/10">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        style={{ width: `${p[3]}%` }}
                      />
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-xl bg-white/10 py-3 font-bold hover:bg-cyan-500">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}