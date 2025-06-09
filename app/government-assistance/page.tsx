import Header from "@/components/header"
import GovernmentAssistance from "@/components/government-assistance"

export default function GovernmentAssistancePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <GovernmentAssistance />
      </div>
    </div>
  )
}
