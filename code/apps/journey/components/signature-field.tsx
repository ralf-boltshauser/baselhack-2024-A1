"use client";

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignatureFieldProps {
  onChange: (signature: string | null) => void;
  value?: string;
  label?: string;
}

export function SignatureField({
  onChange,
  value,
  label = "Signature",
}: SignatureFieldProps) {
  const signatureRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    signatureRef.current?.clear();
    onChange(null);
  };

  const handleSave = () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      return;
    }

    const signatureData = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    onChange(signatureData);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm opacity-75">{label}</p>
      <div className="border rounded-md bg-white">
        <SignatureCanvas
          ref={signatureRef}
          onEnd={handleSave}
          canvasProps={{
            className: "w-full h-[200px]",
          }}
          backgroundColor="white"
        />
      </div>
      <button
        onClick={handleClear}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Clear signature
      </button>
    </div>
  );
}
