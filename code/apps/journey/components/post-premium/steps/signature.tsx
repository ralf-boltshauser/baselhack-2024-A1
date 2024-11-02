"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useCallback, useState } from "react";
import { SignatureField } from "../../signature-field";
import { ToastPage } from "./toast";
import { TypeWriter } from "~/components/type-writer";

interface SignatureStepProps {
  onAccept: () => void;
}

export const SignatureStep = ({ onAccept }: SignatureStepProps) => {
  const [signature, setSignature] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSignatureChange = useCallback((newSignature: string | null) => {
    setSignature(newSignature);
  }, []);

  const handleAccept = useCallback(() => {
    setShowToast(true);
    onAccept();
  }, [onAccept]);

  if (showToast) {
    return <ToastPage />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Your Signature</h2>
      </div>
      <TypeWriter
        text="Final step! ✍️ Please add your digital signature below to confirm your application."
        isSelected={true}
      >
        <SignatureField
          value={signature ?? undefined}
          onChange={handleSignatureChange}
          label="Sign here"
        />

        <Button
          disabled={!signature}
          className="w-fit float-right"
          onClick={handleAccept}
        >
          Accept and Continue
        </Button>
      </TypeWriter>
    </div>
  );
};
