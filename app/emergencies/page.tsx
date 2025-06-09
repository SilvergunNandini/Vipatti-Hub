"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { AlertTriangle, MapPin, Clock, Info, AlertCircle, Filter, Search } from "lucide-react"
import EnhancedEmergencyMap from "@/components/enhanced-emergency-map"
import Header from "@/components/header"
import { useLanguage } from "@/lib/language-context"
import { useToast } from "@/hooks/use-toast"

interface Emergency {
  id: string
  title: string
  description: string
  location: string
  time: string
  severity: "critical" | "warning" | "caution" | "resolved"
  type: string
  updates: number
}

export default function EmergenciesPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [emergencies, setEmergencies] = useState<Emergency[]>([])
  const [filteredEmergencies, setFilteredEmergencies] = useState<Emergency[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showingMore, setShowingMore] = useState(false)
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null)

  useEffect(() => {
    // Mock Indian emergency data
    const mockEmergencies: Emergency[] = [
      {
        id: "1",
        title: "Forest Fire in Uttarakhand Hills",
        description:
          "Active forest fire spreading rapidly in hill areas. Evacuation orders in place for nearby villages.",
        location: "Uttarakhand Hills, Dehradun District",
        time: "15 minutes ago",
        severity: "critical",
        type: "natural",
        updates: 12,
      },
      {
        id: "2",
        title: "Flash Flood Warning - Kerala",
        description: "Heavy monsoon rainfall causing flash flooding in low-lying areas. Avoid riverside areas.",
        location: "Kerala Backwaters, Alappuzha District",
        time: "45 minutes ago",
        severity: "warning",
        type: "natural",
        updates: 8,
      },
      {
        id: "3",
        title: "Major Road Closure - NH1",
        description: "National Highway 1 closed due to landslide. Expected to remain closed for several hours.",
        location: "NH-1, Jammu & Kashmir, Mile 145",
        time: "1 hour ago",
        severity: "caution",
        type: "infrastructure",
        updates: 5,
      },
      {
        id: "4",
        title: "Power Outage - Mumbai",
        description:
          "Widespread power outage affecting multiple districts. Utility companies working to restore power.",
        location: "Mumbai, Maharashtra - Multiple Districts",
        time: "2 hours ago",
        severity: "caution",
        type: "infrastructure",
        updates: 7,
      },
      {
        id: "5",
        title: "Medical Emergency Response - Delhi",
        description: "Multiple ambulances dispatched to Central Delhi area. Please clear roads for emergency vehicles.",
        location: "Central Delhi, Connaught Place Area",
        time: "3 hours ago",
        severity: "warning",
        type: "medical",
        updates: 3,
      },
      {
        id: "6",
        title: "Cyclone Warning - Odisha Coast",
        description: "Cyclone approaching Odisha coast. Coastal areas advised to evacuate immediately.",
        location: "Odisha Coast, Puri District",
        time: "4 hours ago",
        severity: "critical",
        type: "natural",
        updates: 15,
      },
    ]

    setTimeout(() => {
      setEmergencies(mockEmergencies)
      setFilteredEmergencies(mockEmergencies.slice(0, 4))
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = emergencies

    if (searchTerm) {
      filtered = filtered.filter(
        (emergency) =>
          emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emergency.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emergency.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((emergency) => emergency.type === selectedType)
    }

    setFilteredEmergencies(showingMore ? filtered : filtered.slice(0, 4))

    if (searchTerm && filtered.length === 0) {
      toast({
        title: "No Results",
        description: t("message.noEmergencies"),
        variant: "destructive",
      })
    }
  }, [searchTerm, selectedType, emergencies, showingMore, t, toast])

  const handleNearMe = () => {
    // Simulate location-based filtering
    const nearbyEmergencies = emergencies.filter(
      (emergency) => emergency.location.includes("Delhi") || emergency.location.includes("Mumbai"),
    )
    setFilteredEmergencies(nearbyEmergencies)
    toast({
      title: "Location Filter Applied",
      description: "Showing emergencies near your location",
    })
  }

  const handleLoadMore = () => {
    setShowingMore(true)
    setFilteredEmergencies(emergencies)
  }

  const handleViewOnMap = (emergency: Emergency) => {
    setSelectedEmergency(emergency)
    // Scroll to map section
    document.getElementById("emergency-map")?.scrollIntoView({ behavior: "smooth" })
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" /> Critical
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 gap-1">
            <AlertCircle className="h-3 w-3" /> Warning
          </Badge>
        )
      case "caution":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 gap-1">
            <Info className="h-3 w-3" /> Caution
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">{t("header.emergencies")}</h1>
          <p className="text-muted-foreground">
            Stay informed about current emergencies and critical situations across India
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emergencies by location, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter by Type</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="natural">Natural Disaster</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleNearMe}>
              <MapPin className="mr-2 h-4 w-4" />
              Near Me
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {filteredEmergencies.map((emergency) => (
                    <EmergencyCard
                      key={emergency.id}
                      emergency={emergency}
                      onViewOnMap={() => handleViewOnMap(emergency)}
                      getSeverityBadge={getSeverityBadge}
                    />
                  ))}
                </div>

                {!showingMore && filteredEmergencies.length >= 4 && (
                  <div className="mt-8 text-center">
                    <Button variant="outline" onClick={handleLoadMore}>
                      {t("button.loadMore")} Emergencies
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="map">
            <Card id="emergency-map">
              <CardHeader>
                <CardTitle>Emergency Map</CardTitle>
                <CardDescription>
                  View all active emergencies on the map. Click on markers for details.
                  {selectedEmergency && (
                    <span className="block mt-2 text-blue-600 font-medium">Showing: {selectedEmergency.title}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <EnhancedEmergencyMap />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface EmergencyCardProps {
  emergency: Emergency
  onViewOnMap: () => void
  getSeverityBadge: (severity: string) => JSX.Element
}

function EmergencyCard({ emergency, onViewOnMap, getSeverityBadge }: EmergencyCardProps) {
  const { t } = useLanguage()

  return (
    <Card className={emergency.severity === "critical" ? "border-red-300 bg-red-50/50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{emergency.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {emergency.location}
            </CardDescription>
          </div>
          {getSeverityBadge(emergency.severity)}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{emergency.description}</p>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Reported {emergency.time}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">{emergency.updates} updates</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewOnMap}>
            <MapPin className="mr-1 h-4 w-4" />
            View on Map
          </Button>
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
