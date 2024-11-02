"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@repo/ui/lib/utils";
import { motion } from "framer-motion";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [width, setWidth] = React.useState(0);
  const [x, setX] = React.useState(0);
  const triggersRef = React.useRef<HTMLButtonElement[]>([]);

  React.useEffect(() => {
    const newCurrent = triggersRef.current.slice(
      0,
      (props!.children! as any).length,
    );
    triggersRef.current = newCurrent;
  }, [props.children]);

  React.useEffect(() => {
    if (!triggersRef.current[activeTab]) return;
    setWidth(triggersRef.current[activeTab].offsetWidth);
    setX(triggersRef.current[activeTab].offsetLeft);
  }, [activeTab, triggersRef.current]);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "relative inline-flex h-10 items-center justify-start p-1 text-muted-foreground w-full border-b-[1px] ",
        className,
      )}
      {...props}
    >
      {React.Children.map(props.children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          ref: (el: HTMLButtonElement) => (triggersRef.current[index] = el),
          onClick: () => setActiveTab(index),
          className: cn(
            index === activeTab ? "!text-primary" : "text-muted-foreground",
          ),
        }),
      )}
      <motion.div
        className="absolute bottom-[-1.5px] h-0.5 bg-primary"
        layout
        initial={false}
        animate={{
          width,
          x,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
