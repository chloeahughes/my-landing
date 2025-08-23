"use client";

import { motion } from "framer-motion";
import { motion as motionTokens } from "@/lib/tokens";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionTokens.enter, ease: motionTokens.ease }}
          className="rounded-xl p-8 md:p-12 text-center"
          style={{
            background: "var(--brand-gradient)",
          }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Add your custom CTA content here */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
