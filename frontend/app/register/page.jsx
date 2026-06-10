"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const API_URL = "https://dashboard-uobp.vercel.app";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessageType("success");
      setMessage("Account created successfully. Redirecting...");

      setTimeout(() => router.push("/login"), 1200);
    } catch {
      setMessageType("error");
      setMessage("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] px-4">
      <div className="absolute left-[-140px] top-[-140px] h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-[-140px] right-[-140px] h-[360px] w-[360px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-center text-4xl font-black text-white">
          Suraj<span className="text-cyan-400">Tech</span>
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Create your professional account
        </p>

        {message && (
          <div
            className={`mt-6 rounded-xl border px-4 py-3 text-sm font-semibold ${
              messageType === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 focus-within:border-cyan-400">
            <FaUser className="text-cyan-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 focus-within:border-cyan-400">
            <FaEnvelope className="text-cyan-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 focus-within:border-cyan-400">
            <FaLock className="text-cyan-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-cyan-400">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}