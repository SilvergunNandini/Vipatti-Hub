"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

type Alert = {
  id: number
  type: "critical" | "warning" | "info"
  title: string
  location: string
  time: string
}

export default function EmergencyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching alerts from an API
    const mockAlerts: Alert[] = [
      {
        id: 1,
        type: "critical",
        title: "Wildfire Spreading",
        location: "North County",
        time: "10 minutes ago",
      },
      {
        id: 2,
        type: "warning",
        title: "Flash Flood Warning",
        location: "Downtown Area",
        time: "30 minutes ago",
      },
      {
        id: 3,
        type: "info",
        title: "Road Closure",
        location: "Highway 101",
        time: "1 hour ago",
      },
      {
        id: 4,
        type: "warning",
        title: "Power Outage",
        location: "East District",
        time: "2 hours ago",
      },
    ]

    setTimeout(() => {
      setAlerts(mockAlerts)
      setLoading(false)
    }, 800)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Info
          </Badge>
        )
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Active Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{alert.title}</h3>
                    {getAlertBadge(alert.type)}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <p>{alert.location}</p>
                    <p className="text-xs">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
