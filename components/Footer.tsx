"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, CircleDot } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="relative"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #EBD9F5 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-12 md:pt-16 pb-8 md:pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Logo + Tagline + Social */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image
                src="/logo.png"
                alt="Abodex logo"
                width={40}
                height={40}
                className="w-10 h-10 bg-transparent"
              />
              <span className="text-xl font-semibold text-[#3C0F18]">
                Abodex
              </span>
            </div>
            
            <p className="mt-2 text-base md:text-lg font-medium text-[#3C0F18]">
              One Platform. Every Deal.
            </p>
            
            {/* Social Icons */}
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              <Link
                href="#"
                aria-label="Follow us on Instagram"
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-md text-[#3C0F18] hover:bg-[#F2ECF8] transition"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              
              <Link
                href="#"
                aria-label="Follow us on Facebook"
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-md text-[#3C0F18] hover:bg-[#F2ECF8] transition"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              
              <Link
                href="#"
                aria-label="Visit our website"
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center shadow-md text-[#3C0F18] hover:bg-[#F2ECF8] transition"
              >
                <CircleDot className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Right Column: Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 gap-8 md:gap-12">
            {/* Navigation */}
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-[#3C0F18] uppercase mb-4">
                Navigation
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-sm text-gray-700 hover:text-[#660191] transition"
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="block text-sm text-gray-700 hover:text-[#660191] transition"
                >
                  Features
                </Link>
              </div>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-[#3C0F18] uppercase mb-4">
                Support
              </h3>
              <div className="space-y-2">
                <Link
                  href="/faq"
                  className="block text-sm text-gray-700 hover:text-[#660191] transition"
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-gray-700 hover:text-[#660191] transition"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row: Legal Links */}
        <div className="mt-12 border-t border-[#E3DCDC]">
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500 justify-center md:justify-start">
            <Link
              href="/privacy"
              className="hover:text-[#660191] transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#660191] transition"
            >
              Cookies
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#660191] transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
