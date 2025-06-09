"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import { createResourceOffer } from "@/app/actions/resources"
import { useToast } from "@/hooks/use-toast"

export default function OfferResourcePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    const result = await createResourceOffer(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Resource offer submitted successfully!",
      })
    }

    setIsSubmitting(false)
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
              <CardTitle>Offer Resources</CardTitle>
              <CardDescription>Share resources with your community to help during emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Resource Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="medical">Medical Supplies</SelectItem>
                        <SelectItem value="shelter">Shelter</SelectItem>
                        <SelectItem value="power">Power/Electricity</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Resource Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Bottled Water, First Aid Kit" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you're offering, condition, and any specific details"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <Input id="location" name="location" placeholder="Neighborhood, District" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input id="contact" name="contact" placeholder="Phone or email" required />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting Offer..." : "Offer Resource"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
