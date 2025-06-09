import Header from "@/components/header"
import RoutePlanner from "@/components/route-planner"

export default function RoutesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency Route Planning</h1>
            <p className="text-muted-foreground">
              Find safe routes avoiding blocked roads, dangerous areas, and emergency zones.
            </p>
          </div>
          <RoutePlanner />
        </div>
      </div>
    </div>
  )
}
