"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Droplet, Utensils, AmbulanceIcon as FirstAid, Battery, Home, Plus } from "lucide-react"
import ResourceRequestForm from "@/components/resource-request-form"
import Header from "@/components/header"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

interface Resource {
  id: string
  title: string
  category: string
  icon: JSX.Element
  location: string
  contact: string
  available: boolean
  urgent?: boolean
  quantity?: number
  description?: string
}

interface ResourceRequest {
  id: string
  requesterName: string
  requesterContact: string
  resourceType: string
  description: string
  location: string
  urgent: boolean
  timestamp: string
}

export default function ResourcesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [receivedRequests, setReceivedRequests] = useState<ResourceRequest[]>([])

  useEffect(() => {
    // Mock received requests data
    const mockRequests: ResourceRequest[] = [
      {
        id: "1",
        requesterName: "Priya Sharma",
        requesterContact: "9876543210",
        resourceType: "Medical Supplies",
        description: "Need insulin for diabetic patient urgently",
        location: "Delhi, Sector 15",
        urgent: true,
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        requesterName: "Raj Kumar",
        requesterContact: "9876543211",
        resourceType: "Food",
        description: "Food supplies needed for family of 5",
        location: "Mumbai, Andheri",
        urgent: false,
        timestamp: "4 hours ago",
      },
    ]
    setReceivedRequests(mockRequests)
  }, [])

  const handleRequestResource = (resourceId: string) => {
    toast({
      title: "Request Sent",
      description: t("message.requestSent"),
    })
  }

  const handleOfferHelp = (requestId: string) => {
    // Redirect to offer help form
    window.location.href = `/resources/offer-help?requestId=${requestId}`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Community Resources</h1>
          <p className="text-muted-foreground">
            Request and share essential resources with your community during emergencies
          </p>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="available">Available Resources</TabsTrigger>
              <TabsTrigger value="needed">Needed Resources</TabsTrigger>
              <TabsTrigger value="received">Received Requests</TabsTrigger>
              <TabsTrigger value="request">Request Resources</TabsTrigger>
            </TabsList>
            <Button asChild>
              <Link href="/resources/offer">
                <Plus className="mr-2 h-4 w-4" />
                Offer Resources
              </Link>
            </Button>
          </div>

          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Bottled Water (24 pack)"
                category="Water"
                icon={<Droplet className="h-5 w-5" />}
                location="Downtown Delhi, 2.3 km away"
                contact="John D."
                available={true}
                onRequest={() => handleRequestResource("1")}
              />
              <ResourceCard
                title="First Aid Supplies"
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                location="Mumbai Westside, 1.5 km away"
                contact="Sarah M."
                available={true}
                onRequest={() => handleRequestResource("2")}
              />
              <ResourceCard
                title="Canned Food (Assorted)"
                category="Food"
                icon={<Utensils className="h-5 w-5" />}
                location="Bangalore North, 3.1 km away"
                contact="Michael P."
                available={true}
                onRequest={() => handleRequestResource("3")}
              />
              <ResourceCard
                title="Portable Generator"
                category="Power"
                icon={<Battery className="h-5 w-5" />}
                location="Chennai East, 0.8 km away"
                contact="Robert J."
                available={true}
                onRequest={() => handleRequestResource("4")}
              />
              <ResourceCard
                title="Temporary Shelter (3 spots)"
                category="Shelter"
                icon={<Home className="h-5 w-5" />}
                location="Kolkata South, 1.7 km away"
                contact="Lisa K."
                available={true}
                onRequest={() => handleRequestResource("5")}
              />
              <ResourceCard
                title="Baby Supplies"
                category="Essential"
                icon={<ShoppingBag className="h-5 w-5" />}
                location="Pune Central, 2.5 km away"
                contact="Emily R."
                available={true}
                onRequest={() => handleRequestResource("6")}
              />
            </div>
          </TabsContent>

          <TabsContent value="needed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Insulin Medication"
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                location="Delhi Downtown, 1.2 km away"
                contact="David L."
                available={false}
                urgent={true}
                onOfferHelp={() => handleOfferHelp("1")}
              />
              <ResourceCard
                title="Drinking Water"
                category="Water"
                icon={<Droplet className="h-5 w-5" />}
                location="Mumbai Westside, 0.5 km away"
                contact="Maria S."
                available={false}
                onOfferHelp={() => handleOfferHelp("2")}
              />
              <ResourceCard
                title="Batteries (AA/AAA)"
                category="Power"
                icon={<Battery className="h-5 w-5" />}
                location="Bangalore North, 2.1 km away"
                contact="Thomas B."
                available={false}
                onOfferHelp={() => handleOfferHelp("3")}
              />
              <ResourceCard
                title="Non-perishable Food"
                category="Food"
                icon={<Utensils className="h-5 w-5" />}
                location="Chennai East, 1.8 km away"
                contact="Anna W."
                available={false}
                onOfferHelp={() => handleOfferHelp("4")}
              />
            </div>
          </TabsContent>

          <TabsContent value="received" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requests You've Received</h3>
              {receivedRequests.map((request) => (
                <Card key={request.id} className={request.urgent ? "border-red-200 bg-red-50/50" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.resourceType}</CardTitle>
                        <CardDescription>From: {request.requesterName}</CardDescription>
                      </div>
                      {request.urgent && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{request.description}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Location: {request.location}</p>
                      <p>Contact: {request.requesterContact}</p>
                      <p>Requested: {request.timestamp}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Accept Request
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Contact Requester
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {receivedRequests.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No resource requests received yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="request">
            <ResourceRequestForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ResourceCardProps {
  title: string
  category: string
  icon: JSX.Element
  location: string
  contact: string
  available: boolean
  urgent?: boolean
  onRequest?: () => void
  onOfferHelp?: () => void
}

function ResourceCard({
  title,
  category,
  icon,
  location,
  contact,
  available,
  urgent,
  onRequest,
  onOfferHelp,
}: ResourceCardProps) {
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1.5 ${available ? "bg-green-100" : "bg-blue-100"}`}>{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {urgent && <Badge variant="destructive">Urgent</Badge>}
        </div>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Location:</span>
            <span>{location}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Contact:</span>
            <span>{contact}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={available ? "outline" : "default"}
          className="w-full"
          onClick={available ? onRequest : onOfferHelp}
        >
          {available ? t("button.requestThis") : t("button.offerHelp")}
        </Button>
      </CardFooter>
    </Card>
  )
}
