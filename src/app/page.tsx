import { getCars, Car } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { CarCard } from "@/components/car-card";
import { HeroSection } from "@/components/hero-section";
import { FloatingSearch } from "@/components/floating-search";
import { GoogleReviews } from "@/components/google-reviews";
import { LocalBusinessSchema, WebsiteSchema, FAQSchema } from "@/components/seo-schemas";
import { getFaqs } from "@/lib/get-site-data";
import Link from "next/link";

const EXPLORE_TILES = [
    { icon: "beach_access", title: "Plages", desc: "Aghir, Sidi Mahrez, Ras Rmel — explorez les plus belles plages de l'île à votre rythme." },
    { icon: "store", title: "Médina & Souks", desc: "Houmt Souk et ses marchés traditionnels. Artisanat, épices et ambiance authentique." },
    { icon: "restaurant", title: "Gastronomie", desc: "Poissons frais, harissa, ojja — découvrez la cuisine de Djerba sans vous presser." },
    { icon: "temple_buddhist", title: "Patrimoine", desc: "La Ghriba, El Kantara, les villages berbères — l'histoire de l'île à portée de volant." },
];

export default async function Home() {
    const [cars, faqs] = await Promise.all([getCars(), getFaqs()]);
    const featuredCars = cars.slice(0, 6);
    const displayFaqs = faqs.slice(0, 8);

    return (
        <div className="flex flex-col">
            <HeroSection />
            <FloatingSearch />

            {/* Explore Djerba Tiles */}
            <section className="bg-white py-20 px-4 md:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>
                            Pourquoi louer une voiture à Djerba ?
                        </p>
                        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">
                            L&apos;île s&apos;explore en voiture
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {EXPLORE_TILES.map((tile) => (
                            <div key={tile.title} className="group rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="p-6" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--site-primary) 10%, white), white)' }}>
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: 'color-mix(in srgb, var(--site-primary) 18%, white)' }}>
                                        <span className="material-symbols-outlined text-3xl" style={{ color: 'var(--site-primary)' }}>{tile.icon}</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-lg text-gray-900 mb-2">{tile.title}</h3>
                                    <p className="font-body text-sm text-gray-600 leading-relaxed">{tile.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet */}
            <section className="py-24 px-4 md:px-12" style={{ backgroundColor: 'color-mix(in srgb, var(--site-primary) 4%, white)' }}>
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>
                                {siteConfig.content.home.fleetLabel}
                            </p>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">
                                {siteConfig.content.home.fleetTitle}
                            </h2>
                        </div>
                        <Link href="/nos-voitures" className="hidden md:flex items-center gap-2 font-bold text-sm hover:gap-4 transition-all duration-300" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.viewAll}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.map((car: Car) => (
                            <CarCard key={car.id} id={car.id} title={car.title} slug={car.slug} subtitle={car.subtitle} price3Days={car.price3Days} currency={car.currency} image={car.featured_image} category={car.category} seats={car.seats} doors={car.doors} transmission={car.transmission} fuel={car.fuel} caution={car.caution} freeCancellation={car.freeCancellation} />
                        ))}
                    </div>
                    <div className="text-center mt-10 md:hidden">
                        <Link href="/nos-voitures" className="inline-flex items-center gap-2 font-bold" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.viewAllMobile}
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* WhatsApp CTA Strip */}
            <section style={{ backgroundColor: 'var(--site-primary)' }} className="py-10 px-4">
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-white text-center md:text-left">
                        <p className="font-headline font-extrabold text-2xl">Réservez par WhatsApp en 2 minutes</p>
                        <p className="opacity-80 font-body text-sm mt-1">Livraison à votre hôtel ou à l&apos;aéroport Djerba-Zarzis — sans avance, sans carte bancaire.</p>
                    </div>
                    <a
                        href={`https://wa.me/${siteConfig.contact.phone.whatsapp}?text=Bonjour, je souhaite louer une voiture à Djerba`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform shrink-0"
                        style={{ color: 'var(--site-primary)' }}
                    >
                        <span className="material-symbols-outlined">chat</span>
                        WhatsApp
                    </a>
                </div>
            </section>

            {/* Trust badges horizontal */}
            <section className="bg-white py-16 px-4 md:px-12">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {siteConfig.content.trust.badges.map((badge) => (
                            <div key={badge.title} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'color-mix(in srgb, var(--site-primary) 12%, white)' }}>
                                    <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--site-primary)' }}>{badge.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-headline font-bold text-gray-900 mb-1">{badge.title}</h3>
                                    <p className="font-body text-sm text-gray-600">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <GoogleReviews />

            {/* FAQ */}
            <section className="bg-white py-20 px-4 md:px-12">
                <div className="max-w-screen-lg mx-auto">
                    <div className="text-center mb-12">
                        <p className="font-body text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--site-primary)' }}>
                            {siteConfig.content.home.faqLabel}
                        </p>
                        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-gray-900">
                            {siteConfig.content.home.faqTitle}
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {displayFaqs.map((faq, i) => (
                            <details key={i} className="group rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[var(--site-primary)] transition-colors">
                                <summary className="flex items-center justify-between p-5 cursor-pointer">
                                    <span className="font-bold text-gray-900 text-left pr-4">{faq.question}</span>
                                    <span className="material-symbols-outlined transition-transform group-open:rotate-180 shrink-0" style={{ color: 'var(--site-primary)' }}>expand_more</span>
                                </summary>
                                <div className="px-5 pb-5 text-gray-600 leading-relaxed font-body text-sm border-t border-gray-100">{faq.answer}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <LocalBusinessSchema />
            <WebsiteSchema />
            <FAQSchema faqs={displayFaqs} />
        </div>
    );
}
