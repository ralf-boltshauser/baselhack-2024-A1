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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

export default function BirthdayPicker() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date>(new Date(2000, 0));

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!customerId || !selectedDate) return;

    try {
      setDate(selectedDate);
      setOpen(false);

      await updateBirthday(customerId, selectedDate);
      setStep(step + 1);
    } catch (error) {
      console.error('Failed to update birthday:', error);
      setDate(undefined);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">When's your birthday?</h2>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
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
                  (_, i) => new Date().getFullYear() - i
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
    </div>
  );
}