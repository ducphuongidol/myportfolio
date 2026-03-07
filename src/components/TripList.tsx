'use client';

import { useState } from 'react';

import { trips } from '../data/trips';
import TripSection from './TripSection';

export default function TripList() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="w-full">
            {trips.map(trip => (
                <TripSection
                    key={trip.id}
                    trip={trip}
                    isExpanded={expandedId === trip.id}
                    onToggle={() => handleToggle(trip.id)}
                />
            ))}
        </div>
    );
}
