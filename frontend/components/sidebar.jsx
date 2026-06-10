"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaChartLine,
  FaFolderOpen,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

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
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-[#050816] p-6 text-white lg:block">
      <h1 className="mb-10 text-3xl font-black">
        Suraj<span className="text-cyan-400">Tech</span>
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
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
  );
}