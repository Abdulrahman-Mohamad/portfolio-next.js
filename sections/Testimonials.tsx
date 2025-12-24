import GlowCard from "../components/GlowCard";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";

export default function Testimonials() {
    return <>
        <section id="testimonials" className="flex-center section-padding overflow-hidden">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="What People Say About Me?"
                    sub="⭐️ Client feedback highlights"
                />
                <div className="lg:columns-3 md:columns-2 columns-1 mt-16 z-0">
                    {testimonials.map(({ imgPath, name, url, review }) => (
                        <GlowCard card={{ review }} key={name}>
                            <a href={url} target="_blank" className="flex items-center gap-3 relative pointer-events-auto">
                                <div className="rounded-full overflow-hidden">
                                    <img src={imgPath} alt={name} loading="lazy" className="w-16 h-16" />
                                </div>
                                <div>
                                    <p className="font-bold">{name}</p>
                                </div>
                            </a>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    </>
}