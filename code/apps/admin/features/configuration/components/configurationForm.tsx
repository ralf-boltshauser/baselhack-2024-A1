"use client";

import { Input } from "@repo/ui/components/ui/input";
import ConfigurationChart from "./configurationChart";
import { Button } from "@repo/ui/components/ui/button";
import { AttributeMultiplier, AttributeName } from "@repo/db";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateAttributeMultipliers } from "../actions/update-attribute-multipliers";

function QuestionWeight({
  question,
  value,
  onChange,
}: {
  question: string;
  value: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-1">
      <p>{question}</p>
      <Input
        step={0.1}
        type="number"
        className="w-24"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const findWeight = (weights: AttributeMultiplier[], name: AttributeName) => {
  return weights.find((weight) => weight.attribute === name);
};

const questions = [
  {
    attribute: AttributeName.SMOKING,
    question: "Are you smoking ?",
  },
  {
    attribute: AttributeName.AGE,
    question: "How hold are you ?",
  },
  {
    attribute: AttributeName.BMI,
    question: "What's your BMI ?",
  },
  {
    attribute: AttributeName.DURATION,
    question: "How long the death insurance lasts ?",
  },
  {
    attribute: AttributeName.INSURANCE_SUM,
    question: "How much the insurance sum is ?",
  },
  {
    attribute: AttributeName.CARDIAC_ISSUES,
    question: "Have you had cardiac issues ?",
  },
  {
    attribute: AttributeName.DIABETIC_CONDITION,
    question: "Are you diabetic ?",
  },
  {
    attribute: AttributeName.HYPERTENSION,
    question: "Do you suffer from hypertension ?",
  },
];

export default function ConfigurationForm({
  currentWeights,
}: {
  currentWeights: AttributeMultiplier[];
}) {
  const [weights, setWeights] = useState<AttributeMultiplier[]>(currentWeights);
  const { execute, isExecuting } = useAction(updateAttributeMultipliers);

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Adjust weights</h2>
          <p className="text-sm text-foreground">
            Higher weights means lower risk appetite.
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          {questions.map(({ attribute, question }) => {
            const weight = findWeight(weights, attribute);
            return (
              <QuestionWeight
                key={attribute}
                question={question}
                value={weight?.multiplier || 0}
                onChange={(e) => {
                  const newWeights = weights.map((w) => {
                    if (w.attribute === attribute) {
                      return {
                        ...w,
                        multiplier: parseFloat(e.target.value),
                      };
                    }
                    return w;
                  });
                  setWeights(newWeights);
                }}
              />
            );
          })}
          <Button
            variant="default"
            className="w-52"
            disabled={isExecuting}
            onClick={() =>
              execute({
                multipliers: weights.map((w) => ({
                  attribute: w.attribute,
                  multiplier: w.multiplier,
                })),
              })
            }
          >
            Save and apply
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Visual representation</h2>
          <p className="text-sm text-foreground">
            This chart shows the risk appetite of your insurance pool.
          </p>
        </div>
        <ConfigurationChart
          chartData={weights.map((w) => ({
            key: w.attribute,
            weight: w.multiplier,
          }))}
        />
      </div>
    </div>
  );
}
