"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessageType("success");
      setMessage("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setMessageType("error");
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#020617] px-4">
      {/* Background Glow */}
      <div className="absolute left-[-150px] top-[-150px] h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-150px] h-[350px] w-[350px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/20 bg-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-black text-white">
            Suraj<span className="text-cyan-400">Tech</span>
          </h1>

          <p className="mt-3 text-gray-400">
            Create your professional account
          </p>
        </div>

        {/* Message */}
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

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition focus-within:border-cyan-400">
            <FaUser className="text-cyan-400" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition focus-within:border-cyan-400">
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

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 transition focus-within:border-cyan-400">
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
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}