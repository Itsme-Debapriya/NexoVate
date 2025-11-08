import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Users, Award, Globe, Target } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Globe,
      title: "Global Learning",
      description: "Connecting learners and educators from around the world",
    },
    {
      icon: Award,
      title: "Quality Education",
      description: "Curated courses from industry experts and experienced instructors",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Structured learning paths designed to achieve real-world outcomes",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Supportive learning environment with peer interaction and mentorship",
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "EdTech innovator with 10+ years in online learning",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Curriculum",
      bio: "Former professor focused on course quality and outcomes",
    },
    {
      name: "Alex Rivera",
      role: "VP of Engineering",
      bio: "Platform architect building scalable learning experiences",
    },
    {
      name: "Priya Patel",
      role: "Director of Partnerships",
      bio: "Building relationships with top educators and institutions",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-background-secondary border-b border-border py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About NexoVate</h1>
          <p className="text-lg text-foreground-muted mb-4">
            Empowering learners worldwide with accessible, high-quality education
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-foreground-muted leading-relaxed">
              At NexoVate, we believe education is the most powerful tool for personal and professional growth. Our
              mission is to make high-quality learning accessible to everyone, regardless of their background or
              location. We're building a platform where passionate educators can share their expertise and millions of
              learners can unlock their potential.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-foreground-muted leading-relaxed">
              We envision a world where learning is personalized, engaging, and available to all. Through innovative
              technology and a commitment to educational excellence, we're creating opportunities for people to learn,
              grow, and achieve their goals on their own terms.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-background-secondary border-y border-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-foreground-muted text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Leadership Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-background-secondary p-6 text-center transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-foreground-muted text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-background-secondary border-y border-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500K+</div>
              <p className="text-foreground-muted">Active Learners</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-foreground-muted">Courses Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
              <p className="text-foreground-muted">Expert Instructors</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <p className="text-foreground-muted">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
