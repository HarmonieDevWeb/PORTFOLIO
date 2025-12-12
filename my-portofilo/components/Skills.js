import { ChevronsDown } from "lucide-react";

export default function Skills() {
    const skillsData = {
        frontend: [
            { name: "HTML5 CSS3", level: 95, status: "mastered" },
            { name: "JavaScript (ES6+)", level: 70, status: "mastered" },
            { name: "Svelte SvelteKit", level: 70, status: "mastered" },
            { name: "CMS PocketBase", level: 70, status: "mastered" },

        ],
        backend: [
            { name: "Node.js", level: 70, status: "mastered" },
            { name: "Express.js", level: 70, status: "mastered" },
            { name: "APIs RESTful", level: 70, status: "mastered" },
            { name: "PostgreSQL", level: 80, status: "mastered" },
            { name: "Sequelize", level: 80, status: "mastered" },
        ],
        learning: [
            { name: "React.js", level: 40, status: "learning" },
            { name: "Next.js", level: 40, status: "learning" },
            { name: "Tailwind CSS", level: 50, status: "learning" },
            { name: "Docker", level: 30, status: "learning" },
            { name: "Mongo", level: 10, status: "discovering" }

        ]
    };

    const toolItems = [
        "Visual Studio Code",
        "Git & GitHub",
        "ThunderClient",
        "Déploiement",
        "Jest",
        "Agile / Scrum",
        "Méthodologie MERISE",
        "Mobile First",
        "A11Y",
        "SEO",
        "RGPD",
        "Cybersécurité",
        "DRY",
        "emailJS"
    ];

    const SkillBar = ({ name, level, status = "mastered" }) => {
        const statusConfig = {
            mastered: {
                gradient: "from-white via-secondary/30 to-secondary",
                badge: null
            },
            learning: {
                gradient: "from-white to-background",
                badge: { text: "En apprentissage", color: "bg-background text-primary border-gray-300" }
            },
            discovering: {
                gradient: "from-white to-primary",
                badge: { text: "En découverte", color: "bg-primary text-white border-black" }
            }
        };

        const config = statusConfig[status];

        return (
            <li className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <span className="text-base">{name}</span>
                        {config.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${config.badge.color} font-medium`}>
                                {config.badge.text}
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-500">{level}%</span>
                </div>
                <div
                    className="h-3 bg-gray-200 rounded-lg overflow-hidden shadow-sm"
                    role="progressbar"
                    aria-valuenow={level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`Niveau de compétence en ${name}`}
                >
                    <div
                        className={`h-full bg-linear-to-r ${config.gradient} transition-all duration-1000 ease-out rounded-lg`}
                        style={{ width: `${level}%` }}
                    />
                </div>
            </li>
        );
    };

    const handleScrollToProjects = () => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="skills" className="mb-16 px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
                Mes Compétences
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h2>

            {/* Frontend Skills */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-primary">FRONTEND</h3>
                <ul className="list-none space-y-3">
                    {skillsData.frontend.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} status={skill.status} />
                    ))}
                </ul>
            </div>

            {/* Backend Skills */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-primary">BACKEND</h3>
                <ul className="list-none space-y-3">
                    {skillsData.backend.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} status={skill.status} />
                    ))}
                </ul>
            </div>

            {/* Learning Skills */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-primary">EN COURS</h3>
                <ul className="list-none space-y-3">
                    {skillsData.learning.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} status={skill.status} />
                    ))}
                </ul>
            </div>

            {/* Tools & Methods */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-primary">OUTILS & MÉTHODES</h3>
                <div className="flex flex-wrap gap-3">
                    {toolItems.map((item) => (
                        <span
                            key={item}
                            className="px-4 py-2 bg-linear-to-r rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm font-medium text-gray-700 border border-gray-300"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scroll Button */}
            <button
                onClick={handleScrollToProjects}
                className="bg-transparent border-none flex flex-col items-center mx-auto mt-5 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Faire défiler vers la section projets"
            >
                <ChevronsDown className="text-secondary animate-bounce" size={50} />
            </button>
        </section>
    );
}