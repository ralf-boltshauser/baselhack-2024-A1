"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { CircleHelp, MessageSquareText, Phone, Plus, Save } from "lucide-react";

function FABItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default function FAB() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="fixed bottom-5 right-5">
          <button className=" w-14 h-14 bg-[#3B3A53] rounded-full shadow-lg text-white text-3xl flex items-center justify-center">
            <Plus />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-[#3B3A53] text-white flex flex-col gap-4 w-fit">
        <FABItem label="Save Progress" icon={<Save />} />
        <FABItem label="FAQ" icon={<CircleHelp />} />
        <FABItem label="Chat with Mia" icon={<MessageSquareText />} />
        <FABItem label="Call Mia" icon={<Phone />} />
      </PopoverContent>
    </Popover>
  );
}
