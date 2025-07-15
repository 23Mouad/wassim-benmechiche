import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = [
    "Flutter",
    "Dart",
    "Firebase",
    "REST APIs",
    "State Management",
    "Git / GitHub",
];

export function About() {
    return (
        <section id="about" className="py-24 bg-muted">
            <div className="container">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                    About Me
                </h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Wassim Benmechiche</CardTitle>
                        <CardDescription>
                            Software Engineer | Flutter Developer
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            I&apos;m a Software Engineer specializing in Flutter
                            mobile development, with hands-on experience
                            building and publishing real-world applications
                            using Flutter and Dart. <br />
                            <br /> My experience includes applying
                            Object-Oriented Programming principles, working with
                            Data Structures, and implementing the MVVM
                            architectural pattern to build organized and
                            maintainable codebases.
                            <br />
                            <br /> I use state management solutions like
                            Provider and BLoC, integrate Firebase services
                            (authentication, Firestore, cloud functions), and
                            efficiently consume RESTful APIs.
                            <br />
                            <br />
                            I&apos;m committed to writing clean, scalable code and
                            continuously learning to stay up to date with the
                            latest trends and technologies in mobile
                            development.
                        </p>
                        <p className="mb-4">
                            I thrive on challenges and constantly push myself to
                            learn new technologies and best practices. My goal
                            is to create apps that not only look great but also
                            provide an exceptional user experience.
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
    );
}
