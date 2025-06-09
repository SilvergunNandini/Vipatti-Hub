"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, AlertTriangle, Home, ShoppingBag, Route, Clock } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "emergency" | "resource" | "shelter" | "hospital" | "route"
  coordinates: [number, number]
  severity?: "low" | "medium" | "high" | "critical"
  description?: string
  available?: boolean
}

interface RouteStep {
  instruction: string
  distance: string
  duration: string
}

export default function InteractiveMap() {
  const [locations, setLocations] = useState<MapLocation[]>([])
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [route, setRoute] = useState<RouteStep[]>([])
  const [isLoadingRoute, setIsLoadingRoute] = useState(false)

  useEffect(() => {
    // Mock data for demonstration
    const mockLocations: MapLocation[] = [
      {
        id: "1",
        name: "Wildfire - North County",
        type: "emergency",
        coordinates: [20, 30],
        severity: "critical",
        description: "Active wildfire spreading rapidly",
      },
      {
        id: "2",
        name: "Emergency Shelter",
        type: "shelter",
        coordinates: [60, 40],
        description: "Safe shelter with 50 available spots",
      },
      {
        id: "3",
        name: "Medical Supplies",
        type: "resource",
        coordinates: [75, 60],
        available: true,
        description: "First aid kits and medical supplies available",
      },
      {
        id: "4",
        name: "General Hospital",
        type: "hospital",
        coordinates: [50, 20],
        description: "Full service hospital with emergency room",
      },
      {
        id: "5",
        name: "Road Closure - Highway 101",
        type: "emergency",
        coordinates: [40, 50],
        severity: "medium",
        description: "Highway closed due to accident",
      },
    ]
    setLocations(mockLocations)
  }, [])

  const getLocationIcon = (type: string, severity?: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className={`h-4 w-4 ${severity === "critical" ? "text-red-600" : "text-orange-500"}`} />
      case "shelter":
        return <Home className="h-4 w-4 text-green-600" />
      case "resource":
        return <ShoppingBag className="h-4 w-4 text-blue-600" />
      case "hospital":
        return <MapPin className="h-4 w-4 text-purple-600" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const findRoute = async () => {
    if (!fromLocation || !toLocation) return

    setIsLoadingRoute(true)

    // Mock route finding - in real app, this would call a routing API
    setTimeout(() => {
      const mockRoute: RouteStep[] = [
        {
          instruction: `Head north on Main Street from ${fromLocation}`,
          distance: "0.5 miles",
          duration: "2 minutes",
        },
        {
          instruction: "Turn right onto Emergency Route 1 (avoiding blocked Highway 101)",
          distance: "2.3 miles",
          duration: "8 minutes",
        },
        {
          instruction: "Continue straight through downtown area",
          distance: "1.2 miles",
          duration: "5 minutes",
        },
        {
          instruction: `Arrive at ${toLocation}`,
          distance: "0.1 miles",
          duration: "1 minute",
        },
      ]
      setRoute(mockRoute)
      setIsLoadingRoute(false)
    }, 2000)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <Card className="h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Emergency Response Map
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <div className="relative h-[500px] bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
            {/* Map markers */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${location.coordinates[0]}%`,
                  top: `${location.coordinates[1]}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    location.type === "emergency"
                      ? getSeverityColor(location.severity)
                      : location.type === "shelter"
                        ? "bg-green-500"
                        : location.type === "resource"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                  } ${selectedLocation?.id === location.id ? "ring-4 ring-white" : ""}`}
                >
                  {getLocationIcon(location.type, location.severity)}
                </div>
                <div className="mt-1 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap">
                  {location.name}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Critical Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Emergency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Safe Zone/Shelter</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Medical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {/* Route Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Route Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Input
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="Enter starting location"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Input
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="Enter destination"
              />
            </div>
            <Button onClick={findRoute} className="w-full" disabled={!fromLocation || !toLocation || isLoadingRoute}>
              {isLoadingRoute ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Finding Route...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  Find Safe Route
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Route Instructions */}
        {route.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Route Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {route.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.instruction}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>{step.distance}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Location Details */}
        {selectedLocation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getLocationIcon(selectedLocation.type, selectedLocation.severity)}
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-medium">{selectedLocation.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>
              </div>
              {selectedLocation.severity && (
                <Badge className={`${getSeverityColor(selectedLocation.severity)} text-white`}>
                  {selectedLocation.severity.toUpperCase()}
                </Badge>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Get Directions
                </Button>
                <Button size="sm" className="flex-1">
                  More Info
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
