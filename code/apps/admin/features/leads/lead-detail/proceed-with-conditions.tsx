"use client";
import { Customer } from "@repo/db";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { proceedWithConditions } from "../actions/update-lead";

export default function ProceedWithConditions({ lead }: { lead: Customer }) {
  const [recommendedInsuranceSum, setRecommendedInsuranceSum] = useState(
    lead.recommendedInsuranceSum?.toString() || "",
  );

  const { execute } = useAction(proceedWithConditions);
  return (
    <div className="bg-gray-100 p-12">
      <div className="flex flex-row gap-4 justify-start items-start">
        <Image
          src="/green-wizard.png"
          alt="Wizard"
          className="rounded-full"
          width={50}
          height={50}
        />
        <div className="flex flex-col gap-8 justify-start items-start">
          <p>
            Some manual operations are required to complete this process, below
            you can see my recommendation:
          </p>
          <div className="flex flex-row gap-12 justify-start items-stretch">
            <div className="flex flex-col gap-2 justify-start items-start bg-white border  p-4 rounded-lg">
              <h3 className="text-lg font-bold">Insured Amount</h3>
              <div className="flex flex-row gap-2 justify-start items-center">
                <Badge variant="orange">
                  {lead.insuranceSum?.toLocaleString("de-CH")} CHF
                </Badge>
                <ArrowRight />
                <Badge>
                  {lead.recommendedInsuranceSum?.toLocaleString("de-CH")} CHF
                </Badge>
              </div>
              <p className="underline text-sm text-muted-foreground">
                Why is this recommended?
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end items-start flex-grow">
              <Input
                type="number"
                className="w-full text-lg"
                value={recommendedInsuranceSum}
                placeholder="Enter the new insured amount"
                onChange={(e) => {
                  setRecommendedInsuranceSum(e.target.value);
                }}
              />
              <Button
                className="w-full "
                size={"lg"}
                onClick={() => {
                  execute({
                    customerId: lead.id.toString(),
                    recommendedInsuranceSum: Number(recommendedInsuranceSum),
                  });
                }}
              >
                Send updated contract!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
