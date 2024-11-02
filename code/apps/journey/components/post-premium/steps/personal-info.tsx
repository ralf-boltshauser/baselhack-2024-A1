"use client";

import { Input } from "@repo/ui/components/ui/input";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import useStore from "~/store";
import AddressSearch from "~/components/address-search";
import { PhoneInput } from "~/components/phone-input";
import { updatePersonalInfo } from "../actions";

export default function PersonalInfo() {
  const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const customerId = useStore((state) => state.customerId);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleSubmit = async () => {
    if (!customerId) return;
    if (!firstName || !lastName || !email || !phone || !address) return;

    await updatePersonalInfo(customerId, firstName, lastName, address, email);
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Let's start with some basic information about you</p>

      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm opacity-75">First Name</p>
          <Input
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">Last Name</p>
          <Input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">Email</p>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">Phone Number</p>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            placeholder="Enter your phone number"
            defaultCountry="CH"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm opacity-75">Address</p>
          <AddressSearch onSelect={setAddress} />
        </div>
      </div>

      <Button
        disabled={!firstName || !lastName || !email || !phone || !address}
        className="mt-4 ml-auto w-32"
        onClick={() => handleSubmit()}
      >
        Continue
      </Button>
    </div>
  );
}
