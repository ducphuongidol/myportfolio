'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { TripImage } from '../data/trips';
import { useState, useEffect, useRef } from 'react';

interface TripGalleryProps {
    images: TripImage[];
    onImageClick: (index: number) => void;
}

// Predefined height patterns for visual variety (in pixels)
const heightPatterns = [
    [350, 280, 400],  // Column 1
    [300, 380, 320],  // Column 2
    [420, 260, 360],  // Column 3
];

// 3D Tilt Card Component with nested slide animation
interface TiltCardProps {
    children: React.ReactNode;
    height: number;
    index: number;
    img: TripImage;
    onClick: () => void;
}

function TiltCard({ children, height, index, img, onClick }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isTouch, setIsTouch] = useState(false);

    // Motion values for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring animation for smooth movement
    const springConfig = { damping: 20, stiffness: 300 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

    // Glare effect position
    const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'touch') {
            setIsTouch(true);
            x.set(0);
            y.set(0);
            return;
        }

        setIsTouch(false);
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -0.5 to 0.5
        const normalizedX = (e.clientX - centerX) / rect.width;
        const normalizedY = (e.clientY - centerY) / rect.height;

        x.set(normalizedX);
        y.set(normalizedY);
    };

    const handlePointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            key={`${img.src}-${index}`}
            className="relative overflow-hidden cursor-pointer group rounded-xl shadow-lg"
            style={{
                height: `${height}px`,
                perspective: 1000,
                transformStyle: 'preserve-3d',
                // Always pass the MotionValue to prevent Framer Motion crashes on type switch
                rotateX: rotateX,
                rotateY: rotateY,
            }}
            // Combined Horizontal Slide Animation
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{
                delay: (index % 6) * 0.08,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={onClick}
        >
            {children}

            {/* Dynamic glare effect - Desktop only */}
            {!isTouch && (
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useTransform(
                            [glareX, glareY],
                            ([gx, gy]) =>
                                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
                        ),
                    }}
                />
            )}
        </motion.div>
    );
}

export default function TripGallery({ images, onImageClick }: TripGalleryProps) {
    const [columns, setColumns] = useState(3);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Responsive column count
    useEffect(() => {
        setIsMounted(true);
        const updateColumns = () => {
            const width = window.innerWidth;
            if (width < 768) setColumns(1);
            else if (width < 1024) setColumns(2);
            else setColumns(3);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Return empty div on server to prevent hydration mismatch for dynamic columns
    if (!isMounted) return <div className="min-h-[500px]" />;

    // Distribute images into columns for masonry effect
    const getColumnImages = () => {
        const cols: { img: TripImage; index: number; height: number }[][] = Array.from(
            { length: columns },
            () => []
        );

        images.forEach((img, index) => {
            // Find the column with the least total height
            const columnHeights = cols.map(col =>
                col.reduce((sum, item) => sum + item.height, 0)
            );
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

            // Assign a height based on pattern or pseudo-random
            const patternIndex = cols[shortestColumn].length % 3;
            const height = columns === 1
                ? 300
                : heightPatterns[shortestColumn % 3][patternIndex];

            cols[shortestColumn].push({ img, index, height });
        });

        return cols;
    };

    const columnData = getColumnImages();

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-12 pb-24">
            <div className="flex gap-4">
                {columnData.map((column, colIndex) => (
                    <div key={colIndex} className="flex-1 flex flex-col gap-4">
                        {column.map(({ img, index, height }) => (
                            <TiltCard
                                key={`${img.src}-${index}`}
                                height={height}
                                index={index}
                                img={img}
                                onClick={() => onImageClick(index)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {/* Hover overlay with caption */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                                    <div className="p-6 w-full">
                                        <p className="text-white font-medium font-serif tracking-wide text-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            {img.caption}
                                        </p>
                                    </div>
                                </div>
                                {/* Subtle border glow on hover */}
                                <div className="absolute inset-0 rounded-xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
                            </TiltCard>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
