"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TOTAL_STEPS = {
  "pre-premium": 6,
  "post-premium": 5,
};

type KeyOfTotalSteps = keyof typeof TOTAL_STEPS;

export default function Navbar() {
  const [loadingBarWidth, setLoadingBarWidth] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    const step = parseInt(searchParams.get("step") ?? "0") || 0;
    const totalSteps =
      TOTAL_STEPS[pathname.split("/").at(-1) as KeyOfTotalSteps] || 0;
    let currentProgress = (step / totalSteps) * 100;

    if (totalSteps === 0) {
      currentProgress = 0;
    }

    setLoadingBarWidth(currentProgress);
  }, [searchParams]);

  return (
    <nav className="relative flex items-center justify-between px-12 pb-4 pt-8 bg-white shadow-md z-50">
      <div className="flex items-center justify-between space-x-12 w-full">
        <Link href="/">
          <div className="flex items-end">
            <Image
              src={"/logo/pax-logo.svg"}
              alt="Company Logo"
              width={72}
              height={72}
              className="text-blue-600"
            />
          </div>
        </Link>
        <div>
          <Select>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="EN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DE">DE</SelectItem>
              <SelectItem value="FR">FR</SelectItem>
              <SelectItem value="EN">EN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#3B3A53]"
        animate={{ width: `${loadingBarWidth}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      ></motion.div>
    </nav>
  );
}
