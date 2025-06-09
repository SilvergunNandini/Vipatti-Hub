"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

export default function OfferHelpPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const requestId = searchParams.get("requestId")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Help Offered",
        description: "Your offer to help has been sent to the requester!",
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link
              href="/resources"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("button.offerHelp")}</CardTitle>
              <CardDescription>Fill out this form to offer help to someone in need</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="Full Name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input id="contact" name="contact" placeholder="Phone number or email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="help-description">How can you help?</Label>
                  <Textarea
                    id="help-description"
                    name="help-description"
                    placeholder="Describe what you can offer and any specific details"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <Input id="location" name="location" placeholder="City, Area" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input id="availability" name="availability" placeholder="When are you available?" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes</Label>
                  <Textarea
                    id="additional-notes"
                    name="additional-notes"
                    placeholder="Any additional information or conditions"
                    className="min-h-[80px]"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending Offer..." : "Send Help Offer"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
