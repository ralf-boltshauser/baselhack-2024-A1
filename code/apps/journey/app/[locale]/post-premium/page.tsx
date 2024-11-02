"use client";

import Main from "~/components/main";
import PremiumPost from "~/components/post-premium/steps/premium-post";
import BmiPicker from "~/components/post-premium/steps/bmi-picker";
import HealthQuestions from "~/components/post-premium/steps/health-questions";
import PickBeneficiary from "~/components/post-premium/steps/pick-beneficiary";
import PersonalInfo from "~/components/post-premium/steps/personal-info";
import { SignatureStep } from "~/components/post-premium/steps/signature";
import { ToastPage } from "~/components/post-premium/steps/toast";
import { useState } from "react";

export default function Page() {
  const [showToast, setShowToast] = useState(false);

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
      component: <SignatureStep onAccept={() => setShowToast(true)} />,
    },
  ];

  if (showToast) {
    return <ToastPage />;
  }

  return <Main elements={elements} />;
}
