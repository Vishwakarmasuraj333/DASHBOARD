"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import Sidebar from "../../../components/sidebar";
import Topbar from "../../../components/Topbar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const revenueData = [
    { month: "Jan", revenue: 120000 },
    { month: "Feb", revenue: 145000 },
    { month: "Mar", revenue: 165000 },
    { month: "Apr", revenue: 180000 },
    { month: "May", revenue: 210000 },
    { month: "Jun", revenue: 250000 },
  ];

  const projectData = [
    { name: "Completed", value: 12 },
    { name: "Active", value: 8 },
    { name: "Review", value: 4 },
    { name: "Pending", value: 3 },
  ];

  const teamData = [
    { name: "Suraj", tasks: 48 },
    { name: "Rahul", tasks: 35 },
    { name: "Amit", tasks: 28 },
    { name: "Priya", tasks: 42 },
  ];

  const clientData = [
    { client: "Suraj Tech", revenue: 450000 },
    { client: "Client A", revenue: 320000 },
    { client: "Client B", revenue: 280000 },
    { client: "Client C", revenue: 190000 },
  ];

  const colors = ["#22d3ee", "#3b82f6", "#a855f7", "#f59e0b"];

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen bg-[#080b1a]">
        <Sidebar />

        <section className="flex-1">
          <Topbar user={{ name: "Suraj" }} />

          <div className="p-6 text-white">
            <h1 className="text-3xl font-black">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-400">
              Revenue, projects, team performance and client growth.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <Card title="Total Revenue" value="₹12.5L" text="+18% growth" />
              <Card title="Projects" value="27" text="12 completed" />
              <Card title="Team Tasks" value="153" text="+42 this week" />
              <Card title="Clients" value="18" text="5 new clients" />
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
              <ChartBox title="Monthly Revenue" subtitle="Revenue trend">
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #22d3ee55",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22d3ee"
                      strokeWidth={4}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Project Status" subtitle="Project distribution">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      dataKey="value"
                      label
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={index} fill={colors[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #22d3ee55",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Team Performance" subtitle="Tasks completed">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={teamData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #22d3ee55",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="tasks" radius={[14, 14, 0, 0]} fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartBox>

              <ChartBox title="Client Revenue" subtitle="Top client earnings">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={clientData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="client" type="category" stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #22d3ee55",
                        borderRadius: "14px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="revenue" radius={[0, 14, 14, 0]} fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartBox>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}

function Card({ title, value, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="mt-3 text-4xl font-black text-white">{value}</h2>
      <p className="mt-2 text-sm font-bold text-cyan-400">{text}</p>
    </div>
  );
}

function ChartBox({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white">{title}</h2>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}