"use client";

import { Button } from "@repo/ui/components/ui/button";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import { TypeWriter } from "~/components/type-writer";
import useStore from "~/store";
// import { updateBeneficiary } from "../actions";

interface BeneficiaryProperties {
  beneficiaryType: "Standard" | "Custom" | null;
  beneficiaryFirstName: string;
  beneficiaryLastName: string;
  beneficiaryEmail: string;
  beneficiaryPhone: string;
  beneficiaryAddress: string;
  beneficiaryRelationship: string;
  beneficiaryPercentage: number;
}

interface BeneficiaryProps {
  stepProperties: BeneficiaryProperties;
  isSelected?: boolean;
  onUpdate: (properties: Partial<BeneficiaryProperties>) => void;
}

export default function PickBeneficiary({
  stepProperties = {
    beneficiaryType: null,
    beneficiaryFirstName: "",
    beneficiaryLastName: "",
    beneficiaryEmail: "",
    beneficiaryPhone: "",
    beneficiaryAddress: "",
    beneficiaryRelationship: "",
    beneficiaryPercentage: 0,
  },
  isSelected = false,
  onUpdate,
}: BeneficiaryProps) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [beneficiary, setBeneficiary] = React.useState<
    "Standard" | "Custom" | null
  >(stepProperties.beneficiaryType);

  const handleClick = async (newBeneficiary: "Standard" | "Custom") => {
    setBeneficiary(newBeneficiary);
    if (!customerId) {
      return;
    }
    // await updateBeneficiary(customerId, newBeneficiary);
    onUpdate({
      beneficiaryType: newBeneficiary,
      // Reset other fields when changing type
      beneficiaryFirstName: "",
      beneficiaryLastName: "",
      beneficiaryEmail: "",
      beneficiaryPhone: "",
      beneficiaryAddress: "",
      beneficiaryRelationship: "",
      beneficiaryPercentage: 0,
    });
    setStep(step + 1);
  };

  return (
    <div>
      <TypeWriter
        text="Choose a beneficiary: 'Standard' or 'Custom'"
        isSelected={isSelected}
      >
        <div className="flex gap-4 mt-4 pl-8">
          <Button
            onClick={() => handleClick("Standard")}
            variant={beneficiary === "Standard" ? "default" : "outline"}
          >
            Standard
          </Button>
          <Button
            onClick={() => handleClick("Custom")}
            variant={beneficiary === "Custom" ? "default" : "outline"}
          >
            Custom
          </Button>
        </div>
      </TypeWriter>
    </div>
  );
}
