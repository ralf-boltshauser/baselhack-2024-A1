"use client";

import { Gender } from "@repo/db";
import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateGender } from "../actions";

export default function GenderPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const handleClick = async (gender: Gender) => {
    if (!customerId) {
      return;
    }
    await updateGender(customerId, gender);
    setStep(step + 1);
  };

  return (
    <div>
      <p>Which gender are you?</p>
      <div className="flex gap-4">
        <Button onClick={() => handleClick(Gender.male)}>Male</Button>
        <Button onClick={() => handleClick(Gender.female)}>Female</Button>
      </div>
    </div>
  );
}
