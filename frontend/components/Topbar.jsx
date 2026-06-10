"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaChartLine,
  FaFolderOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Topbar({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
    { name: "Users", icon: <FaUsers />, href: "/dashboard/users" },
    { name: "Analytics", icon: <FaChartLine />, href: "/dashboard/analytics" },
    { name: "Projects", icon: <FaFolderOpen />, href: "/dashboard/projects" },
    { name: "Settings", icon: <FaCog />, href: "/dashboard/settings" },
  ];

  const logout = () => {
    localStorage.removeItem("suraj_token");
    localStorage.removeItem("suraj_user");
    router.push("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-white/10 bg-[#050816]/95 px-4 py-4 text-white backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-white/10 p-3 text-white transition hover:bg-cyan-500 lg:hidden"
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-xl font-black md:text-2xl">
              Dashboard Overview
            </h2>
            <p className="text-xs text-gray-400 md:text-sm">
              Welcome back, {user?.name || "Suraj"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden items-center gap-3 rounded-xl bg-white/10 px-4 py-3 md:flex">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Search..."
              className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-gray-400 lg:w-64"
            />
          </div>

          <button className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20">
            <FaBell />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-black md:h-11 md:w-11">
            {user?.name?.charAt(0) || "S"}
          </div>
        </div>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[60] min-h-screen w-72 border-r border-white/10 bg-[#050816] p-6 text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-black">
            Suraj<span className="text-cyan-400">Tech</span>
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="rounded-xl bg-white/10 p-3 transition hover:bg-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                pathname === item.href
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <button
            onClick={logout}
            className="mt-10 flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-semibold hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}