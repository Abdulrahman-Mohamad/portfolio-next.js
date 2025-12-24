import { myProjects } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useMemo } from "react";
import TitleHeader from "../components/TitleHeader";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const MyProject = () => {
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState("All");
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const tabs = ["All", "Css", "Java Script", "Type Script", "React","React Native", "Next", "Full Stack", "Other"];

    const filteredProjects = useMemo(() => {
        if (activeTab === "All") return myProjects;
        return myProjects.filter(project => {
            const buildWith = project.buildWith;
            if (!buildWith) return false;
            // Handle both string and array for robustness
            if (Array.isArray(buildWith)) {
                return buildWith.some(item => item.toLowerCase() === activeTab.toLowerCase());
            }
            return String(buildWith).toLowerCase().includes(activeTab.toLowerCase());
        });
    }, [activeTab]);

    const displayedProjects = useMemo(() => {
        if (isHomePage && !isExpanded && filteredProjects.length > 6) {
            return filteredProjects.slice(0, 6);
        }
        return filteredProjects;
    }, [filteredProjects, isHomePage, isExpanded]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsExpanded(false);
    };

    useGSAP(() => {
        // Refresh ScrollTrigger when filtered projects change to ensure correct layout
        ScrollTrigger.refresh();

        const cards = gsap.utils.toArray(".project-card");

        if (cards.length === 0) return;

        // Entrance animation
        gsap.fromTo(
            cards,
            {
                opacity: 0,
                scale: 0.9,
                y: 40,
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            }
        );

    }, { scope: containerRef, dependencies: [displayedProjects] });

    return (
        <section id="work" className="section-padding" ref={containerRef}>
            <TitleHeader
                title="My Selected Work"
                sub="My Career Overview"
            />

            <div className="flex justify-center items-center gap-4 flex-wrap mt-10 mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer ${activeTab === tab
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white-50 border-white/10 hover:border-white hover:text-white"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-8 md:flex-row pb-10 flex-wrap overflow-hidden mt-6">
                {displayedProjects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Project Image */}
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6">
                            <img
                                src={project.spotlight}
                                alt={project.title}
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex gap-2">
                                    {project.tags.map((tag) => (
                                        <div key={tag.id} className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center border border-white/10 p-1.5" title={tag.name}>
                                            <img src={tag.path} alt={tag.name} loading="lazy" className="w-full h-full object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-white-50 mb-6 line-clamp-3">
                                {project.desc}
                            </p>

                            {/* CTA Button */}
                            <Link
                                to={`/project/${project.id}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] backdrop-blur-md border border-white/10"
                            >
                                <span>View Project</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {isHomePage && filteredProjects.length > 6 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/10 backdrop-blur-md cursor-pointer"
                    >
                        {isExpanded ? "See Less" : "See More"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default MyProject;