"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Clock, ExternalLink, Volume2 } from "lucide-react"

interface NewsAlert {
  id: string
  title: string
  content: string
  source: string
  timestamp: Date
  severity: "info" | "warning" | "critical"
  category: string
  url?: string
}

export default function NewsAlerts() {
  const [alerts, setAlerts] = useState<NewsAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock news alerts - in real app, this would fetch from news APIs
    const mockAlerts: NewsAlert[] = [
      {
        id: "1",
        title: "Emergency Services Respond to Wildfire in North County",
        content:
          "Fire departments from multiple counties are working to contain a rapidly spreading wildfire. Evacuation orders have been issued for residents in affected areas.",
        source: "Emergency Services",
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        severity: "critical",
        category: "Fire Emergency",
        url: "#",
      },
      {
        id: "2",
        title: "Alternative Routes Available During Highway 101 Closure",
        content:
          "Transportation authorities have opened emergency routes to bypass the closed section of Highway 101. Drivers are advised to use Route 1 and local roads.",
        source: "Transportation Dept",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        severity: "warning",
        category: "Transportation",
        url: "#",
      },
      {
        id: "3",
        title: "Emergency Shelters Open for Displaced Residents",
        content:
          "The Red Cross has opened emergency shelters at Central High School and Community Center. Food, water, and basic supplies are available.",
        source: "Red Cross",
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        severity: "info",
        category: "Shelter",
        url: "#",
      },
      {
        id: "4",
        title: "Medical Supplies Distribution Points Established",
        content:
          "Emergency medical supplies are being distributed at three locations throughout the city. Priority given to elderly and those with chronic conditions.",
        source: "Health Department",
        timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        severity: "info",
        category: "Medical",
        url: "#",
      },
      {
        id: "5",
        title: "Weather Alert: Strong Winds Expected to Continue",
        content:
          "National Weather Service warns of continued strong winds through tonight, which may hamper firefighting efforts and cause additional power outages.",
        source: "Weather Service",
        timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
        severity: "warning",
        category: "Weather",
        url: "#",
      },
    ]

    setTimeout(() => {
      setAlerts(mockAlerts)
      setLoading(false)
    }, 1000)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-yellow-500 text-black"
      case "info":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "info":
        return <Volume2 className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Emergency News & Alerts
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Emergency News & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {getSeverityIcon(alert.severity)}
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{alert.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(alert.timestamp)}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-sm mb-1">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">{alert.content}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Source: {alert.source}</span>
                  {alert.url && (
                    <Button variant="ghost" size="sm" className="h-auto p-1">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
