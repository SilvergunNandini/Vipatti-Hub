"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Send, AlertTriangle, MapPin, Phone, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  emergencyType?: string
  severity?: "low" | "medium" | "high" | "critical"
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your Emergency AI Assistant. I can help you with any emergency situation, provide survival guidance, suggest resources, and create emergency response plans. What emergency situation do you need help with?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          userId: user?.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response")
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        emergencyType: data.emergencyType,
        severity: data.severity,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // If it's a new emergency, save it to the database
      if (data.shouldSaveEmergency && data.emergencyTitle) {
        try {
          await fetch("/api/emergencies", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.emergencyTitle,
              description: data.emergencyDescription,
              type: data.emergencyType,
              location: data.location || "User Location",
              severity: data.severity,
              userId: user?.id,
            }),
          })
        } catch (emergencyError) {
          console.warn("Failed to save emergency to database:", emergencyError)
          // Don't show error to user as the main response was successful
        }
      }
    } catch (error) {
      console.error("AI Assistant error:", error)
      toast({
        title: "Connection Issue",
        description: "Using offline emergency guidance. For immediate emergencies, call 911.",
        variant: "destructive",
      })

      // Provide offline emergency response
      const offlineMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `🚨 OFFLINE EMERGENCY GUIDANCE

I'm currently unable to connect to advanced AI services, but I can still help with basic emergency guidance.

**IMMEDIATE EMERGENCIES - CALL 911**

**Basic Emergency Steps:**
1. Ensure your immediate safety
2. Call emergency services if needed
3. Move away from danger
4. Account for family members
5. Follow official evacuation orders

**For specific help, try asking:**
- "Fire emergency help"
- "Earthquake safety"
- "Medical emergency"
- "War or conflict guidance"
- "Flood safety"

Please describe your specific emergency situation and I'll provide targeted guidance.`,
        timestamp: new Date(),
        emergencyType: "System Offline",
        severity: "medium",
      }

      setMessages((prev) => [...prev, offlineMessage])
    } finally {
      setIsLoading(false)
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency AI Assistant</h1>
            <p className="text-muted-foreground">
              Get instant help and guidance for any emergency situation. Ask about specific emergencies, survival
              techniques, resource locations, or emergency planning.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <Card className="flex flex-col h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Emergency Chat
                </CardTitle>
                <CardDescription>Describe your emergency situation and get immediate assistance</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.role === "user" ? "bg-blue-500" : "bg-red-500"
                            }`}
                          >
                            {message.role === "user" ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-blue-500 text-white" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            {message.emergencyType && (
                              <div className="mt-2 flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {message.emergencyType}
                                </Badge>
                                {message.severity && (
                                  <Badge className={`text-xs text-white ${getSeverityColor(message.severity)}`}>
                                    {message.severity}
                                  </Badge>
                                )}
                              </div>
                            )}
                            <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <Separator className="my-4" />
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your emergency situation..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Emergency Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setInput("There's a fire in my building, what should I do?")}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Fire Emergency
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setInput("There's an earthquake happening, how do I stay safe?")}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Earthquake
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setInput("I need to find the nearest hospital")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Hospital
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setInput("What emergency supplies should I have at home?")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Emergency Kit
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">Emergency Services</p>
                      <p className="text-sm text-muted-foreground">911</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">Poison Control</p>
                      <p className="text-sm text-muted-foreground">1-800-222-1222</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Red Cross</p>
                      <p className="text-sm text-muted-foreground">1-800-733-2767</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
