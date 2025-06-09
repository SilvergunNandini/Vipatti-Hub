"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, Radio, MapPin, Package, Clock, Zap } from "lucide-react"

interface SafeZone {
  id: string
  name: string
  location: string
  capacity: number
  currentOccupancy: number
  facilities: string[]
  securityLevel: "high" | "medium" | "low"
  status: "operational" | "full" | "evacuating"
}

interface CommunicationChannel {
  id: string
  name: string
  frequency: string
  type: "radio" | "satellite" | "emergency"
  status: "active" | "backup" | "offline"
  coverage: string
}

interface SupplyDrop {
  id: string
  location: string
  scheduledTime: string
  supplies: string[]
  method: "airdrop" | "ground" | "naval"
  status: "scheduled" | "in-progress" | "completed"
}

export default function WarSpecificFeatures() {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([])
  const [commChannels, setCommChannels] = useState<CommunicationChannel[]>([])
  const [supplyDrops, setSupplyDrops] = useState<SupplyDrop[]>([])

  useEffect(() => {
    // Mock data for war-specific features
    setSafeZones([
      {
        id: "1",
        name: "Central Government Bunker",
        location: "Delhi - Sector 7",
        capacity: 5000,
        currentOccupancy: 2300,
        facilities: ["Medical", "Food", "Communication", "Security"],
        securityLevel: "high",
        status: "operational",
      },
      {
        id: "2",
        name: "Army Base Safe Zone",
        location: "Pathankot Cantonment",
        capacity: 3000,
        currentOccupancy: 2950,
        facilities: ["Medical", "Food", "Security"],
        securityLevel: "high",
        status: "full",
      },
      {
        id: "3",
        name: "Underground Shelter",
        location: "Mumbai - Bandra",
        capacity: 2000,
        currentOccupancy: 800,
        facilities: ["Basic Medical", "Food", "Water"],
        securityLevel: "medium",
        status: "operational",
      },
    ])

    setCommChannels([
      {
        id: "1",
        name: "Emergency Broadcast System",
        frequency: "103.5 FM",
        type: "radio",
        status: "active",
        coverage: "National",
      },
      {
        id: "2",
        name: "Military Communication",
        frequency: "Encrypted",
        type: "satellite",
        status: "active",
        coverage: "All India",
      },
      {
        id: "3",
        name: "Civilian Emergency Network",
        frequency: "145.500 MHz",
        type: "radio",
        status: "active",
        coverage: "Regional",
      },
    ])

    setSupplyDrops([
      {
        id: "1",
        location: "Kashmir Valley - Grid 34S",
        scheduledTime: "Today 6:00 PM",
        supplies: ["Medical Supplies", "Food Rations", "Water", "Blankets"],
        method: "airdrop",
        status: "scheduled",
      },
      {
        id: "2",
        location: "Border Areas - Rajasthan",
        scheduledTime: "Tomorrow 8:00 AM",
        supplies: ["Fuel", "Communication Equipment", "Medical Kits"],
        method: "ground",
        status: "scheduled",
      },
    ])
  }, [])

  const getSecurityBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge className="bg-green-600">High Security</Badge>
      case "medium":
        return <Badge className="bg-yellow-600">Medium Security</Badge>
      case "low":
        return <Badge className="bg-red-600">Low Security</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500">Operational</Badge>
      case "full":
        return <Badge className="bg-red-500">Full</Badge>
      case "evacuating":
        return <Badge className="bg-orange-500">Evacuating</Badge>
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "backup":
        return <Badge className="bg-yellow-500">Backup</Badge>
      case "offline":
        return <Badge className="bg-red-500">Offline</Badge>
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-red-800">युद्ध आपातकाल प्रबंधन</h2>
        </div>
        <h3 className="text-xl font-semibold text-red-700 mb-2">War Emergency Management System</h3>
        <p className="text-red-600">
          Critical infrastructure and resources for conflict situations. Stay informed and stay safe.
        </p>
      </div>

      <Tabs defaultValue="safe-zones" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="safe-zones">Safe Zones</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="supply-drops">Supply Drops</TabsTrigger>
        </TabsList>

        <TabsContent value="safe-zones" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Secure Safe Zones</h3>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Find Nearest Zone
            </Button>
          </div>

          {safeZones.map((zone) => (
            <Card key={zone.id} className={zone.status === "full" ? "border-red-200 bg-red-50/50" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {zone.location}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {getSecurityBadge(zone.securityLevel)}
                    {getStatusBadge(zone.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Capacity Status:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            zone.currentOccupancy / zone.capacity > 0.9
                              ? "bg-red-500"
                              : zone.currentOccupancy / zone.capacity > 0.7
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${(zone.currentOccupancy / zone.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {zone.currentOccupancy}/{zone.capacity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Available Facilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {zone.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" disabled={zone.status === "full"}>
                    <MapPin className="mr-1 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button size="sm" className="flex-1" disabled={zone.status === "full"}>
                    Request Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Emergency Communication Channels</h3>
            <Button variant="outline">
              <Radio className="mr-2 h-4 w-4" />
              Test Signal
            </Button>
          </div>

          {commChannels.map((channel) => (
            <Card key={channel.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Radio className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                      <CardDescription>Frequency: {channel.frequency}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{channel.type.toUpperCase()}</Badge>
                    {getStatusBadge(channel.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Coverage: {channel.coverage}</div>
                  <Button size="sm">
                    <Radio className="mr-1 h-4 w-4" />
                    Tune In
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Zap className="h-5 w-5" />
                Emergency Broadcast Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <ul className="space-y-2 text-sm">
                <li>• Keep radio tuned to 103.5 FM for official updates</li>
                <li>• Use 145.500 MHz for civilian emergency communication</li>
                <li>• Conserve battery power - listen at scheduled times</li>
                <li>• Report critical information to authorities</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply-drops" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Scheduled Supply Drops</h3>
            <Button variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Request Supplies
            </Button>
          </div>

          {supplyDrops.map((drop) => (
            <Card key={drop.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-green-600" />
                    <div>
                      <CardTitle className="text-lg">Supply Drop - {drop.location}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4" />
                        {drop.scheduledTime}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{drop.method.toUpperCase()}</Badge>
                    {getStatusBadge(drop.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Supply Contents:</p>
                  <div className="flex flex-wrap gap-2">
                    {drop.supplies.map((supply, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {supply}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="mr-1 h-4 w-4" />
                    View Drop Zone
                  </Button>
                  <Button size="sm" className="flex-1">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Supply Drop Safety Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <ul className="space-y-2 text-sm">
                <li>• Stay clear of drop zones during supply operations</li>
                <li>• Wait for all-clear signal before approaching supplies</li>
                <li>• Distribute supplies fairly among community members</li>
                <li>• Report any damaged or suspicious packages immediately</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
