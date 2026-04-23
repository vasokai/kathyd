"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[#0a0a0a] border-b border-white/[0.08] h-[60px] lg:h-[72px]">
        <div className="h-full max-w-[1440px] mx-auto px-6 grid grid-cols-3 items-center">
          {/* Left: Menu + Search */}
          <div className="flex items-center gap-7">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 group"
            >
              <span className="flex flex-col gap-[5px] w-[18px]">
                <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
              </span>
              <span className="hidden lg:inline text-[13px] tracking-[0.02em] text-white/80 group-hover:underline underline-offset-4">
                Menu
              </span>
            </button>

            <button className="hidden lg:flex items-center gap-2 group text-white/80">
              <Search className="w-[18px] h-[18px] stroke-[1.2]" />
              <span className="text-[13px] tracking-[0.02em] group-hover:underline underline-offset-4">
                Search
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="text-center">
              <span
                className="text-2xl lg:text-3xl tracking-[0.15em] font-light text-white"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                KATHY D.
              </span>
            </Link>
          </div>

          {/* Right: Contact + Account + Cart */}
          <div className="flex items-center justify-end gap-7 text-white/80">
            <Link
              href="/contact"
              className="hidden lg:inline text-[13px] tracking-[0.02em] hover:underline underline-offset-4"
            >
              Contact
            </Link>

            <Link href="/login" className="group relative">
              <User className="w-[20px] h-[20px] stroke-[1.2]" />
            </Link>

            <button className="group relative">
              <ShoppingBag className="w-[20px] h-[20px] stroke-[1.2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0a]">
          <div className="h-[60px] lg:h-[72px] flex items-center justify-between px-6 border-b border-white/[0.08]">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 group text-white/80"
            >
              <X className="w-[18px] h-[18px] stroke-[1.2]" />
              <span className="hidden lg:inline text-[13px] tracking-[0.02em] group-hover:underline underline-offset-4">
                Close
              </span>
            </button>
            <span
              className="text-2xl lg:text-3xl tracking-[0.15em] font-light text-white"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              KATHY D.
            </span>
            <div className="w-16" />
          </div>

          <nav className="flex flex-col items-center justify-center h-[calc(100vh-72px)] gap-8">
            {[
              { label: "Gallery", href: "/gallery" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Login", href: "/login" },
              { label: "Register", href: "/register" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl lg:text-4xl font-light tracking-[0.1em] text-white/70 hover:text-[#C9A96E] transition-colors"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
