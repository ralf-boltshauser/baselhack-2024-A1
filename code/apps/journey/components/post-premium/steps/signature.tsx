"use client";

import { useCallback, useState } from "react";
import { SignatureField } from "../../signature-field";
import { Button } from "@repo/ui/components/ui/button";
import { ToastPage } from "./toast";

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
        <p className="text-sm text-gray-500">
          Final step! ✍️ Please add your digital signature below to confirm your
          application.
        </p>
      </div>

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
    </div>
  );
};
