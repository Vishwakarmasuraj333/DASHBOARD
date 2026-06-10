"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";
import {
  FaUsers,
  FaRupeeSign,
  FaFolderOpen,
  FaChartLine,
  FaShoppingCart,
  FaLaptopCode,
  FaMobileAlt,
  FaGlobe,
} from "react-icons/fa";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("suraj_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      client: "Suraj Tech",
      budget: "₹45,000",
      status: "Active",
      progress: 78,
      icon: <FaShoppingCart />,
    },
    {
      title: "Portfolio Website",
      client: "Personal Brand",
      budget: "₹12,000",
      status: "Completed",
      progress: 100,
      icon: <FaGlobe />,
    },
    {
      title: "Admin Dashboard",
      client: "Business Panel",
      budget: "₹30,000",
      status: "Pending",
      progress: 45,
      icon: <FaLaptopCode />,
    },
    {
      title: "Mobile App UI",
      client: "Startup Client",
      budget: "₹25,000",
      status: "Review",
      progress: 62,
      icon: <FaMobileAlt />,
    },
  ];

  const chartData = [
    { day: "Mon", revenue: 12000 },
    { day: "Tue", revenue: 18000 },
    { day: "Wed", revenue: 15000 },
    { day: "Thu", revenue: 24000 },
    { day: "Fri", revenue: 21000 },
    { day: "Sat", revenue: 30000 },
    { day: "Sun", revenue: 26000 },
  ];

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#080b1a]">
        <Sidebar />

        <section className="flex-1">
          <Topbar user={user} />

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value="₹1.25L"
                growth="+18% this month"
                icon={<FaRupeeSign />}
              />

              <StatCard
                title="Total Users"
                value="12,450"
                growth="+540 new users"
                icon={<FaUsers />}
              />

              <StatCard
                title="Projects"
                value="4"
                growth="3 active projects"
                icon={<FaFolderOpen />}
              />

              <StatCard
                title="Growth"
                value="74%"
                growth="+9% conversion"
                icon={<FaChartLine />}
              />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-4">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-2xl bg-cyan-500/20 p-4 text-xl text-cyan-400">
                      {project.icon}
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : project.status === "Active"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : project.status === "Review"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-black">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{project.client}</p>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Budget</span>
                    <span className="font-bold">{project.budget}</span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>

                    <div className="h-3 rounded-full bg-white/10">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black">Weekly Revenue</h3>
                    <p className="text-sm text-gray-400">
                      Project earnings overview
                    </p>
                  </div>

                  <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
                    ₹1.46L
                  </span>
                </div>

                <div className="flex h-72 items-end gap-4">
                  {chartData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-3"
                    >
                      <div
                        className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-700 via-cyan-500 to-cyan-300 shadow-lg shadow-cyan-500/20"
                        style={{ height: `${item.revenue / 350}%` }}
                      ></div>

                      <span className="text-xs text-gray-400">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl">
                <h3 className="mb-6 text-2xl font-black">Recent Activity</h3>

                <div className="space-y-4">
                  {[
                    "E-Commerce payment received",
                    "Portfolio project completed",
                    "Admin dashboard UI updated",
                    "Mobile app sent for review",
                    "New client enquiry received",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-gray-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-xl">
              <h3 className="mb-6 text-2xl font-black">Project Management</h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="py-3">Project Name</th>
                      <th>Client</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Budget</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((project, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="py-4 font-semibold">{project.title}</td>
                        <td className="text-gray-300">{project.client}</td>
                        <td>
                          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                            {project.status}
                          </span>
                        </td>
                        <td className="w-56">
                          <div className="h-2 rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full bg-cyan-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="font-bold">{project.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}