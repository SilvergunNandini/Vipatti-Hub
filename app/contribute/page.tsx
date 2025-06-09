import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Wrench, Truck, Clock } from "lucide-react"

export default function ContributePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contribute & Help Your Community</h1>
            <p className="text-muted-foreground">
              Join community efforts to help during emergencies. Your skills and resources can make a difference.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Volunteer Opportunities
                </CardTitle>
                <CardDescription>Use your skills to help others during emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Medical Assistance</p>
                      <p className="text-sm text-muted-foreground">Help at emergency shelters</p>
                    </div>
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Food Distribution</p>
                      <p className="text-sm text-muted-foreground">Organize meal services</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Transportation</p>
                      <p className="text-sm text-muted-foreground">Help with evacuations</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
                <Button className="w-full">Register as Volunteer</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Resource Sharing
                </CardTitle>
                <CardDescription>Share what you have to help others in need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Emergency Supplies</p>
                      <p className="text-sm text-muted-foreground">Water, food, medical supplies</p>
                    </div>
                    <Badge className="bg-green-500">Needed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Shelter Space</p>
                      <p className="text-sm text-muted-foreground">Temporary housing</p>
                    </div>
                    <Badge className="bg-green-500">Needed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Tools & Equipment</p>
                      <p className="text-sm text-muted-foreground">Generators, tools, vehicles</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
                <Button className="w-full">Share Resources</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-500" />
                  Skill-Based Help
                </CardTitle>
                <CardDescription>Offer your professional skills to help the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Construction & Repair</p>
                      <p className="text-sm text-muted-foreground">Building repairs, cleanup</p>
                    </div>
                    <Badge className="bg-yellow-500">High Demand</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">IT & Communications</p>
                      <p className="text-sm text-muted-foreground">Tech support, networks</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Legal & Administrative</p>
                      <p className="text-sm text-muted-foreground">Documentation, legal aid</p>
                    </div>
                    <Badge variant="outline">Available</Badge>
                  </div>
                </div>
                <Button className="w-full">Offer Skills</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-purple-500" />
                  Community Projects
                </CardTitle>
                <CardDescription>Join ongoing community initiatives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Emergency Communication Network</p>
                      <Badge className="bg-blue-500">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Building resilient communication systems</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        12 volunteers
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        40% complete
                      </span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Community Garden Initiative</p>
                      <Badge variant="outline">Planning</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Sustainable food sources for emergencies</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />8 volunteers
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        15% complete
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Join Project</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
