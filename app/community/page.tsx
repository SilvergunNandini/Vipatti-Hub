import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Calendar, MapPin, Clock, ThumbsUp } from "lucide-react"
import Header from "@/components/header"

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-10 flex-1">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Community Hub</h1>
          <p className="text-muted-foreground">
            Connect with your community, join local initiatives, and contribute to emergency response efforts
          </p>
        </div>

        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Discussions</h2>
              <Button asChild>
                <Link href="/community/new-discussion">Start Discussion</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <DiscussionCard
                title="Water distribution points in Downtown area"
                author="Maria Rodriguez"
                authorImage="/placeholder.svg?height=40&width=40"
                date="2 hours ago"
                replies={12}
                likes={24}
                category="Resources"
              />
              <DiscussionCard
                title="Volunteer needed for elderly assistance"
                author="James Wilson"
                authorImage="/placeholder.svg?height=40&width=40"
                date="5 hours ago"
                replies={8}
                likes={15}
                category="Help Needed"
                urgent={true}
              />
              <DiscussionCard
                title="Road closure updates for Highway 101"
                author="Sarah Johnson"
                authorImage="/placeholder.svg?height=40&width=40"
                date="Yesterday"
                replies={32}
                likes={47}
                category="Updates"
              />
              <DiscussionCard
                title="Community kitchen initiative at Central Park"
                author="Michael Chen"
                authorImage="/placeholder.svg?height=40&width=40"
                date="2 days ago"
                replies={19}
                likes={36}
                category="Initiative"
              />
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">Load More Discussions</Button>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Upcoming Events</h2>
              <Button asChild>
                <Link href="/community/new-event">Create Event</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                title="Emergency Preparedness Workshop"
                date="June 15, 2025"
                time="10:00 AM - 12:00 PM"
                location="Community Center"
                organizer="Emergency Response Team"
                attendees={24}
              />
              <EventCard
                title="First Aid Training"
                date="June 18, 2025"
                time="2:00 PM - 5:00 PM"
                location="Medical Center"
                organizer="Red Cross"
                attendees={18}
              />
              <EventCard
                title="Community Resource Distribution"
                date="June 20, 2025"
                time="9:00 AM - 3:00 PM"
                location="Central Park"
                organizer="Volunteer Coalition"
                attendees={56}
                featured={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Volunteer Opportunities</h2>
              <Button asChild>
                <Link href="/community/volunteer">Become a Volunteer</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <VolunteerCard
                title="Medical Assistance"
                description="Volunteers with medical training needed to assist at community centers"
                skills={["First Aid", "Medical Training", "CPR Certified"]}
                location="Multiple Locations"
                urgent={true}
              />
              <VolunteerCard
                title="Resource Distribution"
                description="Help distribute food, water, and supplies to affected communities"
                skills={["Organization", "Physical Ability", "Communication"]}
                location="Central Distribution Center"
              />
              <VolunteerCard
                title="Elderly Check-ins"
                description="Visit and assist elderly community members who may need help"
                skills={["Compassion", "Reliability", "Basic Care"]}
                location="Various Neighborhoods"
              />
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Community Projects</h2>
              <Button asChild>
                <Link href="/community/new-project">Propose Project</Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ProjectCard
                title="Community Garden Initiative"
                description="Creating sustainable food sources through community gardens in each neighborhood"
                progress={65}
                contributors={12}
                category="Sustainability"
              />
              <ProjectCard
                title="Emergency Communication Network"
                description="Building a resilient communication system that works during infrastructure failures"
                progress={40}
                contributors={8}
                category="Infrastructure"
                featured={true}
              />
              <ProjectCard
                title="Neighborhood Watch Program"
                description="Organizing community members to maintain security and safety during emergencies"
                progress={80}
                contributors={24}
                category="Safety"
              />
              <ProjectCard
                title="Alternative Transportation Routes"
                description="Mapping and maintaining alternative routes for when main roads are blocked"
                progress={25}
                contributors={6}
                category="Transportation"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface DiscussionCardProps {
  title: string
  author: string
  authorImage: string
  date: string
  replies: number
  likes: number
  category: string
  urgent?: boolean
}

function DiscussionCard({ title, author, authorImage, date, replies, likes, category, urgent }: DiscussionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Image
              src={authorImage || "/placeholder.svg"}
              alt={author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                By {author} • {date}
              </CardDescription>
            </div>
          </div>
          <Badge variant={urgent ? "destructive" : "outline"}>{category}</Badge>
        </div>
      </CardHeader>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{replies} replies</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes} likes</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          View Discussion
        </Button>
      </CardFooter>
    </Card>
  )
}

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  organizer: string
  attendees: number
  featured?: boolean
}

function EventCard({ title, date, time, location, organizer, attendees, featured }: EventCardProps) {
  return (
    <Card className={featured ? "border-red-200 bg-red-50/50" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {featured && (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription>{organizer}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{attendees} attending</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">RSVP</Button>
      </CardFooter>
    </Card>
  )
}

interface VolunteerCardProps {
  title: string
  description: string
  skills: string[]
  location: string
  urgent?: boolean
}

function VolunteerCard({ title, description, skills, location, urgent }: VolunteerCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {urgent && <Badge variant="destructive">Urgent Need</Badge>}
        </div>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{description}</p>
        <div className="space-y-2">
          <div className="text-sm font-medium">Required Skills:</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply</Button>
      </CardFooter>
    </Card>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  progress: number
  contributors: number
  category: string
  featured?: boolean
}

function ProjectCard({ title, description, progress, contributors, category, featured }: ProjectCardProps) {
  return (
    <Card className={featured ? "border-red-200 bg-red-50/50" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          {featured && (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{contributors} contributors</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Join Project</Button>
      </CardFooter>
    </Card>
  )
}
