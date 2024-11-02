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
      component: <BmiPicker />,
    },
    {
      key: "healthQuestions",
      component: <HealthQuestions />,
    },
    {
      key: "pickBeneficiary",
      component: <PickBeneficiary />,
    },
    {
      key: "personalInfo",
      component: <PersonalInfo />,
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

  return <Main elements={elements} />;
}
