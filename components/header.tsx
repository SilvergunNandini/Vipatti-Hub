"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertTriangle, User, LogOut, Settings, Bot } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useLanguage } from "@/lib/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <span className="font-bold text-xl">Vipatti-Hub</span>
          <span className="text-sm">🇮🇳</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/emergencies"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/emergencies") ? "text-red-600 bg-red-50 px-2 py-1 rounded" : ""
            }`}
          >
            {t("header.emergencies")}
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/resources") ? "text-blue-600 bg-blue-50 px-2 py-1 rounded" : ""
            }`}
          >
            {t("header.resources")}
          </Link>
          <Link
            href="/community"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/community") ? "text-green-600 bg-green-50 px-2 py-1 rounded" : ""
            }`}
          >
            {t("header.community")}
          </Link>
          <Link
            href="/government-assistance"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/government-assistance") ? "text-orange-600 bg-orange-50 px-2 py-1 rounded" : ""
            }`}
          >
            {t("header.govAssistance")}
          </Link>
          <Link
            href="/guides"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/guides") ? "text-purple-600 bg-purple-50 px-2 py-1 rounded" : ""
            }`}
          >
            {t("header.guides")}
          </Link>
          <Link
            href="/war-emergency"
            className={`text-sm font-medium hover:underline underline-offset-4 transition-colors ${
              isActive("/war-emergency") ? "text-red-600 bg-red-50 px-2 py-1 rounded" : "text-red-600"
            }`}
          >
            {t("header.warEmergency")}
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`${isActive("/ai-assistant") ? "bg-blue-50 text-blue-600" : ""}`}
            asChild
          >
            <Link href="/ai-assistant" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              {t("header.aiAssistant")}
            </Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth">{t("header.signIn")}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
