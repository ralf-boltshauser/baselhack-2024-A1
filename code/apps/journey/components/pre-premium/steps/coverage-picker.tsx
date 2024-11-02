"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Slider } from "@repo/ui/components/ui/slider";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import useStore from "~/store";
import { updateCoverageAmount } from "../actions";

export default function CoveragePicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [coverage, setCoverage] = useState(100000);
  const [inputValue, setInputValue] = useState("100,000");

  const MIN_COVERAGE = 10000;
  const MAX_COVERAGE = 2000000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue.replace(/\D/g, ''));
    if (isNaN(value)) {
      setInputValue(coverage.toLocaleString());
      return;
    }
    const clampedValue = Math.min(Math.max(value, MIN_COVERAGE), MAX_COVERAGE);
    setCoverage(clampedValue);
    setInputValue(clampedValue.toLocaleString());
  };

  const handleSliderChange = (value: number[]) => {
    if (value[0] != null) {
      const newValue = value[0];
      setCoverage(newValue);
      setInputValue(newValue.toLocaleString());
    }
  };

  const handleSubmit = async () => {
    if (!customerId) return;
    await updateCoverageAmount(customerId, coverage);
    setStep(step + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur(); // This will trigger the handleInputBlur
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <p className="text-lg font-medium">How much coverage do you need?</p>
      
      <div className="space-y-4">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="text-right"
        />
        
        <div className="w-full">
          <Slider
            value={[coverage]}
            min={MIN_COVERAGE}
            max={MAX_COVERAGE}
            step={10000}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{MIN_COVERAGE.toLocaleString()}</span>
            <span>{MAX_COVERAGE.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full"
      >
        Continue
      </Button>
    </div>
  );
}
