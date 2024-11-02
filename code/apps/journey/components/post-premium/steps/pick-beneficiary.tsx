"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
// import { updateBeneficiary } from "../actions";

export default function PickBeneficiary() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const handleClick = async (beneficiary: string) => {
    console.log(customerId);
    if (!customerId) {
      return;
    }
    console.log("step", step);
    // await updateBeneficiary(customerId, beneficiary);
    setStep(step + 1);
  };

  return (
    <div>
      <p>Choose a beneficiary: 'Standard' or 'Custom</p>
      <div className="flex gap-4 mt-4 pl-8">
        <Button onClick={() => handleClick("Standard")}>Standard</Button>
        <Button onClick={() => handleClick("Custom")}>Custom</Button>
      </div>
    </div>
  );
}
