"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    // TODO: Add actual newsletter signup logic
    setEmail("");
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center">
          {/* Skyline Image */}
          <div className="flex justify-center">
            <Image
              src="/skyline.png"
              alt="City skyline"
              width={900}
              height={200}
              className="mx-auto max-w-[900px] w-full h-auto"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mt-8 text-center text-3xl md:text-5xl font-bold text-black">
              The future of deal management.
            </h2>
            
            <p className="mt-3 text-center text-lg text-gray-500">
              Sign up for early access
            </p>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              
              <input
                id="newsletter-email"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-8 block w-full max-w-md mx-auto rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
              
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="mt-4 block w-full max-w-md mx-auto rounded-lg bg-black px-4 py-3 text-base font-semibold text-white hover:bg-gray-900 transition"
              >
                Submit
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
