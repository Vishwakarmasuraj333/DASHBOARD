"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope } from "react-icons/fa";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dashboard-uobp.vercel.app";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("suraj_token", data.token);
      localStorage.setItem("suraj_user", JSON.stringify(data.user));

      setMessageType("success");
      setMessage("Login successful. Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      setMessageType("error");
      setMessage("Unable to connect to server. Please check backend URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] px-4">
      <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-black text-white">
            Suraj<span className="text-cyan-400">Tech</span>
          </h1>

          <p className="mt-3 text-gray-400">
            Login to your professional dashboard
          </p>
        </div>

        {message && (
          <div
            className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${
              messageType === "success"
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition focus-within:border-cyan-400">
            <FaEnvelope className="text-cyan-400" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition focus-within:border-cyan-400">
            <FaLock className="text-cyan-400" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          New user?{" "}
          <Link
            href="/register"
            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}