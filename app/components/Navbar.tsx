"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);





const [userEmail, setUserEmail] = useState("");

useEffect(() => {
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      setUserEmail(session.user.email || "");
    }
  };

  getUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUserEmail(session?.user?.email || "");
    setMenuOpen(false);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

const handleLogout = async () => {
  setMenuOpen(false);
  setUserEmail("");

  await supabase.auth.signOut();

  window.location.href = "/";
};






  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
  href="/"
  className="text-2xl font-bold text-white"
  onClick={() => setMenuOpen(false)}
>
  Career<span className="text-blue-500">AI</span>
</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-300">
          <li>
  <Link
    href="/"
    className="relative px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
  >
    Home
  </Link>
</li>
          <li>
  <Link
    href="/features"
    className="relative px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
  >
    Features
  </Link>
</li>

<li>
  <Link
    href="/about"
    className="relative px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
  >
    About
  </Link>
</li>

<li>
  <Link
    href="/contact"
    className="relative px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 hover:text-white hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
  >
    Contact
  </Link>
</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {userEmail ? (
  <div className="flex items-center gap-4">
    <span className="text-gray-300 text-sm">
      {userEmail}
    </span>

    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
    >
      Logout
    </button>
  </div>
) : (
  <>
    <Link href="/login">Login</Link>

    <Link
      href="/signup"
      className="bg-blue-600 px-4 py-2 rounded-lg text-white"
    >
      Sign Up
    </Link>
  </>
)}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

     {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-slate-900 border-t border-slate-800">
    <ul className="flex flex-col p-6 gap-5 text-gray-300">

      <li>
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/features"
          onClick={() => setMenuOpen(false)}
        >
          Features
        </Link>
      </li>

      <li>
        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
      </li>

      <li>
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
      </li>

      <div className="flex flex-col gap-3 mt-4">

        {userEmail ? (
          <>
            {/* Logged In User */}
            <div className="border border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">
                Logged in as
              </p>

              <p className="text-white text-sm break-all">
                {userEmail}
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Login */}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center border border-slate-700 py-3 rounded-lg text-white"
            >
              Login
            </Link>

            {/* Sign Up */}
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="text-center bg-blue-600 py-3 rounded-lg text-white"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>

    </ul>
  </div>
)}
    </nav>
  );
}