'use client';
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <div className="text-center">
          <p className="font-medium text-lg">Hang Tight!</p>
          <p className="text-muted-foreground">We're calculating your personal offer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <p className="text-sm">Your offer's ready! Tap 'Get Covered in 5 Minutes' to finish up.</p>
      </div>

      <Card className="border-t-8 border-t-primary">
        <CardHeader className="text-center space-y-1">
          <h2 className="text-lg font-medium">Your Pax Death Insurance</h2>
          <div className="space-y-1">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold">CHF</span>
              <span className="text-5xl font-bold">28.75</span>
              <span className="text-lg text-muted-foreground">/ Monat</span>
            </div>
            <p className="text-sm text-muted-foreground">payable CHF 344.60 per year</p>
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
                <span>CHF 610,000.00</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Term:</span>
              <div className="flex items-center gap-2">
                <span>10 Years</span>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" size="lg">
          Get Covered in 5 Minutes
        </Button>
        <Link
          href="#"
          className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          When does the death insurance pay out?
        </Link>
      </div>
    </div>
  )
}