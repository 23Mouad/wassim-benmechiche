import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skills = [
  "Dart",
  "Flutter",
  "Firebase",
  "REST APIs",
  "State Management",
  "UI/UX Design",
  "Git",
  "Agile",
  "CI/CD",
  "Test-Driven Development",
]

export function About() {
  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">About Me</h2>
        <Card>
          <CardHeader>
            <CardTitle>Wassim Benmechiche</CardTitle>
            <CardDescription>Flutter Developer & Mobile App Enthusiast</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              I'm a passionate Flutter developer with over 5 years of experience in creating beautiful, scalable, and
              performant mobile applications. My journey in mobile development started with native Android, but I
              quickly fell in love with Flutter's flexibility and efficiency.
            </p>
            <p className="mb-4">
              I thrive on challenges and constantly push myself to learn new technologies and best practices. My goal is
              to create apps that not only look great but also provide an exceptional user experience.
            </p>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

