"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { TypeWriter } from "~/components/type-writer";

type BirthdayProperties = {
  birthday: Date | null;
};

interface BirthdayPickerProps {
  stepProperties?: BirthdayProperties;
  onUpdate?: (properties: Partial<BirthdayProperties>) => void;
  isSelected?: boolean;
}

export default function BirthdayPicker({
  stepProperties = {
    birthday: null,
  },
  onUpdate,
  isSelected = false,
}: BirthdayPickerProps) {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [date, setDate] = useState<Date | undefined>(
    stepProperties.birthday ?? undefined,
  );
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date(2000, 0));

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!customerId || !selectedDate) return;

    try {
      setDate(selectedDate);
      setOpen(false);

      await updateBirthday(customerId, selectedDate);
      onUpdate?.({ birthday: selectedDate });
      setStep(step + 1);
    } catch (error) {
      console.error("Failed to update birthday:", error);
      setDate(undefined);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <TypeWriter text="When's your birthday?" isSelected={isSelected}>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-14 px-4",
                  !date && "text-muted-foreground hover:text-primary",
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5 opacity-70" />
                {date ? (
                  <span className="font-medium">
                    {date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ) : (
                  <span>Select your birth date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 border-2">
              <div className="p-3">
                <Select
                  value={month.getFullYear().toString()}
                  onValueChange={(year) => {
                    const newYear = parseInt(year);
                    setMonth(new Date(newYear, month.getMonth()));
                    if (date) {
                      const newDate = new Date(date.setFullYear(newYear));
                      setDate(newDate);
                    }
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: new Date().getFullYear() - 1900 + 1 },
                      (_, i) => new Date().getFullYear() - i,
                    ).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date()}
                defaultMonth={new Date(2000, 0)}
                month={month}
                onMonthChange={setMonth}
                fromYear={1900}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>

          <span className="text-gray-500 underline text-sm cursor-pointer pt-2 block">
            Why is this important?
          </span>
        </div>
      </TypeWriter>
    </div>
  );
}
