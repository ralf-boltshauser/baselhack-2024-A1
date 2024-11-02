"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Calendar } from "@repo/ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { cn } from "@repo/ui/lib/utils";
import { parseAsInteger, useQueryState } from "nuqs";
import useStore from "~/store";
import { updateBirthday } from "../actions";
import { useState } from "react";

export default function BirthdayPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [date, setDate] = useState<Date>();

  const handleSubmit = async () => {
    if (!customerId || !date) {
      return;
    }
    await updateBirthday(customerId, date);
    setStep(step + 1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">When's your birthday?</h2>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-14 px-4",
              !date && "text-muted-foreground hover:text-primary"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 opacity-70" />
            {date ? (
              <span className="font-medium">{format(date, "MMMM yyyy")}</span>
            ) : (
              <span>Select your birth date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date > new Date()}
            defaultMonth={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            captionLayout="dropdown-buttons"
            classNames={{
              months: "space-y-4",
              nav: "flex items-center justify-center gap-2",
              nav_button_previous: "flex items-center justify-center",
              nav_button_next: "flex items-center justify-center",
              caption: "flex items-center gap-2",
              caption_label: "hidden",
              dropdown_month: "hidden",
              dropdown_year: "text-lg font-semibold h-9 w-[120px] rounded-md focus:outline-none focus:ring-2 focus:ring-primary",
              head: "hidden",
              table: "w-full border-collapse",
              cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal hover:bg-primary hover:text-primary-foreground",
              day_selected: "bg-primary text-primary-foreground",
            }}
          />
        </PopoverContent>
      </Popover>

      <Button 
        onClick={handleSubmit}
        disabled={!date}
        className="w-full h-12 text-base font-medium"
      >
        Continue
      </Button>
    </div>
  );
}