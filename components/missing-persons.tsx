"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, Package, Phone, MapPin, Clock, Plus } from "lucide-react"

interface MissingItem {
  id: string
  type: "person" | "item"
  name: string
  description: string
  lastSeen: string
  location: string
  contact: string
  imageUrl?: string
  status: "missing" | "found"
  reportedAt: Date
  urgent: boolean
}

export default function MissingPersons() {
  const [missingItems, setMissingItems] = useState<MissingItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showReportForm, setShowReportForm] = useState(false)

  useEffect(() => {
    // Mock data for missing persons and items
    const mockData: MissingItem[] = [
      {
        id: "1",
        type: "person",
        name: "Sarah Johnson",
        description: "5'6\", brown hair, wearing blue jacket and jeans. Last seen near Central Park.",
        lastSeen: "2 hours ago",
        location: "Central Park area",
        contact: "555-0123",
        status: "missing",
        reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        urgent: true,
      },
      {
        id: "2",
        type: "person",
        name: "Michael Chen",
        description: "Elderly man, 72 years old, gray hair, walking with a cane. May be confused.",
        lastSeen: "4 hours ago",
        location: "Downtown area",
        contact: "555-0456",
        status: "missing",
        reportedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        urgent: true,
      },
      {
        id: "3",
        type: "item",
        name: "Medical Bag",
        description: "Red medical emergency bag containing insulin and heart medication. Critically needed.",
        lastSeen: "1 hour ago",
        location: "Emergency shelter",
        contact: "555-0789",
        status: "missing",
        reportedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        urgent: true,
      },
      {
        id: "4",
        type: "person",
        name: "Emma Rodriguez",
        description: "8 years old, black hair in pigtails, wearing pink dress. Separated during evacuation.",
        lastSeen: "30 minutes ago",
        location: "Evacuation route near Highway 101",
        contact: "555-0321",
        status: "missing",
        reportedAt: new Date(Date.now() - 30 * 60 * 1000),
        urgent: true,
      },
      {
        id: "5",
        type: "item",
        name: "Emergency Radio",
        description: "Battery-powered emergency radio, black with antenna. Contains important family contacts.",
        lastSeen: "3 hours ago",
        location: "Community center",
        contact: "555-0654",
        status: "missing",
        reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        urgent: false,
      },
    ]
    setMissingItems(mockData)
  }, [])

  const filteredItems = missingItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const missingPersons = filteredItems.filter((item) => item.type === "person")
  const missingObjects = filteredItems.filter((item) => item.type === "item")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Missing Persons & Items</h2>
          <p className="text-muted-foreground">Help reunite families and recover important items</p>
        </div>
        <Button onClick={() => setShowReportForm(!showReportForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Report Missing
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search missing persons or items..."
          className="pl-8"
        />
      </div>

      {showReportForm && <ReportMissingForm onClose={() => setShowReportForm(false)} />}

      <Tabs defaultValue="persons" className="w-full">
        <TabsList>
          <TabsTrigger value="persons" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Missing Persons ({missingPersons.length})
          </TabsTrigger>
          <TabsTrigger value="items" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Missing Items ({missingObjects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="persons" className="space-y-4">
          {missingPersons.map((person) => (
            <MissingItemCard key={person.id} item={person} />
          ))}
          {missingPersons.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No missing persons reported matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          {missingObjects.map((item) => (
            <MissingItemCard key={item.id} item={item} />
          ))}
          {missingObjects.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No missing items reported matching your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MissingItemCard({ item }: { item: MissingItem }) {
  return (
    <Card className={item.urgent ? "border-red-200 bg-red-50/50" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${item.type === "person" ? "bg-blue-100" : "bg-green-100"}`}>
              {item.type === "person" ? (
                <User className="h-5 w-5 text-blue-600" />
              ) : (
                <Package className="h-5 w-5 text-green-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.lastSeen}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            {item.urgent && <Badge variant="destructive">Urgent</Badge>}
            <Badge variant={item.status === "missing" ? "outline" : "default"}>
              {item.status === "missing" ? "Missing" : "Found"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>Contact: {item.contact}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Share Info
            </Button>
            <Button size="sm">
              <Phone className="mr-1 h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportMissingForm({ onClose }: { onClose: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Missing Person or Item</CardTitle>
        <CardDescription>Provide details to help others identify and locate missing persons or items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select className="w-full p-2 border rounded-md">
              <option value="person">Missing Person</option>
              <option value="item">Missing Item</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Name of person or item" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea placeholder="Detailed description including appearance, clothing, distinctive features..." />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Seen Location</label>
            <Input placeholder="Where was this person/item last seen?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Information</label>
            <Input placeholder="Your phone number or email" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="urgent" />
          <label htmlFor="urgent" className="text-sm font-medium">
            Mark as urgent (medical emergency, child, elderly, etc.)
          </label>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">Submit Report</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
