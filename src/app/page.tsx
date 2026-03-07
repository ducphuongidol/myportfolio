import Hero from '@/components/Hero';
import TripList from '@/components/TripList';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      <Hero />
      <TripList />
    </main>
  );
}
