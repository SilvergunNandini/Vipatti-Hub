import Header from "@/components/header"
import MissingPersons from "@/components/missing-persons"

export default function MissingPersonsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <MissingPersons />
      </div>
    </div>
  )
}
