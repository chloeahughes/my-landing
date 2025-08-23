"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { motion as motionTokens } from "@/lib/tokens";
import WaitlistModal from "./WaitlistModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="
        relative
        w-screen
        left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        overflow-hidden
      "
    >
      {/* Background removed */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-32">
        <div className="flex flex-col items-center text-center md:text-left">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: motionTokens.enter, 
              ease: motionTokens.ease 
            }}
            className="max-w-4xl mb-12 md:mb-16"
          >
            <h1 className="font-bold tracking-tight text-center md:text-left mb-8">
              <span 
                className="block"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                }}
              >
                The fastest, <em className="italic">smartest</em> way to close real estate deals
              </span>
            </h1>
            
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: motionTokens.enter, 
                ease: motionTokens.ease,
                delay: 0.2 
              }}
              whileHover={{ 
                backgroundColor: "#5a0180",
                transition: { duration: 0.2 }
              }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#660191] text-white rounded-full px-6 py-3 font-medium transition-colors mx-auto"
            >
              Get started
            </motion.button>
          </motion.div>
          
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: motionTokens.enter, 
              ease: motionTokens.ease,
              delay: 0.4 
            }}
            className="flex justify-center w-full"
          >
            <div className="relative">
              <Image
                src="/phone-mockup.png"
                alt="Phone mockup showing the app interface"
                width={400}
                height={800}
                className="w-full max-w-[400px] h-auto object-contain bg-transparent"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
