"use client";

import { useState } from "react";
import Main from "~/components/main";
import { finalSubmission } from "~/components/post-premium/actions";
import BmiPicker from "~/components/post-premium/steps/bmi-picker";
import HealthQuestions from "~/components/post-premium/steps/health-questions";
import PersonalInfo from "~/components/post-premium/steps/personal-info";
import PickBeneficiary from "~/components/post-premium/steps/pick-beneficiary";
import PremiumPost from "~/components/post-premium/steps/premium-post";
import { SignatureStep } from "~/components/post-premium/steps/signature";
import { ToastPage } from "~/components/post-premium/steps/toast";
import useStore from "~/store";

export default function Page() {
  const [showToast, setShowToast] = useState(false);
  const customerId = useStore((state) => state.customerId);

  const elements = [
    {
      key: "premiumPost",
      component: <PremiumPost />,
    },
    {
      key: "bmiPicker",
      component: (
        <BmiPicker
          stepProperties={{
            height: null,
            weight: null,
            bmi: null,
          }}
          onUpdate={() => {}}
        />
      ),
    },
    {
      key: "healthQuestions",
      component: (
        <HealthQuestions
          stepProperties={{
            hasChronicIllness: null,
            hasHospitalization: null,
            hasSeriousIllness: null,
            hasPrescription: null,
            chronicIllnessesInfo: "",
            hospitalizationInfo: "",
            seriousIllnessesInfo: "",
            medicationInfo: "",
          }}
          onUpdate={() => {}}
        />
      ),
    },
    {
      key: "pickBeneficiary",
      component: (
        <PickBeneficiary
          stepProperties={{
            beneficiaryType: null,
            beneficiaryFirstName: "",
            beneficiaryLastName: "",
            beneficiaryEmail: "",
            beneficiaryPhone: "",
            beneficiaryAddress: "",
            beneficiaryRelationship: "",
            beneficiaryPercentage: 0,
          }}
          onUpdate={() => {}}
        />
      ),
    },
    {
      key: "personalInfo",
      component: (
        <PersonalInfo
          stepProperties={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
          }}
          onUpdate={() => {}}
        />
      ),
    },
    {
      key: "signature",
      component: (
        <SignatureStep
          onAccept={() => {
            setShowToast(true);
            if (customerId) {
              finalSubmission(customerId);
            }
          }}
        />
      ),
    },
  ];

  if (showToast) {
    return <ToastPage />;
  }

  return (
    <Main elements={elements.map((el) => ({ ...el, stepProperties: {} }))} />
  );
}
