"use client"

import React from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Filter out browser extension errors that don't affect our app
    const extensionErrors = [
      "MetaMask",
      "ChromeTransport",
      "connectChrome",
      "extension not found",
      "chrome-extension",
      "moz-extension",
      "safari-extension",
      "Non-Error promise rejection captured",
    ]

    const isExtensionError = extensionErrors.some(
      (keyword) =>
        error.message?.toLowerCase().includes(keyword.toLowerCase()) ||
        error.stack?.toLowerCase().includes(keyword.toLowerCase()),
    )

    if (isExtensionError) {
      console.warn("Browser extension error detected and ignored:", error.message)
      return { hasError: false }
    }

    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Filter out extension-related errors
    const extensionErrors = [
      "MetaMask",
      "ChromeTransport",
      "connectChrome",
      "extension not found",
      "chrome-extension",
      "moz-extension",
      "safari-extension",
    ]

    const isExtensionError = extensionErrors.some(
      (keyword) =>
        error.message?.toLowerCase().includes(keyword.toLowerCase()) ||
        error.stack?.toLowerCase().includes(keyword.toLowerCase()),
    )

    if (isExtensionError) {
      console.warn("Browser extension error detected but ignored:", error.message)
      this.setState({ hasError: false })
      return
    }

    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle>Something went wrong</CardTitle>
              </div>
              <CardDescription>An error occurred while loading the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{this.state.error.message}</p>
              <Button onClick={() => this.setState({ hasError: false })} className="w-full">
                Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
