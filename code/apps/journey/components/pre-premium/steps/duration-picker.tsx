"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "~/store";
import { updateDuration } from "../actions";

type DurationProperties = {
  duration: number | null;
};

interface DurationPickerProps {
  stepProperties: DurationProperties;
  onUpdate: (properties: Partial<DurationProperties>) => void;
}

export default function DurationPicker({
  stepProperties = {
    duration: null,
  },
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
      <p className="text-lg font-medium">How long do you need coverage?</p>

      <div className="flex gap-2 flex-wrap">
        {durations.map((duration) => (
          <Button
            key={duration}
            variant={selectedDuration === duration ? "default" : "outline"}
            onClick={async () => {
              setSelectedDuration(duration);
              if (!customerId) return;
              await updateDuration(customerId, duration);
              onUpdate({ duration });
              router.push("/premium");
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
