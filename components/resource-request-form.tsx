"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle } from "lucide-react"

export default function ResourceRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUrgent, setIsUrgent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
    }, 2000)
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Request Resources</h2>
          <p className="text-muted-foreground">Fill out this form to request resources from your community</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="resource-type">Resource Type</Label>
            <Select required>
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
            <Label htmlFor="resource-name">Resource Name</Label>
            <Input id="resource-name" placeholder="e.g., Bottled Water, First Aid Kit" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what you need, quantity, and any specific requirements"
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <Input id="location" placeholder="Neighborhood, District, or Address" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input id="contact" placeholder="Phone number or other contact method" required />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
          <div className="grid gap-1.5">
            <Label htmlFor="urgent" className="flex items-center gap-2">
              Mark as Urgent
              {isUrgent && <AlertCircle className="h-4 w-4 text-red-500" />}
            </Label>
            {isUrgent && (
              <p className="text-sm text-muted-foreground">
                Urgent requests are highlighted and prioritized in the community feed
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              Submitting Request...
            </>
          ) : (
            "Submit Resource Request"
          )}
        </Button>
      </form>
    </Card>
  )
}
