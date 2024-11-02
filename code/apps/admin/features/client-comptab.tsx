"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function ClientComptab() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-300 p-4 mb-4"
          onMouseEnter={() => setCount(i)}
        >
          <h2>Comptab {i}</h2>
          <AnimatePresence>
            {count == i ? (
              <motion.div
                layoutId="moving-bar"
                className="w-[50px] h-2 bg-red-500"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
