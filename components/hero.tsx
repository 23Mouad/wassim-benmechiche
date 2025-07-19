"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {  Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section id="home" className="py-24 md:py-32">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-8">
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-48 h-48"
                            >
                                <Image
                                    src={"/profileImg.jpg"}
                                    alt="Wassim Benmachiche"
                                    fill
                                    className="rounded-full object-cover border-4 border-background shadow-xl"
                                />

                                <Badge className="absolute bottom-4 right-4 bg-blue-500 text-white">
                                    <span className="sr-only">Verified</span>✓
                                </Badge>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Wassim Benmechiche
                            </h1>
                            <h4 className=" font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                                Software Engineer | Flutter Developer
                            </h4>
                            <p className="text-xl text-muted-foreground max-w-2xl">
                                I&apos;m a Software Engineer specialized in
                                mobile development using Flutter and Dart. I
                                have hands-on experiencebuilding and publishing
                                cross-platform apps with real-world features,
                                including real-time multiplayer,
                                Firebaseintegration, and API consumption. I
                                focus on writing clean, maintainable code and
                                continuously work to improve my skills and
                                deliver scalablesolutions. I&apos;m passionate
                                about turning ideas into functional and
                                high-performing mobile applications.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4"
                        >
                            {/* <a
                                href="https://github.com/wassimebenmachich"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <Github size={24} />
                            </a> */}
                            <a
                                href="https://www.linkedin.com/in/wassim-benmechiche-772118248/?originalSubdomain=dz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <Linkedin size={24} />
                            </a>
                            {/* <a
                                href="#"
                                className="p-2 rounded-full hover:bg-muted transition-colors"
                            >
                                <Briefcase size={24} />
                            </a> */}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex-1"
                    >
                        <Image
                            src="/images/Development-amico.svg"
                            alt="Laptop Illustration"
                            width={600}
                            height={400}
                            className="w-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
