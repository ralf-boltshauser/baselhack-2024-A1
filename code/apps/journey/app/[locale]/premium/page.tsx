"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import useStore from "~/store";
import { calculateInsurancePrice } from "~/components/pre-premium/actions";
import { getCustomer } from "~/components/pre-premium/actions";
import { Customer } from "@repo/db";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@repo/ui/lib/utils";

function PriceComparison({
  name,
  barPercentage,
  price,
}: {
  name: string;
  barPercentage: number;
  price: number;
}) {
  const isPax = name === "Pax";

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-10 gap-x-2 gap-y-1 w-full"
    >
      <div className="col-span-3">
        <p
          className={cn(
            isPax ? "text-black font-semibold" : "text-muted-foreground",
          )}
        >
          {name}
        </p>
      </div>
      <div className="my-auto col-span-4">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${barPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "bg-gray-300 h-2 my-auto rounded-sm",
            isPax && "bg-primary",
          )}
        />
      </div>
      <div className="col-span-3">
        <p className="text-muted-foreground text-sm text-right">
          CHF {price.toFixed(2)} / Month
        </p>
      </div>
    </motion.div>
  );
}

export default function Component() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyPrice, setMonthlyPrice] = useState<number | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const customerId = useStore((state) => state.customerId);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const fetchPrice = async () => {
      if (customerId) {
        try {
          const price = await calculateInsurancePrice(customerId);
          setMonthlyPrice(price);
          const customer = await getCustomer(customerId);
          setCustomer(customer);
        } catch (error) {
          // Removed console.error
        }
      }
      setIsLoading(false);
    };

    const timer = setTimeout(fetchPrice, 2000);
    return () => clearTimeout(timer);
  }, [customerId]);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div
          className="animate-spin rounded-full h-12 w-12 border border-primary/20"
          style={{
            animationDuration: "1.5s",
            borderTopColor: "var(--primary)",
            borderWidth: "1px",
          }}
        ></div>
        <div className="text-center">
          <p className="font-medium text-lg">Hang Tight!</p>
          <p className="text-muted-foreground">
            We're calculating your personal offer...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto p-4 space-y-6 mt-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <Avatar>
          <AvatarImage src="/icons/mia.png" alt="Mia" />
          <AvatarFallback>Mia</AvatarFallback>
        </Avatar>
        <p className="text-sm">
          Your offer is ready! Tap <strong>Get Covered in 5 Minutes</strong> to finish up.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <Card className="border-t-8 border-t-primary">
          <CardHeader className="text-center space-y-1">
            <h2 className="text-lg font-medium">Your Pax Death Insurance</h2>
            <div className="space-y-1">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl font-bold">CHF</span>
                <span className="text-5xl font-bold">
                  {monthlyPrice?.toFixed(2)}
                </span>
                <span className="text-lg text-muted-foreground">/ Monat</span>
              </div>
              <p className="text-sm text-muted-foreground">
                payable CHF {(monthlyPrice ? monthlyPrice * 12 : 0).toFixed(2)}{" "}
                per year
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">
                  Protection against financial consequences in case of death
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">
                  Can be concluded without a medical examination
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Paperless application</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm">Can be canceled annually</span>
              </li>
            </ul>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Insurance Sum:</span>
                <div className="flex items-center gap-2">
                  <span>CHF {customer?.insuranceSum?.toLocaleString()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-primary hover:text-primary"
                  >
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Duration:</span>
                <div className="flex items-center gap-2">
                  <span>{customer?.duration} years</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-primary hover:text-primary"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        className="font-bold"
      >
        Price comparison
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
        className="!mt-2"
      >
        We did the research for you! Here is a quick and easy comparison of our
        rates with some of our top competitors:
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-y-1"
      >
        <PriceComparison
          name="Pax"
          barPercentage={45}
          price={monthlyPrice || 0}
        />
        <PriceComparison
          name="Smile.life"
          barPercentage={62}
          price={monthlyPrice ? monthlyPrice * 1.2 : 0}
        />
        <PriceComparison
          name="Swiss Life"
          barPercentage={74}
          price={monthlyPrice ? monthlyPrice * 1.3 : 0}
        />
        <PriceComparison
          name="Helvetia"
          barPercentage={86}
          price={monthlyPrice ? monthlyPrice * 1.45 : 0}
        />
        <PriceComparison
          name="Bâloise"
          barPercentage={100}
          price={monthlyPrice ? monthlyPrice * 1.9 : 0}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="space-y-3"
      >
        <Button
          className="w-full"
          size="lg"
          onClick={() => router.push("/post-premium")}
        >
          Get Covered in 5 Minutes
        </Button>
        <Link
          href="#"
          className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          When does the death insurance pay out?
        </Link>
      </motion.div>
    </motion.div>
  );
}
