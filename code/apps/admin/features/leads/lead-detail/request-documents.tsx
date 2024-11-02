"use client";
import { Customer } from "@repo/db";
import Image from "next/image";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { DialogClose } from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { requestDocuments } from "../actions/update-lead";

export default function RequestDocuments({ lead }: { lead: Customer }) {
  const [recommendedInsuranceSum, setRecommendedInsuranceSum] = useState(
    lead.recommendedInsuranceSum?.toString() || "",
  );

  const [recommendedDocuments, setRecommendedDocuments] = useState<string[]>([
    "Medical Report",
    "Medication List",
  ]);

  // TODO make design so marco is happy
  const [documents, setDocuments] = useState<string[]>(recommendedDocuments);
  const { execute } = useAction(requestDocuments);
  return (
    <div className="">
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
            <div className="flex flex-col gap-2 justify-start items-start bg-white border p-4 rounded-lg">
              <h3 className="text-lg font-bold">Required Documents</h3>
              <div className="flex flex-col gap-2">
                {recommendedDocuments.map((doc) => (
                  <div key={doc} className="flex items-center gap-2">
                    <Badge variant="orange">{doc}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-start items-start flex-grow">
              <div className="w-full bg-white border rounded-lg p-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {documents.map((doc) => (
                    <Badge key={doc} className="flex items-center gap-1">
                      {doc}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setDocuments(documents.filter((d) => d !== doc))
                        }
                      />
                    </Badge>
                  ))}
                </div>
                <Input
                  className="w-full"
                  placeholder="Add required documents"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      setDocuments([...documents, e.currentTarget.value]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <DialogClose asChild>
                <Button
                  className="w-full"
                  size={"lg"}
                  onClick={() => {
                    execute({
                      customerId: lead.id.toString(),
                      documents: documents,
                    });
                  }}
                >
                  Request Documents
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
