"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateSmokerStatus } from "../actions";

export default function SmokerPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const handleClick = async (isSmoker: boolean) => {
    if (!customerId) return;
    await updateSmokerStatus(customerId, isSmoker);
    setStep(step + 1);
  };

  return (
    <div>
      <p>Do you smoke?</p>
      <div className="flex gap-4">
        <Button onClick={() => handleClick(true)}>Yes</Button>
        <Button onClick={() => handleClick(false)}>No</Button>
      </div>
    </div>
  );
}
