'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { Trip } from '../data/trips';
import TripStory from './TripStory';
import TripGallery from './TripGallery';
import { cn } from '../lib/utils';
import ImageViewer from './ImageViewer';

interface TripSectionProps {
    trip: Trip;
    isExpanded: boolean;
    onToggle: () => void;
}

export default function TripSection({ trip, isExpanded, onToggle }: TripSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    useEffect(() => {
        if (isExpanded && sectionRef.current) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [isExpanded]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggle();
        setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    return (
        <>
            <motion.section
                ref={sectionRef}
                className={cn(
                    "relative w-full overflow-hidden flex flex-col transition-colors duration-700",
                    // EXPANDED: Light background (stone-50), COLLAPSED: Dark/Image heavy
                    isExpanded ? "min-h-[100vh] h-auto bg-stone-50" : "h-[100vh]"
                )}
                onClick={!isExpanded ? onToggle : undefined}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {/* Background Image - Only full opacity when collapsed */}
                <motion.div
                    className="absolute inset-0 z-0"
                    layoutId={`bg-${trip.id}`}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: isExpanded ? 0 : 1 }} // Fade out image when expanded to show white bg
                    transition={{ duration: 0.8 }}
                    style={{ y: isExpanded ? 0 : y, scale: isExpanded ? 1 : 1.1 }}
                >
                    <Image
                        src={trip.coverImage}
                        alt={trip.title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: trip.coverImagePosition ?? "center bottom" }}
                        priority
                    />
                    {/* Dark overlay for text readability when collapsed */}
                    <div className={cn(
                        // Changed gradient to be stronger at the bottom/center where text is
                        "absolute inset-0 bg-gradient-to-r from-stone-950/60 via-stone-900/20 to-transparent",
                        isExpanded ? "opacity-0" : "opacity-100"
                    )} />
                </motion.div>

                {/* Hero Banner for Expanded State - A smaller banner logic could go here, or we simple use the white bg */}
                {isExpanded && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Image
                            src={trip.coverImage}
                            alt={trip.title}
                            fill
                            className="object-cover opacity-80"
                            style={{ objectPosition: trip.coverImagePosition ?? "center bottom 25%" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-50/40 to-stone-50" />
                    </motion.div>
                )}


                {/* Content Container */}
                <div className="relative z-10 flex-1 flex flex-col">

                    {/* Header Content */}
                    <motion.div
                        layoutId={`header-${trip.id}`}
                        className={cn(
                            "flex flex-col justify-center px-6 md:px-12 transition-all duration-700 z-10", // Added z-10 to ensure text is above overlay
                            isExpanded ? "pt-32 pb-12 h-auto" : "h-full"
                        )}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.div
                            layout
                            className={cn("flex items-center gap-2 mb-4 drop-shadow-md", isExpanded ? "text-stone-600" : "text-gray-100")}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                        >
                            {/* Added drop-shadow-md and lighter gray for better contrast */}
                            <MapPin size={18} className="drop-shadow-sm" />
                            <span className="uppercase tracking-widest text-sm font-medium drop-shadow-sm">{trip.location}, {trip.country}</span>
                            <span className="w-1 h-1 bg-current rounded-full mx-2" />
                            <Calendar size={18} className="drop-shadow-sm" />
                            <span className="text-sm font-medium drop-shadow-sm">{trip.year}</span>
                        </motion.div>

                        <motion.h2
                            layout
                            className={cn(
                                "font-bold font-serif mb-4 leading-tight",
                                // Added drop-shadow-lg for title
                                isExpanded ? "text-5xl md:text-6xl text-stone-800" : "text-6xl md:text-8xl text-white drop-shadow-lg"
                            )}
                            style={{ color: isExpanded ? trip.themeColor : undefined }}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            {trip.title}
                        </motion.h2>

                        <motion.p
                            layout
                            className={cn(
                                "text-xl md:text-2xl font-light font-serif max-w-2xl mb-8",
                                // Added drop-shadow-md and lighter text color
                                isExpanded ? "text-stone-600" : "text-gray-100 drop-shadow-md"
                            )}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                        >
                            {trip.description}
                        </motion.p>

                        {/* Expand Button */}
                        {!isExpanded && (
                            <motion.button
                                initial={{ opacity: 0 }} // Keep initial for fallback, but controlled by parent variants
                                animate={{ opacity: 1 }} // Keep animate for fallback
                                exit={{ opacity: 0 }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }
                                }}
                                className="group flex items-center gap-2 text-white/90 hover:text-white mt-8 uppercase tracking-widest text-sm font-medium bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full w-fit hover:bg-white/20 transition-all border border-white/20"
                            >
                                Xem chi tiết
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </motion.button>
                        )}
                    </motion.div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex-1"
                            >
                                <TripStory story={trip.story} isLight={true} />
                                <TripGallery
                                    images={trip.images}
                                    onImageClick={(index) => setLightboxIndex(index)}
                                />

                                <div className="flex justify-center pb-24">
                                    <button
                                        onClick={handleClose}
                                        className="flex items-center gap-2 px-8 py-3 bg-stone-800 hover:bg-stone-700 text-white rounded-full transition-colors shadow-lg"
                                    >
                                        <ArrowLeft size={20} />
                                        Quay lại
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </motion.section>

            <ImageViewer
                images={trip.images}
                currentIndex={lightboxIndex || 0}
                isOpen={lightboxIndex !== null}
                onClose={() => setLightboxIndex(null)}
                onNext={() => setLightboxIndex((prev) => (prev !== null && prev < trip.images.length - 1 ? prev + 1 : 0))}
                onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : trip.images.length - 1))}
            />
        </>
    );
}
