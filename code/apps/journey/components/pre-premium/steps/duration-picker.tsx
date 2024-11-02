"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import useStore from "~/store";
import { updateCoverageAmount } from "../actions";

export default function DurationPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const durations = [5, 10, 15, 20] as const;

  return (
    <div className="space-y-6 w-full max-w-md">
      <p className="text-lg font-medium">How long do you need coverage?</p>
      
      <div className="flex gap-2 flex-wrap">
        {durations.map((duration) => (
          <Button
            key={duration}
            variant={selectedDuration === duration ? "default" : "outline"}
            onClick={async () => {
              setSelectedDuration(duration);
              if (!customerId) return;
              await updateCoverageAmount(customerId, duration);
              setStep(step + 1);
            }}
            className="flex-1 min-w-[4rem]"
          >
            {`${duration} years`}
          </Button>
        ))}
      </div>
    </div>
  );
}
