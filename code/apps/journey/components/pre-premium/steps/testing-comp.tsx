"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Intro() {
  const [city, setCity] = useState("");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch(`https://ipinfo.io?token=9fb17b5e4f9b82`);
        const data = await response.json();
        if (data.city) {
          setCity(data.city);
        }
      } catch (error) {
        console.error("Failed to fetch IP location", error);
      }
    }

    fetchLocation();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-black w-fit relative font-bold flex flex-row gap-2 items-baseline">
        Hello I'm Mia
        <Image
          src={"/icons/waving-hand.png"}
          alt="Waving hand"
          width={32}
          height={32}
          className="absolute -right-10"
        />
      </h2>
      <div className="flex flex-col gap-4">
        <p>
          your insurance expert from{" "}
          <span className="text-primary">{city ?? "Zurich"}</span>
        </p>
        <p>
          I'll guide you through a four quick questions to get your price. no
          commitment, and no personal info needed just yet! pre-premium plan for
          you.
        </p>
      </div>
    </div>
  );
}
