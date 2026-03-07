'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TripStoryProps {
    story: string;
    isLight?: boolean;
}

export default function TripStory({ story, isLight = false }: TripStoryProps) {
    return (
        <motion.div
            className="max-w-3xl mx-auto py-16 px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.15
                    }
                }
            }}
        >
            <div className="prose prose-lg mx-auto">
                {story.split('\n\n').map((paragraph, index) => (
                    <motion.p
                        key={index}
                        className={cn(
                            "mb-6 leading-relaxed text-xl font-light font-serif",
                            isLight ? "text-stone-700" : "text-gray-300"
                        )}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </div>
        </motion.div>
    );
}
