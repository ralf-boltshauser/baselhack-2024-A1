"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateSmokerStatus } from "../actions";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@repo/ui/lib/utils";
import { TypeWriter } from "~/components/type-writer";

type SmokerProperties = {
  isSmoker: boolean | null;
};

interface SmokerPickerProps {
  stepProperties?: SmokerProperties;
  isSelected?: boolean;
  onUpdate?: (properties: Partial<SmokerProperties>) => void;
}

export default function SmokerPicker({
  stepProperties = {
    isSmoker: null,
  },
  isSelected = false,
  onUpdate,
}: SmokerPickerProps) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [doSmoke, setDoSmoke] = useState<boolean | null>(
    stepProperties.isSmoker,
  );

  const handleClick = async (isSmoker: boolean) => {
    if (!customerId) return;
    setDoSmoke(isSmoker);
    await updateSmokerStatus(customerId, isSmoker);
    onUpdate?.({ isSmoker });
    setStep(step + 1);
  };

  return (
    <TypeWriter text="Do you smoke?" isSelected={isSelected}>
      <div>
        <div className="flex gap-8">
          <Button
            onClick={() => handleClick(true)}
            variant={doSmoke === true ? "default" : "ghost"}
            className={cn(
              "flex flex-col items-center w-24 h-24 p-4 rounded-lg",
              "shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200",
            )}
          >
            <Image
              src="/icons/smoker.svg"
              alt="Smoking icon"
              width={48}
              height={48}
            />
            <span className="mt-2">Yes</span>
          </Button>
          <Button
            onClick={() => handleClick(false)}
            variant={doSmoke === false ? "default" : "ghost"}
            className={cn(
              "flex flex-col items-center w-24 h-24 p-4 rounded-lg",
              "shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200",
            )}
          >
            <Image
              src="/icons/non-smoker.svg"
              alt="No smoking icon"
              width={48}
              height={48}
            />
            <span className="mt-2">No</span>
          </Button>
        </div>
        <span className="text-gray-500 underline text-sm cursor-pointer pt-2 block">
          Who is classifed as smoker ?
        </span>
      </div>
    </TypeWriter>
  );
}
