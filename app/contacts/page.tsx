import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Clock, AlertTriangle, Shield, Heart } from "lucide-react"

export default function ContactsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🇮🇳</span>
              <h1 className="text-3xl font-bold">Indian Emergency Contacts</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Essential contact information for Indian emergency services and support organizations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Services
                </CardTitle>
                <CardDescription>Immediate life-threatening emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">108</p>
                    <p className="text-sm text-muted-foreground">Emergency Services (Medical, Fire, Police)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">100</p>
                    <p className="text-sm text-muted-foreground">Police Emergency</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">101</p>
                    <p className="text-sm text-muted-foreground">Fire Brigade</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">24/7 Available</p>
                    <p className="text-sm text-muted-foreground">Always available for emergencies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-500" />
                  NDRF (National Disaster Response Force)
                </CardTitle>
                <CardDescription>Natural disaster and emergency response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">1078</p>
                    <p className="text-sm text-muted-foreground">National Disaster Response Force</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">24/7 Available</p>
                    <p className="text-sm text-muted-foreground">Disaster response and rescue operations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Women & Child Helplines
                </CardTitle>
                <CardDescription>Support for women and children in distress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="font-medium">1091</p>
                    <p className="text-sm text-muted-foreground">Women Helpline</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="font-medium">1098</p>
                    <p className="text-sm text-muted-foreground">Child Helpline</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="font-medium">24/7 Available</p>
                    <p className="text-sm text-muted-foreground">Free and confidential support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  Railway & Transport Emergency
                </CardTitle>
                <CardDescription>Railway accidents and transport emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">1512</p>
                    <p className="text-sm text-muted-foreground">Railway Accident Emergency Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">139</p>
                    <p className="text-sm text-muted-foreground">Railway Enquiry</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-500" />
                  Medical Emergency
                </CardTitle>
                <CardDescription>Medical assistance and ambulance services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">102</p>
                    <p className="text-sm text-muted-foreground">Ambulance Service</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">1066</p>
                    <p className="text-sm text-muted-foreground">Senior Citizen Helpline</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-500" />
                  Mental Health Support
                </CardTitle>
                <CardDescription>Mental health crisis and counseling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">9152987821</p>
                    <p className="text-sm text-muted-foreground">COOJ Mental Health Foundation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">9820466726</p>
                    <p className="text-sm text-muted-foreground">Connecting Trust</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg border-2 border-orange-200">
            <h3 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              Important Reminders
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-orange-800">For Immediate Emergencies:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Call 108 for any emergency</li>
                  <li>• Stay calm and speak clearly</li>
                  <li>• Provide exact location details</li>
                  <li>• Follow operator instructions</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">During Natural Disasters:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Contact NDRF: 1078</li>
                  <li>• Follow official evacuation orders</li>
                  <li>• Monitor DD News for updates</li>
                  <li>• Keep emergency kit ready</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
