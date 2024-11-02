"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "~/store";
import { updateDuration } from "../actions";
import { TypeWriter } from "~/components/type-writer";
type DurationProperties = {
  duration: number | null;
};

interface DurationPickerProps {
  stepProperties?: DurationProperties;
  isSelected?: boolean;
  onUpdate?: (properties: Partial<DurationProperties>) => void;
}

export default function DurationPicker({
  stepProperties = {
    duration: null,
  },
  isSelected = false,
  onUpdate,
}: DurationPickerProps) {
  const customerId = useStore((state) => state.customerId);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(
    stepProperties.duration,
  );
  const router = useRouter();

  const durations = [5, 10, 15, 20] as const;

  return (
    <div className="space-y-6 w-full max-w-md">
      <TypeWriter text="How long do you need coverage?" isSelected={isSelected}>
        <div>
          <div className="flex gap-2 flex-wrap">
            {durations.map((duration) => (
              <Button
                key={duration}
                variant={selectedDuration === duration ? "default" : "outline"}
                onClick={async () => {
                  setSelectedDuration(duration);
                  if (!customerId) return;
                  await updateDuration(customerId, duration);
                  onUpdate?.({ duration });
                  router.push("/premium");
                }}
                className="flex-1 min-w-[4rem]"
              >
                {`${duration} years`}
              </Button>
            ))}
          </div>

          <span className="text-gray-500 underline text-sm cursor-pointer pt-2 block">
            What term makes sense for me?
          </span>
        </div>
      </TypeWriter>
    </div>
  );
}
