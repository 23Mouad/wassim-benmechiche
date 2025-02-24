import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experiences = [
  {
    company: "TechInnovate",
    role: "Senior Flutter Developer",
    duration: "2021 - Present",
    responsibilities: [
      "Lead development of multiple Flutter applications",
      "Mentor junior developers and conduct code reviews",
      "Implement complex UI designs and animations",
      "Integrate RESTful APIs and Firebase services",
    ],
  },
  {
    company: "MobileWizards",
    role: "Flutter Developer",
    duration: "2019 - 2021",
    responsibilities: [
      "Developed and maintained cross-platform mobile applications",
      "Collaborated with design and backend teams",
      "Implemented state management solutions using Provider and Bloc",
      "Optimized app performance and reduced load times",
    ],
  },
  {
    company: "StartupX",
    role: "Junior Mobile Developer",
    duration: "2018 - 2019",
    responsibilities: [
      "Assisted in the development of mobile applications using Flutter",
      "Learned and applied best practices in mobile app development",
      "Participated in daily stand-ups and sprint planning meetings",
      "Contributed to the company's internal widget library",
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card key={exp.company}>
              <CardHeader>
                <CardTitle>{exp.role}</CardTitle>
                <CardDescription>
                  {exp.company} | {exp.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

