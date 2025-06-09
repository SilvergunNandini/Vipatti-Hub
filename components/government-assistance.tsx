"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Plane, Clock, MapPin, Users, Package, Star } from "lucide-react"

interface GovernmentAssistance {
  id: string
  type: "army" | "airforce" | "navy" | "medical" | "supplies" | "ndrf"
  unit: string
  mission: string
  location: string
  arrivalTime: string
  estimatedDuration: string
  capacity: string
  status: "scheduled" | "en-route" | "arrived" | "completed"
  priority: "high" | "medium" | "low"
  resources: string[]
}

export default function GovernmentAssistance() {
  const [assistance, setAssistance] = useState<GovernmentAssistance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock Indian government assistance data
    const mockAssistance: GovernmentAssistance[] = [
      {
        id: "1",
        type: "army",
        unit: "Indian Army - 15 Corps",
        mission: "Evacuation Support & Security Operations",
        location: "Kashmir Valley",
        arrivalTime: "Today 2:00 PM",
        estimatedDuration: "8 hours",
        capacity: "1000 people",
        status: "en-route",
        priority: "high",
        resources: ["Medical Support", "Transportation", "Security", "Communication"],
      },
      {
        id: "2",
        type: "airforce",
        unit: "Indian Air Force - 143 Squadron",
        mission: "Medical Evacuation & Supply Drop",
        location: "Uttarakhand Hills",
        arrivalTime: "Today 4:00 PM",
        estimatedDuration: "6 hours",
        capacity: "100 critical patients",
        status: "scheduled",
        priority: "high",
        resources: ["Mi-17 Helicopters", "Emergency Medicine", "Rescue Teams"],
      },
      {
        id: "3",
        type: "ndrf",
        unit: "NDRF - 8th Battalion",
        mission: "Flood Rescue Operations",
        location: "Kerala Backwaters",
        arrivalTime: "Today 1:30 PM",
        estimatedDuration: "12 hours",
        capacity: "500 people",
        status: "arrived",
        priority: "high",
        resources: ["Rescue Boats", "Diving Teams", "Medical Aid", "Communication"],
      },
      {
        id: "4",
        type: "supplies",
        unit: "District Administration",
        mission: "Food & Water Distribution",
        location: "Community Centers - Mumbai",
        arrivalTime: "Today 12:00 PM",
        estimatedDuration: "10 hours",
        capacity: "5000 people",
        status: "arrived",
        priority: "medium",
        resources: ["Food Packets", "Water Bottles", "Medical Kits", "Blankets"],
      },
      {
        id: "5",
        type: "medical",
        unit: "AIIMS Emergency Response",
        mission: "Mobile Medical Units",
        location: "Delhi NCR",
        arrivalTime: "Tomorrow 7:00 AM",
        estimatedDuration: "24 hours",
        capacity: "300 patients",
        status: "scheduled",
        priority: "high",
        resources: ["Doctors", "Nurses", "Ambulances", "ICU Equipment"],
      },
      {
        id: "6",
        type: "navy",
        unit: "Indian Navy - Western Command",
        mission: "Coastal Evacuation",
        location: "Gujarat Coast",
        arrivalTime: "Tomorrow 5:00 AM",
        estimatedDuration: "16 hours",
        capacity: "2000 people",
        status: "scheduled",
        priority: "medium",
        resources: ["Naval Ships", "Rescue Boats", "Medical Teams", "Supplies"],
      },
    ]

    setTimeout(() => {
      setAssistance(mockAssistance)
      setLoading(false)
    }, 1000)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "army":
        return <Shield className="h-5 w-5 text-green-600" />
      case "airforce":
        return <Plane className="h-5 w-5 text-blue-600" />
      case "navy":
        return <Shield className="h-5 w-5 text-blue-800" />
      case "ndrf":
        return <Star className="h-5 w-5 text-orange-600" />
      case "medical":
        return <Users className="h-5 w-5 text-red-600" />
      case "supplies":
        return <Package className="h-5 w-5 text-purple-600" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Scheduled
          </Badge>
        )
      case "en-route":
        return <Badge className="bg-yellow-500">En Route</Badge>
      case "arrived":
        return <Badge className="bg-green-500">Arrived</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Medium Priority
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
  }

  const activeAssistance = assistance.filter((item) => item.status !== "completed")
  const completedAssistance = assistance.filter((item) => item.status === "completed")

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Indian Government Assistance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-green-50 to-orange-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-3xl">🇮🇳</span>
          <h2 className="text-2xl font-bold text-green-800">भारत सरकार आपातकालीन सहायता</h2>
        </div>
        <h3 className="text-xl font-semibold text-green-700 mb-2">Indian Government Emergency Response</h3>
        <p className="text-green-600">
          Indian Armed Forces, NDRF, and emergency services are actively responding to the crisis. सहायता आ रही है।
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Operations ({activeAssistance.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAssistance.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeAssistance.map((item) => (
            <AssistanceCard key={item.id} assistance={item} />
          ))}
          {activeAssistance.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active government assistance operations at this time.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAssistance.map((item) => (
            <AssistanceCard key={item.id} assistance={item} />
          ))}
          {completedAssistance.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No completed operations to display.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )

  function AssistanceCard({ assistance }: { assistance: GovernmentAssistance }) {
    return (
      <Card className={assistance.priority === "high" ? "border-red-200 bg-red-50/50" : ""}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {getTypeIcon(assistance.type)}
              <div>
                <CardTitle className="text-lg">{assistance.unit}</CardTitle>
                <CardDescription>{assistance.mission}</CardDescription>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {getPriorityBadge(assistance.priority)}
              {getStatusBadge(assistance.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{assistance.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Arrival:</span>
                <span className="font-medium text-green-600">{assistance.arrivalTime}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Capacity:</span>
                <span>{assistance.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Duration:</span>
                <span>{assistance.estimatedDuration}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Available Resources:</h4>
            <div className="flex flex-wrap gap-2">
              {assistance.resources.map((resource, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {resource}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MapPin className="mr-1 h-4 w-4" />
              View Location
            </Button>
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
              Get Updates
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }
}
