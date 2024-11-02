"use client";

import { Input } from "@repo/ui/components/ui/input";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import useStore from "~/store";
import { MedicalHistory } from "@repo/db";
import { updateHealthQuestions } from "../actions";

export default function HealthQuestions() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const [hasChronicIllness, setHasChronicIllness] = React.useState<
    boolean | null
  >(null);
  const [hasHospitalization, setHasHospitalization] = React.useState<
    boolean | null
  >(null);
  const [hasSeriousIllness, setHasSeriousIllness] = React.useState<
    boolean | null
  >(null);
  const [hasPrescription, setHasPrescription] = React.useState<boolean | null>(
    null,
  );
  const [chronicIllnessesInfo, setChronicIllnessesInfo] =
    React.useState<string>("");
  const [hospitalizationInfo, setHospitalizationInfo] =
    React.useState<string>("");
  const [seriousIllnessesInfo, setSeriousIllnessesInfo] =
    React.useState<string>("");
  const [medicationInfo, setMedicationInfo] = React.useState<string>("");

  const handleSelection = (
    setter: (value: boolean) => void,
    value: boolean,
  ) => {
    setter(value);
  };

  const handleSubmit = async () => {
    console.log("customerId", customerId);
    if (!customerId) return;
    console.log("here");
    if (
      hasChronicIllness === null ||
      hasHospitalization === null ||
      hasSeriousIllness === null ||
      hasPrescription === null
    )
      return;

    console.log("here1");
    // Validate that info is not empty when condition is true
    if (hasChronicIllness && chronicIllnessesInfo === "") return;
    if (hasHospitalization && hospitalizationInfo === "") return;
    if (hasSeriousIllness && seriousIllnessesInfo === "") return;
    if (hasPrescription && medicationInfo === "") return;

    console.log("here2");
    const medicalHistory: Omit<MedicalHistory, "id" | "customerId"> = {
      hasChronicIllnesses: hasChronicIllness ?? false,
      chronicIllnessesInfo: hasChronicIllness ? chronicIllnessesInfo : null,
      wasHospitalized: hasHospitalization ?? false,
      hospitalizationInfo: hasHospitalization ? hospitalizationInfo : null,
      hasSeriousIllnesses: hasSeriousIllness ?? false,
      seriousIllnessesInfo: hasSeriousIllness ? seriousIllnessesInfo : null,
      takesMedication: hasPrescription ?? false,
      medicationInfo: hasPrescription ? medicationInfo : null,
    };
    console.log("medicalHistory", medicalHistory);
    await updateHealthQuestions(customerId, medicalHistory);
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Just a few quick health questions to finalize your application :)</p>

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm opacity-75">
            Do you have any chronic illnesses, like diabetes or high blood
            pressure?
          </p>
          <div className="flex gap-4">
            <Button
              variant={hasChronicIllness === true ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasChronicIllness, true)}
            >
              Yes
            </Button>
            <Button
              variant={hasChronicIllness === false ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasChronicIllness, false)}
            >
              No
            </Button>
          </div>
          {hasChronicIllness && (
            <div className="space-y-2 mt-2">
              <p className="text-sm opacity-75">
                Please describe your chronic illness(es):
              </p>
              <Input
                placeholder="Enter details about your chronic illness"
                value={chronicIllnessesInfo}
                onChange={(e) => setChronicIllnessesInfo(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">
            In the last 5 years, have you been hospitalized or had any
            surgeries?
          </p>
          <div className="flex gap-4">
            <Button
              variant={hasHospitalization === true ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasHospitalization, true)}
            >
              Yes
            </Button>
            <Button
              variant={hasHospitalization === false ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasHospitalization, false)}
            >
              No
            </Button>
          </div>
          {hasHospitalization && (
            <div className="space-y-2 mt-2">
              <p className="text-sm opacity-75">
                Please provide details about your hospitalization/surgeries:
              </p>
              <Input
                placeholder="Enter details about your hospital stays or surgeries"
                value={hospitalizationInfo}
                onChange={(e) => setHospitalizationInfo(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">
            Have you ever been diagnosed with a serious illness, like cancer or
            a heart condition?
          </p>
          <div className="flex gap-4">
            <Button
              variant={hasSeriousIllness === true ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasSeriousIllness, true)}
            >
              Yes
            </Button>
            <Button
              variant={hasSeriousIllness === false ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasSeriousIllness, false)}
            >
              No
            </Button>
          </div>
          {hasSeriousIllness && (
            <div className="space-y-2 mt-2">
              <p className="text-sm opacity-75">
                Please describe your serious illness(es):
              </p>
              <Input
                placeholder="Enter details about your serious illness"
                value={seriousIllnessesInfo}
                onChange={(e) => setSeriousIllnessesInfo(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">
            Are you taking any prescription medication?
          </p>
          <div className="flex gap-4">
            <Button
              variant={hasPrescription === true ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasPrescription, true)}
            >
              Yes
            </Button>
            <Button
              variant={hasPrescription === false ? "default" : "outline"}
              size="lg"
              onClick={() => handleSelection(setHasPrescription, false)}
            >
              No
            </Button>
          </div>
          {hasPrescription && (
            <div className="space-y-2 mt-2">
              <p className="text-sm opacity-75">
                Please list your current medications:
              </p>
              <Input
                placeholder="Enter your current medications"
                value={medicationInfo}
                onChange={(e) => setMedicationInfo(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <Button
        disabled={
          hasChronicIllness == null ||
          hasHospitalization == null ||
          hasSeriousIllness == null ||
          hasPrescription == null ||
          (hasChronicIllness && chronicIllnessesInfo === "") ||
          (hasHospitalization && hospitalizationInfo === "") ||
          (hasSeriousIllness && seriousIllnessesInfo === "") ||
          (hasPrescription && medicationInfo === "")
        }
        className="mt-4 ml-auto w-32"
        onClick={() => handleSubmit()}
      >
        Continue
      </Button>
    </div>
  );
}