"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation, MapPin, Clock, AlertTriangle, Route } from "lucide-react"

interface RouteStep {
  instruction: string
  distance: string
  duration: string
  type: "straight" | "turn-left" | "turn-right" | "roundabout"
}

interface RouteInfo {
  totalDistance: string
  totalDuration: string
  steps: RouteStep[]
  warnings: string[]
}

export default function RoutePlanner() {
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [route, setRoute] = useState<RouteInfo | null>(null)
  const [isLoadingRoute, setIsLoadingRoute] = useState(false)

  const findRoute = async () => {
    if (!fromLocation || !toLocation) return

    setIsLoadingRoute(true)

    // Simulate route finding with realistic data
    setTimeout(() => {
      const mockRoute: RouteInfo = {
        totalDistance: "12.4 miles",
        totalDuration: "28 minutes",
        warnings: ["Road closure on Highway 101", "Heavy traffic on Main Street"],
        steps: [
          {
            instruction: `Head north on Main Street from ${fromLocation}`,
            distance: "0.5 miles",
            duration: "2 minutes",
            type: "straight",
          },
          {
            instruction: "Turn right onto Emergency Route 1 (avoiding blocked Highway 101)",
            distance: "2.3 miles",
            duration: "8 minutes",
            type: "turn-right",
          },
          {
            instruction: "Continue straight through downtown area",
            distance: "1.2 miles",
            duration: "5 minutes",
            type: "straight",
          },
          {
            instruction: "Turn left onto Safe Haven Boulevard",
            distance: "3.1 miles",
            duration: "7 minutes",
            type: "turn-left",
          },
          {
            instruction: "Take the roundabout, 2nd exit",
            distance: "0.8 miles",
            duration: "3 minutes",
            type: "roundabout",
          },
          {
            instruction: "Continue on Relief Road",
            distance: "4.2 miles",
            duration: "12 minutes",
            type: "straight",
          },
          {
            instruction: `Arrive at ${toLocation}`,
            distance: "0.3 miles",
            duration: "1 minute",
            type: "straight",
          },
        ],
      }
      setRoute(mockRoute)
      setIsLoadingRoute(false)
    }, 2000)
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case "turn-left":
        return "↰"
      case "turn-right":
        return "↱"
      case "roundabout":
        return "⭕"
      default:
        return "↑"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5" />
            Emergency Route Planner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>
          <Button onClick={findRoute} className="w-full" disabled={!fromLocation || !toLocation || isLoadingRoute}>
            {isLoadingRoute ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Finding Safe Route...
              </>
            ) : (
              <>
                <Navigation className="mr-2 h-4 w-4" />
                Find Emergency Route
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {route && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Route Details
              </span>
              <div className="flex gap-2 text-sm">
                <Badge variant="outline">{route.totalDistance}</Badge>
                <Badge variant="outline">{route.totalDuration}</Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {route.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-orange-600 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Route Warnings
                </h4>
                {route.warnings.map((warning, index) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 rounded-md p-2 text-sm">
                    {warning}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-medium">Turn-by-Turn Directions</h4>
              {route.steps.map((step, index) => (
                <div key={index} className="flex gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-lg flex items-center justify-center font-medium">
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.instruction}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {step.distance}
                      </span>
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
    </div>
  )
}
