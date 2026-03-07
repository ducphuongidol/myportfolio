'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TripImage } from '../data/trips';

interface ImageViewerProps {
    images: TripImage[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function ImageViewer({ images, currentIndex, isOpen, onClose, onNext, onPrev }: ImageViewerProps) {
    const [scale, setScale] = useState(1);

    // Reset zoom when image changes or viewer closes
    useEffect(() => {
        setScale(1);
    }, [currentIndex, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    const toggleZoom = () => setScale(prev => (prev > 1 ? 1 : 2));
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScale(parseFloat(e.target.value));
    };

    const isZoomed = scale > 1;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Top Controls */}
                <div className="absolute top-6 right-6 flex items-center gap-4 z-[60]">
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Responsive Zoom Bar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-10 md:left-auto md:translate-x-0 md:right-8 md:bottom-10 flex flex-row md:flex-col items-center gap-3 z-[60] bg-white/10 p-2 px-5 md:py-5 rounded-full md:rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all hover:bg-white/15">
                    <button onClick={() => setScale(Math.max(scale - 0.2, 1))} className="text-white/60 hover:text-white transition-colors">
                        <ZoomOut size={16} />
                    </button>

                    <div className="w-28 h-1.5 md:w-1.5 md:h-32 bg-white/10 rounded-full relative group">
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={scale}
                            onChange={handleSliderChange}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-6 md:-rotate-90 appearance-none bg-transparent cursor-pointer z-10"
                            style={{
                                outline: 'none',
                                WebkitAppearance: 'none'
                            }}
                        />
                        {/* Custom Track Fill */}
                        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                            {/* Mobile Fill (Horizontal) */}
                            <div
                                className="md:hidden h-full bg-white/40 transition-all duration-100"
                                style={{ width: `${((scale - 1) / 2) * 100}%` }}
                            />
                            {/* Desktop Fill (Vertical) */}
                            <div
                                className="hidden md:block absolute bottom-0 w-full bg-white/40 transition-all duration-100"
                                style={{ height: `${((scale - 1) / 2) * 100}%` }}
                            />
                        </div>

                        {/* The "Point" (Thumb) indicator */}
                        {/* Mobile Point */}
                        <div
                            className="md:hidden absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-black/20 pointer-events-none z-20 transition-all duration-100"
                            style={{ left: `calc(${((scale - 1) / 2) * 100}% - 8px)` }}
                        />
                        {/* Desktop Point */}
                        <div
                            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-black/20 pointer-events-none z-20 transition-all duration-100"
                            style={{ bottom: `calc(${((scale - 1) / 2) * 100}% - 8px)` }}
                        />
                    </div>

                    <button onClick={() => setScale(Math.min(scale + 0.2, 3))} className="text-white/60 hover:text-white transition-colors">
                        <ZoomIn size={16} />
                    </button>

                    {/* Zoom Percentage Label */}
                    <div className="px-2 py-1 bg-white/20 rounded-lg border border-white/10 min-w-[38px] text-center">
                        <span className="text-white text-[9px] md:text-[10px] font-mono font-black">{Math.round(scale * 100)}%</span>
                    </div>
                </div>

                {/* Navigation Buttons - Hidden when zoomed for better panning experience */}
                <AnimatePresence>
                    {!isZoomed && (
                        <>
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={onPrev}
                                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[60] bg-black/20 p-2 rounded-full backdrop-blur-sm scale-75 md:scale-100"
                            >
                                <ChevronLeft size={40} />
                            </motion.button>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onClick={onNext}
                                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[60] bg-black/20 p-2 rounded-full backdrop-blur-sm scale-75 md:scale-100"
                            >
                                <ChevronRight size={40} />
                            </motion.button>
                        </>
                    )}
                </AnimatePresence>

                <div
                    className="relative w-full h-full max-w-5xl max-h-[70vh] md:max-h-[85vh] flex flex-col items-center justify-center cursor-zoom-in"
                    onDoubleClick={toggleZoom}
                >
                    <motion.div
                        key={currentIndex}
                        drag={isZoomed}
                        dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                        dragElastic={0.05}
                        initial={{
                            opacity: 0,
                            scale: 0.85,
                            rotate: -8,
                            y: 40,
                            filter: 'blur(25px)'
                        }}
                        animate={{
                            opacity: 1,
                            scale: scale,
                            rotate: 0,
                            y: 0,
                            filter: 'blur(0px)',
                            x: isZoomed ? undefined : 0
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.1,
                            rotate: 5,
                            filter: 'blur(10px)'
                        }}
                        transition={{
                            type: 'spring',
                            damping: 12,
                            stiffness: 90,
                            mass: 0.8,
                            filter: { duration: 0.8 },
                            opacity: { duration: 0.4 }
                        }}
                        className={`relative w-full h-full transition-transform ${isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                    >
                        <Image
                            src={currentImage.src}
                            alt={currentImage.caption}
                            fill
                            className="object-contain pointer-events-none"
                            quality={100}
                            priority
                        />
                    </motion.div>

                    {!isZoomed && (
                        <div className="absolute bottom-28 md:bottom-10 left-1/2 -translate-x-1/2 w-fit max-w-[90vw] px-4 pointer-events-none z-[70]">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.08] rounded-xl p-3 md:p-4 flex flex-col items-center gap-1"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] text-white/30 uppercase italic">
                                        Frame
                                    </span>
                                    <span className="h-[1px] w-6 bg-white/10" />
                                    <span className="text-[11px] md:text-xs font-mono font-medium text-white/50">
                                        {String(currentIndex + 1).padStart(2, '0')} — {String(images.length).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="text-white/90 text-sm md:text-lg font-light tracking-wide text-center leading-snug">
                                    {currentImage.caption}
                                </h3>
                            </motion.div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
