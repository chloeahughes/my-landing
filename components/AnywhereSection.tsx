"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// TODO: Add these images to your public folder:
// /public/laptop.png, /public/phone.png

export default function AnywhereSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-20 md:py-28">
        {/* Centered Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center text-3xl md:text-5xl font-semibold tracking-tight"
        >
          Manage your deals anywhere
        </motion.h2>
        
        {/* Row 1: Text Left, Laptop Right */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center mt-12">
          {/* Left: Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="max-w-prose"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-black">
              At the office.
            </h3>
            <p className="mt-2 text-muted text-base md:text-lg">
              Save hours using Abodex's data centralized platform at your firm.
            </p>
          </motion.div>
          
          {/* Right: Laptop Image */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center md:justify-end"
          >
            <div className="max-w-[520px] w-full">
              <Image
                src="/laptop.png"
                alt="Abodex dashboard on laptop"
                width={520}
                height={400}
                className="w-auto h-auto max-w-[520px] bg-transparent"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Row 2: Phone Left, Text Right */}
        <div className="grid gap-10 md:grid-cols-2 md:items-center mt-16">
          {/* Left: Phone Image */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center md:justify-start order-2 md:order-1"
          >
            <div className="max-w-[260px] w-full">
              <Image
                src="/phone.png"
                alt="Abodex mobile deal view"
                width={260}
                height={520}
                className="w-auto h-auto max-w-[260px] bg-transparent"
              />
            </div>
          </motion.div>
          
          {/* Right: Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.4 }}
            className="max-w-prose order-1 md:order-2"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-black">
              On the go.
            </h3>
            <p className="mt-2 text-muted text-base md:text-lg">
              Add data or text stakeholders on a property site, in a grocery store, or anywhere you use your phone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
