"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, AlertTriangle, Home, ShoppingBag, Route, Clock, Zap, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MapLocation {
  id: string
  name: string
  type: "emergency" | "resource" | "shelter" | "hospital" | "route" | "military" | "safe-zone"
  coordinates: [number, number]
  severity?: "low" | "medium" | "high" | "critical"
  description?: string
  available?: boolean
}

interface RouteStep {
  instruction: string
  distance: string
  duration: string
  type: "straight" | "turn-left" | "turn-right" | "roundabout"
  warning?: string
}

interface AlternateRoute {
  id: string
  name: string
  distance: string
  duration: string
  difficulty: "easy" | "moderate" | "difficult"
  safety: "safe" | "caution" | "dangerous"
  steps: RouteStep[]
}

export default function EnhancedEmergencyMap() {
  const { t } = useLanguage()
  const [locations, setLocations] = useState<MapLocation[]>([])
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [routes, setRoutes] = useState<AlternateRoute[]>([])
  const [selectedRoute, setSelectedRoute] = useState<AlternateRoute | null>(null)
  const [isLoadingRoute, setIsLoadingRoute] = useState(false)

  useEffect(() => {
    // Mock data for Indian emergency locations
    const mockLocations: MapLocation[] = [
      {
        id: "1",
        name: "Forest Fire - Uttarakhand Hills",
        type: "emergency",
        coordinates: [20, 30],
        severity: "critical",
        description: "Active forest fire spreading rapidly in hill areas",
      },
      {
        id: "2",
        name: "Emergency Shelter - Delhi",
        type: "shelter",
        coordinates: [60, 40],
        description: "Government shelter with 200 available spots",
      },
      {
        id: "3",
        name: "Medical Supplies - Mumbai",
        type: "resource",
        coordinates: [75, 60],
        available: true,
        description: "First aid kits and medical supplies available",
      },
      {
        id: "4",
        name: "AIIMS Hospital - Delhi",
        type: "hospital",
        coordinates: [50, 20],
        description: "All India Institute of Medical Sciences",
      },
      {
        id: "5",
        name: "Road Closure - NH1",
        type: "emergency",
        coordinates: [40, 50],
        severity: "medium",
        description: "National Highway 1 closed due to landslide",
      },
      {
        id: "6",
        name: "Army Base - Pathankot",
        type: "military",
        coordinates: [30, 25],
        description: "Indian Army emergency response unit",
      },
      {
        id: "7",
        name: "Safe Zone - Chandigarh",
        type: "safe-zone",
        coordinates: [45, 35],
        description: "Government designated safe zone",
      },
    ]
    setLocations(mockLocations)
  }, [])

  const findRoutes = async () => {
    if (!fromLocation || !toLocation) return

    setIsLoadingRoute(true)

    // Simulate route finding with multiple alternatives
    setTimeout(() => {
      const mockRoutes: AlternateRoute[] = [
        {
          id: "1",
          name: "Fastest Route (via NH1)",
          distance: "45.2 km",
          duration: "1h 15m",
          difficulty: "easy",
          safety: "caution",
          steps: [
            {
              instruction: `Head north from ${fromLocation} towards NH1`,
              distance: "2.1 km",
              duration: "5 minutes",
              type: "straight",
            },
            {
              instruction: "Turn right onto National Highway 1",
              distance: "35.8 km",
              duration: "45 minutes",
              type: "turn-right",
              warning: "Heavy traffic expected",
            },
            {
              instruction: "Take exit towards city center",
              distance: "5.2 km",
              duration: "15 minutes",
              type: "turn-left",
            },
            {
              instruction: `Arrive at ${toLocation}`,
              distance: "2.1 km",
              duration: "10 minutes",
              type: "straight",
            },
          ],
        },
        {
          id: "2",
          name: "Safest Route (via State Highway)",
          distance: "52.7 km",
          duration: "1h 35m",
          difficulty: "moderate",
          safety: "safe",
          steps: [
            {
              instruction: `Head east from ${fromLocation}`,
              distance: "3.5 km",
              duration: "8 minutes",
              type: "straight",
            },
            {
              instruction: "Turn left onto State Highway 15",
              distance: "42.1 km",
              duration: "1h 5m",
              type: "turn-left",
            },
            {
              instruction: "Continue through safe corridor",
              distance: "5.8 km",
              duration: "18 minutes",
              type: "straight",
            },
            {
              instruction: `Arrive at ${toLocation}`,
              distance: "1.3 km",
              duration: "4 minutes",
              type: "straight",
            },
          ],
        },
      ]
      setRoutes(mockRoutes)
      setSelectedRoute(mockRoutes[0])
      setIsLoadingRoute(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            India Emergency Response Map
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <div className="relative h-[500px] bg-gradient-to-br from-orange-100 via-white to-green-100 rounded-lg overflow-hidden border-2 border-orange-200">
            {/* Road network overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Major highways */}
              <path d="M 0 50% L 100% 50%" stroke="#666" strokeWidth="3" opacity="0.6" />
              <path d="M 50% 0 L 50% 100%" stroke="#666" strokeWidth="3" opacity="0.6" />
              <path d="M 0 25% L 100% 75%" stroke="#888" strokeWidth="2" opacity="0.4" />
              <path d="M 0 75% L 100% 25%" stroke="#888" strokeWidth="2" opacity="0.4" />

              {/* City connections */}
              <circle cx="20%" cy="30%" r="3" fill="#333" opacity="0.5" />
              <circle cx="60%" cy="40%" r="3" fill="#333" opacity="0.5" />
              <circle cx="75%" cy="60%" r="3" fill="#333" opacity="0.5" />
              <circle cx="50%" cy="20%" r="3" fill="#333" opacity="0.5" />

              {/* Road labels */}
              <text x="10%" y="52%" fontSize="10" fill="#666" className="font-mono">
                NH-1
              </text>
              <text x="52%" y="15%" fontSize="10" fill="#666" className="font-mono">
                NH-44
              </text>
            </svg>

            {/* Map markers */}
            {locations.map((location) => (
              <div
                key={location.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${location.coordinates[0]}%`,
                  top: `${location.coordinates[1]}%`,
                  zIndex: 10,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    location.type === "emergency"
                      ? location.severity === "critical"
                        ? "bg-red-600 animate-pulse"
                        : "bg-orange-500"
                      : location.type === "shelter"
                        ? "bg-green-500"
                        : location.type === "resource"
                          ? "bg-blue-500"
                          : location.type === "military"
                            ? "bg-green-800"
                            : location.type === "safe-zone"
                              ? "bg-green-400"
                              : "bg-purple-500"
                  } ${selectedLocation?.id === location.id ? "ring-4 ring-white scale-110" : ""} text-white transition-all duration-200`}
                >
                  {location.type === "emergency" && <AlertTriangle className="h-4 w-4" />}
                  {location.type === "shelter" && <Home className="h-4 w-4" />}
                  {location.type === "resource" && <ShoppingBag className="h-4 w-4" />}
                  {location.type === "hospital" && <MapPin className="h-4 w-4" />}
                  {location.type === "military" && <Shield className="h-4 w-4" />}
                  {location.type === "safe-zone" && <Zap className="h-4 w-4" />}
                </div>
                <div className="mt-1 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap max-w-32 truncate">
                  {location.name}
                </div>
              </div>
            ))}

            {/* Route visualization */}
            {selectedRoute && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <path
                  d="M 20% 80% Q 40% 60% 60% 40% T 80% 20%"
                  stroke={
                    selectedRoute.safety === "safe"
                      ? "#10b981"
                      : selectedRoute.safety === "caution"
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
                {/* Route direction arrows */}
                <polygon
                  points="35,65 40,60 35,55"
                  fill={
                    selectedRoute.safety === "safe"
                      ? "#10b981"
                      : selectedRoute.safety === "caution"
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                />
                <polygon
                  points="55,45 60,40 55,35"
                  fill={
                    selectedRoute.safety === "safe"
                      ? "#10b981"
                      : selectedRoute.safety === "caution"
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                />
              </svg>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md" style={{ zIndex: 20 }}>
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
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
                  <div className="w-3 h-3 bg-green-800 rounded-full"></div>
                  <span>Military/Security</span>
                </div>
              </div>
            </div>

            {/* India watermark */}
            <div
              className="absolute top-4 right-4 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium text-orange-800"
              style={{ zIndex: 20 }}
            >
              🇮🇳 India Emergency Response
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Route Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Emergency Route Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From (City/Area)</label>
              <Input
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="e.g., Delhi, Mumbai, Bangalore"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">To (Destination)</label>
              <Input
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="e.g., Safe zone, Hospital, Shelter"
              />
            </div>
            <Button onClick={findRoutes} className="w-full" disabled={!fromLocation || !toLocation || isLoadingRoute}>
              {isLoadingRoute ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Finding Safe Routes...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  {t("button.findRoutes")}
                </>
              )}
            </Button>

            {routes.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Available Routes:</h4>
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRoute?.id === route.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                    } ${
                      route.safety === "safe"
                        ? "border-green-500 bg-green-50"
                        : route.safety === "caution"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-red-500 bg-red-50"
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-sm">{route.name}</h5>
                      <div className="flex gap-1">
                        <Badge
                          className={
                            route.difficulty === "easy"
                              ? "bg-green-500"
                              : route.difficulty === "moderate"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {route.difficulty}
                        </Badge>
                        <Badge
                          className={
                            route.safety === "safe"
                              ? "bg-green-600"
                              : route.safety === "caution"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }
                        >
                          {route.safety}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{route.distance}</span>
                      <span>{route.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Route Instructions */}
        {selectedRoute && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Turn-by-Turn Directions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">{selectedRoute.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {selectedRoute.distance} • {selectedRoute.duration}
                  </div>
                </div>
                {selectedRoute.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.instruction}</p>
                      {step.warning && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="h-3 w-3 text-orange-500" />
                          <span className="text-xs text-orange-600">{step.warning}</span>
                        </div>
                      )}
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
      </div>
    </div>
  )
}
