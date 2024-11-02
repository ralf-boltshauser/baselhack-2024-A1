import Typewriter from "typewriter-effect";
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  text: string;
  children: ReactNode;
  isSelected?: boolean;
}

export function TypeWriter({ text, children, isSelected }: TypeWriterProps) {
  const [showContent, setShowContent] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      },
    },
  };

  return (
    <div className="flex flex-col items-start gap-6">
      {isSelected && (
        <Typewriter
          options={{ delay: 20 }}
          onInit={(typewriter) => {
            typewriter
              .typeString(text)
              .callFunction(() => {
                setTimeout(() => setShowContent(true), 100);
              })
              .start();
          }}
        />
      )}
      {!isSelected && <p>{text}</p>}
      <AnimatePresence>
        {(showContent || !isSelected) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -10,
              filter: "blur(10px)",
              transition: { duration: 0.2 },
            }}
          >
            <motion.div variants={itemVariants}>{children}</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
