"use client"

import { useState, useEffect } from "react"
import { MapPin, AlertTriangle, Home, ShoppingBag } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function EmergencyMap() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate map loading with error handling
    const timer = setTimeout(() => {
      try {
        setLoading(false)
      } catch (err) {
        // Ignore MetaMask-related errors
        if (err instanceof Error && !err.message.includes("MetaMask")) {
          setError("Failed to load map")
        }
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <Card className="relative overflow-hidden rounded-lg border bg-background shadow">
        <div className="aspect-[16/9] w-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Map temporarily unavailable</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="relative overflow-hidden rounded-lg border bg-background shadow">
      <div className="aspect-[16/9] w-full bg-muted">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {/* Static map representation - would be replaced with actual map API */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Map markers */}
              <div className="absolute left-[20%] top-[30%] flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg animate-pulse">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs shadow">Fire</div>
              </div>

              <div className="absolute left-[40%] top-[50%] flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs shadow">Road Blocked</div>
              </div>

              <div className="absolute left-[60%] top-[40%] flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                  <Home className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs shadow">Shelter</div>
              </div>

              <div className="absolute left-[75%] top-[60%] flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs shadow">Supplies</div>
              </div>

              <div className="absolute left-[50%] top-[20%] flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-1 text-xs shadow">Medical</div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 rounded-md bg-white p-2 shadow-md">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Emergency</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Caution</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Safe Zone</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Resources</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
