import Header from "@/components/header"
import WarSpecificFeatures from "@/components/war-specific-features"

export default function WarEmergencyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <WarSpecificFeatures />
      </div>
    </div>
  )
}
