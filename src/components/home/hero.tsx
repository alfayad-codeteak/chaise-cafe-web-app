"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const quotes = [
    "Where every flavor tells a story...",
    "Sip, savor, and smile with every cup.",
    "Fresh ingredients, unforgettable memories.",
    "Your daily dose of happiness in a mug."
];

const videos = [
    "/hero.mp4",
    "/hero2.mp4",
    "/hero3.mp4"
];

export function Hero() {
    const [index, setIndex] = useState(0);
    const [videoIndex, setVideoIndex] = useState(0);

    useEffect(() => {
        const quoteTimer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 5000);

        const videoTimer = setInterval(() => {
            setVideoIndex((prev) => (prev + 1) % videos.length);
        }, 8000);

        return () => {
            clearInterval(quoteTimer);
            clearInterval(videoTimer);
        };
    }, []);

    return (
        <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
            {/* Background Video with Overlay */}
            <AnimatePresence mode="popLayout">
                <motion.video
                    key={videoIndex}
                    src={videos[videoIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/30" />

            <div className="container relative z-10 px-4 text-center flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.h1
                        className="text-6xl sm:text-8xl font-bold text-[#ffcf0d] mb-6 tracking-tighter drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        CHAISE
                    </motion.h1>
                    <motion.div
                        key={index}
                        className="flex flex-wrap justify-center overflow-hidden min-h-[3rem]"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 1 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.2,
                                },
                            },
                        }}
                    >
                        {Array.from(quotes[index]).map((char, i) => (
                            <motion.span
                                key={i}
                                className="text-xl sm:text-3xl text-[#ffcf0d] font-light"
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                <div className="pb-32 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.5 }}
                    >
                        <Button asChild className="text-sm font-medium px-8 py-2.5 h-auto rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all hover:scale-105 hover:shadow-xl">
                            <Link href="/menu">Order Now</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
