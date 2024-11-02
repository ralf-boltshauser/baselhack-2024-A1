"use client";

import { Input } from "@repo/ui/components/ui/input";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import useStore from "~/store";
import { updateBmi } from "../actions";
import { Button } from "@repo/ui/components/ui/button";
import { TypeWriter } from "~/components/type-writer";

type BmiStepProperties = {
  height: number | null;
  weight: number | null;
  bmi: number | null;
};

interface BmiPickerProps {
  stepProperties: BmiStepProperties;
  isSelected?: boolean;
  onUpdate: (properties: Partial<BmiStepProperties>) => void;
}

export default function BmiPicker({
  stepProperties = {
    height: null,
    weight: null,
    bmi: null,
  },
  isSelected = false,
  onUpdate,
}: BmiPickerProps) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [height, setHeight] = React.useState<string>(
    stepProperties.height ? stepProperties.height.toString() : "",
  );
  const [weight, setWeight] = React.useState<string>(
    stepProperties.weight ? stepProperties.weight.toString() : "",
  );
  const [bmi, setBmi] = React.useState<number | null>(
    stepProperties.bmi ? stepProperties.bmi : null,
  );

  const calculateBMI = (height: string, weight: string) => {
    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInM > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInM * heightInM);
      return parseFloat(bmiValue.toFixed(1));
    }
    return null;
  };

  const handleHeightChange = async (value: string) => {
    setHeight(value);
    if (!customerId) {
      return;
    }
    if (value && weight) {
      const newBmi = calculateBMI(value, weight);
      setBmi(newBmi);
      if (newBmi) {
        await updateBmi(customerId, newBmi);
        setStep(step + 1);
      }
    }
  };

  const handleWeightChange = async (value: string) => {
    setWeight(value);
    if (!customerId) {
      return;
    }
    if (height && value) {
      const newBmi = calculateBMI(height, value);
      setBmi(newBmi);
      if (newBmi) {
        await updateBmi(customerId, newBmi);
      }
    }
  };

  console.log(onUpdate);
  console.log(stepProperties);
  return (
    <div>
      <TypeWriter
        text="Let's get your BMI! Just enter your height and weight below. All Info is kept confidential"
        isSelected={isSelected}
      >
        <div className="mt-4">
          <h1 className="text-2xl">BMI: {bmi ?? "XX.X"}</h1>
          <div className="mt-4 flex flex-row gap-4">
            <Input
              type="number"
              placeholder="Height (cm)"
              className="w-full text-lg h-14"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              onChange={(e) => handleHeightChange(e.target.value)}
              value={height}
            />
            <Input
              type="number"
              placeholder="Weight (kg)"
              className="w-full text-lg h-14"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              onChange={(e) => handleWeightChange(e.target.value)}
              value={weight}
            />
          </div>
          <div className="mt-4">
            <Button
              disabled={!bmi}
              className="w-fit float-right"
              onClick={async () => {
                if (!customerId || !bmi) return;
                await updateBmi(customerId, bmi);
                onUpdate({
                  height: parseFloat(height),
                  weight: parseFloat(weight),
                  bmi: bmi,
                });
                setStep(step + 1);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </TypeWriter>
    </div>
  );
}
