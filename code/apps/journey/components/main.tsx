"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import useStore from "~/store";
import { createCustomer } from "./actions";

export default function Main({
  elements,
}: {
  elements: Array<{ key: string; component: React.ReactNode }>;
}) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));

  const { data, refetch } = useQuery({
    queryKey: ["customer"],
    // queryFn: () => createCustomer(),
    queryFn: async () => {
      console.log("queryFn");
      const res = await createCustomer();
      console.log("res", res);
      return res;
    },
    enabled: false, // This prevents the query from running automatically on mount
  });

  const divRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  function adjustHeight() {
    if (divRef.current) {
      setHeight((divRef.current as HTMLDivElement).offsetHeight + 32);
    }
  }
  useEffect(() => {
    adjustHeight();
  }, [divRef.current, step]);

  const customerId = useStore((state) => state.customerId);
  const setCustomerId = useStore((state) => state.setCustomerId);
  const loaded = useStore((state) => state.loaded);
  const setLoaded = useStore((state) => state.setLoaded);
  useEffect(() => {
    if (!customerId && loaded) {
      refetch();
    }
  }, [customerId, loaded]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (data) {
      setCustomerId(Number(data.id));
    }
  }, [data]);

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => {
        setStep(1);
      }, 3000);
    }
  }, [step]);
  const handleRefAssignement = (el: HTMLDivElement | null) => {
    divRef.current = el;
    adjustHeight();
  };

  if (!customerId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-64">
      <Avatar className="w-12 h-12" onClick={() => setStep(step + 1)}>
        <AvatarImage src="/icons/mia.png" alt="Mia" />
        <AvatarFallback>Mia</AvatarFallback>
      </Avatar>
      <div className="pt-4">
        <motion.div
          style={{ position: "relative", top: `-${height}px` }}
          className="flex flex-col gap-12 -mt-8 ml-5"
        >
          <motion.div
            layoutId="container"
            ref={handleRefAssignement}
            className="relative mt-3 flex flex-col gap-4"
          >
            {elements.slice(0, step).map((e) => (
              <motion.div
                key={e.key}
                layoutId={e.key}
                initial={{ opacity: 1 }}
                animate={{
                  opacity: 0.5,
                  transition: { delay: 0.3, duration: 0.5 },
                }}
                exit={{ opacity: 0 }}
              >
                {e.component}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {elements.slice(step, step + 1).map((e) => (
                <motion.div
                  key={e.key}
                  layoutId={e.key}
                  style={{ zIndex: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {e.component}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
