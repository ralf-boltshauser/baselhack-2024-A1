"use client";

import { Gender } from "@repo/db";
import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateGender } from "../actions";
import Image from "next/image";
import { useState } from "react";
import { TypeWriter } from "~/components/type-writer";

type GenderType = "male" | "female" | null;

type GenderProperties = {
  gender: GenderType;
};

interface GenderPickerProps {
  stepProperties?: GenderProperties;
  onUpdate?: (properties: Partial<GenderProperties>) => void;
  isSelected?: boolean;
}

export default function GenderPicker({
  stepProperties = {
    gender: null,
  },
  onUpdate,
  isSelected = false,
}: GenderPickerProps) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [selectedGender, setSelectedGender] = useState<GenderType>(
    stepProperties.gender,
  );

  const handleGenderSelect = async (gender: "male" | "female") => {
    if (!customerId) return;
    setSelectedGender(gender);
    await updateGender(customerId, gender);
    onUpdate?.({
      gender,
    });
    setStep(step + 1);
  };

  return (
    <TypeWriter text="Which gender are you?" isSelected={isSelected}>
      <div>
        <div className="flex gap-8">
          <Button
            onClick={() => handleGenderSelect(Gender.male)}
            variant={selectedGender === "male" ? "default" : "ghost"}
            className="flex flex-col items-center w-24 h-24 p-4 rounded-lg"
          >
            <Image
              src="/icons/male.svg"
              alt="Male icon"
              width={48}
              height={48}
            />
            <span className="mt-2">Male</span>
          </Button>
          <Button
            onClick={() => handleGenderSelect(Gender.female)}
            variant={selectedGender === "female" ? "default" : "ghost"}
            className="flex flex-col items-center w-24 h-24 p-4 rounded-lg"
          >
            <Image
              src="/icons/female.svg"
              alt="Female icon"
              width={48}
              height={48}
            />
            <span className="mt-2">Female</span>
          </Button>
        </div>
        <span className="text-gray-500 underline text-sm cursor-pointer pt-2 block">
          Why is this important?
        </span>
      </div>
    </TypeWriter>
  );
}
