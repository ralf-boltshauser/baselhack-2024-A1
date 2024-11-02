"use client";

import { useCallback, useState } from "react";
import { SignatureField } from "../../signature-field";
import { Button } from "@repo/ui/components/ui/button";

export function SignatureStep() {
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignatureChange = useCallback((newSignature: string | null) => {
    setSignature(newSignature);
  }, []);

  const handleAccept = useCallback(() => {
    // Handle accept logic here
    console.log("Signature accepted:", signature);
  }, [signature]);

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
}