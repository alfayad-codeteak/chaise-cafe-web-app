"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show splash screen for 2.5 seconds total
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {/* Left Door Panel */}
                    <motion.div
                        variants={{
                            initial: { x: 0 },
                            exit: { x: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
                        }}
                        className="absolute left-0 top-0 bottom-0 w-1/2 bg-black z-20 pointer-events-auto"
                    />

                    {/* Right Door Panel */}
                    <motion.div
                        variants={{
                            initial: { x: 0 },
                            exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
                        }}
                        className="absolute right-0 top-0 bottom-0 w-1/2 bg-black z-20 pointer-events-auto"
                    />

                    {/* Logo Container */}
                    <motion.div
                        variants={{
                            initial: { opacity: 0, scale: 0.8 },
                            animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
                            exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } }
                        }}
                        className="relative z-30 w-64 h-64 md:w-96 md:h-96"
                    >
                        <Image
                            src="/company-logo.png"
                            alt="Chaise Cafe"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
