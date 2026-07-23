"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");


const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created successfully! Check your email if verification is enabled.");
  console.log(data);
};



  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Join CareerAI and start your AI-powered career journey.
        </p>



        <form onSubmit={handleSignup} className="mt-8 space-y-5">

   <input
  type="text"
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
/>

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
/>

         <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
/>

          <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
/>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-white font-semibold transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}