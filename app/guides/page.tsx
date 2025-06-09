import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  AlertTriangle,
  Droplet,
  Utensils,
  AmbulanceIcon as FirstAid,
  Home,
  Shield,
} from "lucide-react"
import Header from "@/components/header"

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Emergency Survival Guides</h1>
          <p className="text-muted-foreground">
            Comprehensive guides to help you prepare for and survive various emergency situations
          </p>
        </div>

        <div className="flex items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search guides..." className="pl-8" />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Guides</TabsTrigger>
            <TabsTrigger value="natural">Natural Disasters</TabsTrigger>
            <TabsTrigger value="medical">Medical</TabsTrigger>
            <TabsTrigger value="survival">Basic Survival</TabsTrigger>
            <TabsTrigger value="pandemic">Pandemic</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <GuideCard
                title="Earthquake Preparedness"
                description="Learn how to prepare for, survive during, and recover after an earthquake."
                category="Natural Disaster"
                icon={<AlertTriangle className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="First Aid Essentials"
                description="Basic first aid techniques for common injuries during emergencies."
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                difficulty="Intermediate"
              />
              <GuideCard
                title="Water Purification Methods"
                description="Multiple techniques to make water safe for drinking during emergencies."
                category="Survival"
                icon={<Droplet className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Emergency Food Storage"
                description="How to build and maintain an emergency food supply for your household."
                category="Survival"
                icon={<Utensils className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Building Emergency Shelters"
                description="Techniques for creating temporary shelters using available materials."
                category="Survival"
                icon={<Home className="h-5 w-5" />}
                difficulty="Advanced"
              />
              <GuideCard
                title="Pandemic Response Guide"
                description="Comprehensive guide for staying safe during disease outbreaks."
                category="Pandemic"
                icon={<Shield className="h-5 w-5" />}
                difficulty="Intermediate"
                featured={true}
              />
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">Load More Guides</Button>
            </div>
          </TabsContent>

          <TabsContent value="natural" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <GuideCard
                title="Earthquake Preparedness"
                description="Learn how to prepare for, survive during, and recover after an earthquake."
                category="Natural Disaster"
                icon={<AlertTriangle className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Hurricane Safety"
                description="Preparation, evacuation, and recovery guidelines for hurricane scenarios."
                category="Natural Disaster"
                icon={<AlertTriangle className="h-5 w-5" />}
                difficulty="Intermediate"
              />
              <GuideCard
                title="Wildfire Response"
                description="How to prepare for and respond to wildfires in your area."
                category="Natural Disaster"
                icon={<AlertTriangle className="h-5 w-5" />}
                difficulty="Intermediate"
              />
            </div>
          </TabsContent>

          <TabsContent value="medical">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <GuideCard
                title="First Aid Essentials"
                description="Basic first aid techniques for common injuries during emergencies."
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                difficulty="Intermediate"
              />
              <GuideCard
                title="Emergency Childbirth"
                description="How to assist with emergency childbirth when medical help is unavailable."
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                difficulty="Advanced"
              />
              <GuideCard
                title="Managing Chronic Conditions"
                description="Strategies for managing chronic health conditions during emergencies."
                category="Medical"
                icon={<FirstAid className="h-5 w-5" />}
                difficulty="Intermediate"
              />
            </div>
          </TabsContent>

          <TabsContent value="survival">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <GuideCard
                title="Water Purification Methods"
                description="Multiple techniques to make water safe for drinking during emergencies."
                category="Survival"
                icon={<Droplet className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Emergency Food Storage"
                description="How to build and maintain an emergency food supply for your household."
                category="Survival"
                icon={<Utensils className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Building Emergency Shelters"
                description="Techniques for creating temporary shelters using available materials."
                category="Survival"
                icon={<Home className="h-5 w-5" />}
                difficulty="Advanced"
              />
            </div>
          </TabsContent>

          <TabsContent value="pandemic">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <GuideCard
                title="Pandemic Response Guide"
                description="Comprehensive guide for staying safe during disease outbreaks."
                category="Pandemic"
                icon={<Shield className="h-5 w-5" />}
                difficulty="Intermediate"
                featured={true}
              />
              <GuideCard
                title="Home Quarantine Procedures"
                description="How to effectively quarantine at home during infectious disease outbreaks."
                category="Pandemic"
                icon={<Shield className="h-5 w-5" />}
                difficulty="Beginner"
              />
              <GuideCard
                title="Community Support Networks"
                description="Building and maintaining community support networks during pandemics."
                category="Pandemic"
                icon={<Shield className="h-5 w-5" />}
                difficulty="Intermediate"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface GuideCardProps {
  title: string
  description: string
  category: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  featured?: boolean
}

function GuideCard({ title, description, category, icon, difficulty, featured }: GuideCardProps) {
  return (
    <Card className={featured ? "border-red-200 bg-red-50/50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-muted p-1.5">{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {featured && (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Difficulty: {difficulty}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Read Guide
        </Button>
      </CardFooter>
    </Card>
  )
}
