"use client";

import { Input } from "@repo/ui/components/ui/input";
import ConfigurationChart from "./configurationChart";
import { Button } from "@repo/ui/components/ui/button";
import { AttributeMultiplier, AttributeName } from "@repo/db";
import { useState } from "react";

function QuestionWeight({
  question,
  value,
  onChange,
}: {
  question: string;
  value: number;
  onChange: (e: any) => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-1">
      <p>{question}</p>
      <Input type="number" className="w-24" value={value} onChange={onChange} />
    </div>
  );
}

const findWeight = (weights: AttributeMultiplier[], name: AttributeName) => {
  return weights.find((weight) => weight.attribute === name);
};

export default function ConfigurationForm({
  currentWeights,
}: {
  currentWeights: AttributeMultiplier[];
}) {
  const [weights, setWeights] = useState<AttributeMultiplier[]>(currentWeights);

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
          {/* <QuestionWeight
            question="Are you smoking ?"
            value={findWeight(weights, AttributeName.SMOKING)
            onChange={(e) =>
              setWeights({ ...weights, SMOKING: e.target.value })
            }
          />
          <QuestionWeight
            question="How hold are you ?"
            value={weights.AGE}
            onChange={(e) => setWeights({ ...weights, AGE: e.target.value })}
          />
          <QuestionWeight
            question="What's your BMI ?"
            value={weights.BMI}
            onChange={(e) => setWeights({ ...weights, BMI: e.target.value })}
          />
          <QuestionWeight
            question="How long the death insurance lasts ?"
            value={weights.DURATION}
            onChange={(e) =>
              setWeights({ ...weights, DURATION: e.target.value })
            }
          />
          <QuestionWeight
            question="How much the insurance sum is ?"
            value={weights.INSURANCE_SUM}
            onChange={(e) =>
              setWeights({ ...weights, INSURANCE_SUM: e.target.value })
            }
          />
          <QuestionWeight
            question="Have you had cardiac issues ?"
            value={weights.CARDIAC_ISSUES}
            onChange={(e) =>
              setWeights({ ...weights, CARDIAC_ISSUES: e.target.value })
            }
          />
          <QuestionWeight
            question="Are you diabetic ?"
            value={weights.DIABETIC_CONDITION}
            onChange={(e) =>
              setWeights({ ...weights, DIABETIC_CONDITION: e.target.value })
            }
          />
          <QuestionWeight
            question="Do you suffer from hypertension ?"
            value={weights.HYPERTENSION}
            onChange={(e) =>
              setWeights({ ...weights, HYPERTENSION: e.target.value })
            }
          /> */}
          <Button variant="default" className="w-52">
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
        <ConfigurationChart chartData={[]} />
      </div>
    </div>
  );
}
