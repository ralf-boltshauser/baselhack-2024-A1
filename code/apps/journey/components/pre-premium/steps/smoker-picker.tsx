"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateSmokerStatus } from "../actions";
import Image from "next/image";

export default function SmokerPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const handleClick = async (isSmoker: boolean) => {
    if (!customerId) return;
    await updateSmokerStatus(customerId, isSmoker);
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <p className="text-xl font-medium">Do you smoke?</p>
      <div>
        <div className="flex gap-8">
          <Button
            onClick={() => handleClick(true)}
            variant="ghost"
            className="flex flex-col items-center w-24 h-24 p-4 hover:bg-gray-100 rounded-lg"
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
            variant="ghost"
            className="flex flex-col items-center w-24 h-24 p-4 hover:bg-gray-100 rounded-lg"
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
    </div>
  );
}
