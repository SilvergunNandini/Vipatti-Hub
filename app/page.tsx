import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Users, LifeBuoy, ArrowRight, Shield, Phone, Heart } from "lucide-react"
import EnhancedEmergencyMap from "@/components/enhanced-emergency-map"
import NewsAlerts from "@/components/news-alerts"
import GovernmentAssistance from "@/components/government-assistance"
import Header from "@/components/header"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Background graphics */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 border-4 border-white/50 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-28 h-28 border-4 border-orange-200 rounded-full"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-orange-100">
                    <span className="text-2xl">🇮🇳</span>
                    <span className="text-sm font-medium">INDIA EMERGENCY RESPONSE SYSTEM</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                    विपत्ति हब
                    <br />
                    <span className="text-orange-200">Vipatti-Hub</span>
                  </h1>
                  <p className="max-w-[600px] text-white/90 text-lg md:text-xl">
                    Connect with your community, access government assistance, and get AI-powered emergency guidance.
                    Designed for India's diverse emergency scenarios.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-orange-50 font-medium h-auto py-3 px-4"
                    asChild
                  >
                    <Link href="/emergencies" className="flex flex-col items-center gap-1">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="text-sm leading-tight text-center">Report Emergency</span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-orange-50 font-medium h-auto py-3 px-4"
                    asChild
                  >
                    <Link href="/government-assistance" className="flex flex-col items-center gap-1">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm leading-tight text-center">Gov Assistance</span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-orange-50 font-medium h-auto py-3 px-4 sm:col-span-2 lg:col-span-1"
                    asChild
                  >
                    <Link href="/ai-assistant" className="flex flex-col items-center gap-1">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm leading-tight text-center">AI Assistant</span>
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-sm text-orange-100">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Emergency: 108</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Police: 100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Fire: 101</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <NewsAlerts />
              </div>
            </div>
          </div>
        </section>

        {/* Government Assistance Section */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-r from-green-50 to-blue-50 relative">
          {/* Background graphics */}
          <div className="absolute inset-0 opacity-5">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt=""
              width={100}
              height={100}
              className="absolute top-10 left-10"
            />
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt=""
              width={80}
              height={80}
              className="absolute top-20 right-20"
            />
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt=""
              width={120}
              height={120}
              className="absolute bottom-20 left-20"
            />
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-800 font-medium mb-4">
                <Shield className="h-5 w-5" />
                <span>🇮🇳 Government Emergency Response</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-green-800 mb-4">
                Indian Armed Forces & Emergency Services
              </h2>
              <p className="max-w-[800px] mx-auto text-green-700 text-lg font-medium">
                Track real-time assistance from Indian Army, Air Force, Navy, NDRF, and other emergency services.
              </p>
            </div>
            <GovernmentAssistance />
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Interactive Emergency Map</h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground text-lg">
                View active emergencies across India, find safe routes, and locate resources in real-time.
              </p>
            </div>
            <EnhancedEmergencyMap />
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-orange-800">Smart Routing</h3>
                  <p className="text-muted-foreground">
                    AI-powered route planning avoiding blocked roads, flood zones, and conflict areas across India.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-orange-600 hover:underline" asChild>
                    <Link href="/routes">
                      Find Safe Routes <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-blue-800">Community Network</h3>
                  <p className="text-muted-foreground">
                    Connect with neighbors, share resources, and coordinate help during emergencies.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:underline" asChild>
                    <Link href="/community">
                      Join Community <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">Government Aid</h3>
                  <p className="text-muted-foreground">
                    Track Indian Army, NDRF, and emergency services response with real-time updates.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-green-600 hover:underline" asChild>
                    <Link href="/government-assistance">
                      View Assistance <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <LifeBuoy className="h-6 w-6 text-red-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-red-800">Survival Guides</h3>
                  <p className="text-muted-foreground">
                    India-specific survival guides for monsoons, earthquakes, conflicts, and other emergencies.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-red-600 hover:underline" asChild>
                    <Link href="/guides">
                      View Guides <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts Section */}
        <section className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Indian Emergency Contacts</h2>
                  <p className="text-muted-foreground text-lg">
                    Quick access to Indian emergency services and support organizations.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 rounded-lg border p-4 bg-red-50 hover:bg-red-100 transition-colors">
                    <div className="bg-red-500 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Emergency Services</h3>
                      <p className="text-sm text-muted-foreground">108 - Medical, Fire, Police</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-blue-50 transition-colors">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">NDRF (Disaster Response)</h3>
                      <p className="text-sm text-muted-foreground">1078 - National Disaster Response Force</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg border p-4 hover:bg-green-50 transition-colors">
                    <div className="bg-green-500 p-3 rounded-full">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Women Helpline</h3>
                      <p className="text-sm text-muted-foreground">1091 - Women in Distress</p>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/contacts">View All Emergency Contacts</Link>
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Community Support</h2>
                  <p className="text-muted-foreground text-lg">
                    Join community efforts and contribute during emergencies.
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-lg border p-4 bg-green-50 hover:bg-green-100 transition-colors">
                    <h3 className="font-medium">Volunteer Network</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Register your skills to help during emergencies across India.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                    <h3 className="font-medium">Resource Sharing</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Share and request essential supplies with your community.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4 bg-orange-50 hover:bg-orange-100 transition-colors">
                    <h3 className="font-medium">Missing Persons</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Help reunite families and find missing persons during crises.
                    </p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">Vipatti-Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              🇮🇳 Connecting Indian communities during emergencies.
              <br />
              Providing resources, information, and government assistance.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Emergencies</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/emergencies" className="text-sm hover:underline">
                  Active Alerts
                </Link>
                <Link href="/emergencies" className="text-sm hover:underline">
                  Report Emergency
                </Link>
                <Link href="/" className="text-sm hover:underline">
                  Emergency Map
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/resources" className="text-sm hover:underline">
                  Find Resources
                </Link>
                <Link href="/resources/offer" className="text-sm hover:underline">
                  Share Resources
                </Link>
                <Link href="/missing-persons" className="text-sm hover:underline">
                  Missing Persons
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Community</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/community" className="text-sm hover:underline">
                  Connect
                </Link>
                <Link href="/government-assistance" className="text-sm hover:underline">
                  Gov Assistance
                </Link>
                <Link href="/ai-assistant" className="text-sm hover:underline">
                  AI Assistant
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Support</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/guides" className="text-sm hover:underline">
                  Survival Guides
                </Link>
                <Link href="/contacts" className="text-sm hover:underline">
                  Emergency Contacts
                </Link>
                <Link href="/contribute" className="text-sm hover:underline">
                  Contribute
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Vipatti-Hub. All rights reserved. Made for India 🇮🇳
            </p>
            <nav className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
