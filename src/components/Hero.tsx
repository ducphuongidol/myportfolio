'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Animation variants for word-by-word reveal
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const wordVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.8,
        },
    },
};

const charVariants = {
    hidden: {
        opacity: 0,
        y: 10,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: 'easeOut' as const,
        },
    },
};

// Component for animated words
const AnimatedWords = ({ text, className }: { text: string; className?: string }) => {
    const [mounted, setMounted] = useState(false);
    const words = text.split(' ');

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.h1
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.25em]"
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
};

// Component for animated characters (subtitle)
const AnimatedChars = ({ text, className }: { text: string; className?: string }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.p
            className={className}
            variants={subtitleVariants}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
        >
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block"
                    style={{
                        willChange: 'transform, opacity, filter',
                        whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.muted = true;
                // We don't pause, we just mute it as per original design intention
            } else {
                videoRef.current.muted = false;
                try {
                    // Handle the play promise correctly for mobile browsers
                    await videoRef.current.play();
                } catch (err) {
                    console.error("Video play failed:", err);
                    // Reset state if play blocked by mobile auto-play policy
                    setIsPlaying(false);
                    return;
                }
            }
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="relative h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden bg-stone-50 text-stone-800">
            {/* Background - Nature / Light theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-stone-100 opacity-90" />

            {/* Video Background */}
            <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isPlaying ? 'opacity-100 scale-100 blur-0' : 'opacity-80 scale-105 blur-[2px]'
                        }`}
                >
                    {/* Using a high quality nature video from Pexels (free to use) */}
                    <source src="/images/backgroundvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay gradients - fades out when playing */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent transition-opacity duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100'
                        }`}
                />
            </div>

            {/* Content Container - Fades out when playing */}
            <motion.div
                className="z-10 relative mt-32 px-4 flex flex-col items-center"
                animate={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto' }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated Title - Word by Word with Blur */}
                    <AnimatedWords
                        text="Chuyến Đi Tuổi Trẻ"
                        className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4 text-white drop-shadow-2xl"
                    />

                    {/* Animated Subtitle - Character by Character with Blur */}
                    <AnimatedChars
                        text="Mỗi chuyến đi là một trải nghiệm hoàn toàn khác."
                        className="text-lg md:text-2xl text-stone-100 font-light italic font-serif tracking-wide drop-shadow-lg"
                    />
                </div>

            </motion.div>

            <motion.div
                className="absolute bottom-10 z-10 cursor-pointer flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? 'none' : 'auto' }}
                transition={{ duration: 0.8 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-sm uppercase tracking-widest font-medium drop-shadow-md">Khám phá</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="drop-shadow-md"
                >
                    <ArrowDown size={32} />
                </motion.div>
            </motion.div>

            {/* Play/Stop Config Control */}
            <button
                onClick={togglePlay}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                aria-label={isPlaying ? "Stop video sound" : "Play video sound"}
            >
                {isPlaying ? (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium tracking-wider uppercase">Dừng</span>
                        <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium tracking-wider uppercase">Phát video</span>
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                    </div>
                )}
            </button>
        </section>
    );
}
