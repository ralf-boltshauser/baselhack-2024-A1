"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useEffect, useRef, useState } from "react";
import useStore from "~/store";
import { createCustomer } from "./actions";

type ElementConfig<T = Record<string, unknown>> = {
  key: string;
  component: React.ReactElement;
  stepProperties: T;
};

// Update the props type
interface MainProps {
  elements: ElementConfig[];
}

export default function Main({ elements: initialElements }: MainProps) {
  const [elements, setElements] = useState(initialElements);
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const stepRef = useRef(step); // Store current step in ref to access in wheel handler

  const updateStepProperties = (key: string, newProperties: any) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.key === key
          ? {
              ...element,
              stepProperties: { ...element.stepProperties, ...newProperties },
            }
          : element,
      ),
    );
  };

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
      setHeight((divRef.current as HTMLDivElement).offsetHeight);
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
      console.log("Triggering customer creation", { customerId, loaded });
      refetch();
      console.log("refetched");
    }
  }, [customerId, loaded]);

  useEffect(() => {
    console.log("Setting loaded to true");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Customer created:", data);
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

  // Add refs to store wheel-related values
  const wheelDeltaRef = useRef(0);
  const lastWheelTimeRef = useRef(Date.now());

  // Update ref when step changes
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Add wheel event handling once
  useEffect(() => {
    const wheelThreshold = 50; // Milliseconds between wheel events
    const handleWheel = (event: WheelEvent) => {
      const currentTime = Date.now();

      // Reset wheel delta if enough time has passed
      if (currentTime - lastWheelTimeRef.current > wheelThreshold) {
        wheelDeltaRef.current = 0;
      }

      // Accumulate wheel delta
      wheelDeltaRef.current += event.deltaY;
      lastWheelTimeRef.current = currentTime;

      // If scrolling up (negative deltaY) and past threshold
      if (wheelDeltaRef.current < -100) {
        // Only move back one step and prevent multiple triggers
        if (stepRef.current > 0 && !isScrollingUp) {
          setIsScrollingUp(true);
          setStep(stepRef.current - 1);

          // Reset scroll state after animation
          setTimeout(() => {
            setIsScrollingUp(false);
          }, 500); // Match this with your animation duration

          wheelDeltaRef.current = 0;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
        <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Mia" />
        <AvatarFallback>Mia</AvatarFallback>
      </Avatar>
      <div>
        <motion.div
          style={{ position: "relative", top: `-${height}px` }}
          className="flex flex-col gap-4 -mt-8 ml-5"
          animate={{
            y: isScrollingUp ? [0, -20, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <motion.div
            layoutId="container"
            ref={handleRefAssignement}
            className="relative mt-3 flex flex-col gap-4 pointer-events-none"
          >
            {elements.slice(0, step).map((e) => (
              <motion.div
                key={e.key}
                layoutId={e.key}
                className="pointer-events-none opacity-50"
              >
                {React.cloneElement(e.component, {
                  stepProperties: e.stepProperties,
                  onUpdate: (newProperties: any) =>
                    updateStepProperties(e.key, newProperties),
                })}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {elements.slice(step, step + 1).map((e) => (
                <motion.div key={e.key} layoutId={e.key}>
                  {React.cloneElement(e.component, {
                    stepProperties: e.stepProperties,
                    onUpdate: (newProperties: any) =>
                      updateStepProperties(e.key, newProperties),
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
