'use client';
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import useStore from "~/store";
import { calculateInsurancePrice } from "~/components/pre-premium/actions";
import { getCustomer } from "~/components/pre-premium/actions";
import { Customer } from "@repo/db";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <div 
          className="animate-spin rounded-full h-12 w-12 border border-primary/20" 
          style={{ 
            animationDuration: '1.5s',
            borderTopColor: 'var(--primary)',
            borderWidth: '1px'
          }}
        ></div>
        <div className="text-center">
          <p className="font-medium text-lg">Hang Tight!</p>
          <p className="text-muted-foreground">We're calculating your personal offer...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto p-4 space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <p className="text-sm">Your offer's ready! Tap 'Get Covered in 5 Minutes' to finish up.</p>
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
              <span className="text-5xl font-bold">{monthlyPrice?.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground">/ Monat</span>
            </div>
            <p className="text-sm text-muted-foreground">
              payable CHF {(monthlyPrice ? monthlyPrice * 12 : 0).toFixed(2)} per year
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">Protection against financial consequences in case of death</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm">Can be concluded without a medical examination</span>
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
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Term:</span>
              <div className="flex items-center gap-2">
                <span>{customer?.duration} years</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary">
                  Edit
                </Button>
              </div>
            </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="space-y-3"
      >
        <Button className="w-full" size="lg" onClick={() => router.push('/post-premium')}>
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
  )
}