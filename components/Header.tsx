"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WaitlistModal from "./WaitlistModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Abodex logo"
                width={32}
                height={32}
                className="w-8 h-8 bg-transparent"
              />
              <span className="text-xl font-semibold text-[#3C0F18]">
                Abodex
              </span>
            </Link>
            
            {/* Get Started Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#660191] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a0180] transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
