"use client";
import { Customer } from "@repo/db";
import { Button } from "@repo/ui/components/ui/button";
import { DialogClose } from "@repo/ui/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { approveRequest } from "../actions/update-lead";

export default function ApproveRequest({ lead }: { lead: Customer }) {
  const { execute } = useAction(approveRequest);

  return (
    <DialogClose asChild>
      <Button
        size="lg"
        onClick={() => {
          execute({
            customerId: lead.id.toString(),
          });
        }}
      >
        Approve Request
      </Button>
    </DialogClose>
  );
}
