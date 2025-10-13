import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

    if (!heroImage) {
        return null;
    }

    return (
        <section className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-white">Welcome to HomeSync</h1>
                <p className="mt-2 text-lg text-white/80">Your smart home, simplified.</p>
            </div>
        </section>
    );
}
