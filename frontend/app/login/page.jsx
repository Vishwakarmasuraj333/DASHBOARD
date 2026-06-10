"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("suraj_token", data.token);
      localStorage.setItem("suraj_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (error) {
      alert("Backend server not running");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] px-4">
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-4xl font-black text-white">
          Suraj<span className="text-cyan-400">Tech</span>
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Login to your professional dashboard
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
            <FaEnvelope className="text-cyan-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
            <FaLock className="text-cyan-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white transition hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          New user?{" "}
          <Link href="/register" className="font-bold text-cyan-400">
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}