import { FaAngleDoubleDown, FaGithub } from "react-icons/fa";
import { EyeClosed } from 'lucide-react';
import { TbWorldWww } from "react-icons/tb";



export default function Projects() {
    const projectsInfo = {
        Projects: [
            {
                name: "SKILLFUSION",
                content: "Plateforme DIY & BRICO - Projet Soutenance Titre DWWM",
                created_at:"Octobre 2025",
                level: "Terminé",
                status: "Privé",
                link: "",
                linkGitHub: "",
                image: "https://i.postimg.cc/5NgQ5ctD/Capture-d-ecran-du-2025-10-21-13-33-41.png"
            },
            {
                name: "PORTOFILO",
                content: "Mon site web personnel pour présenter mes compétences, projets et expériences en développement web.",
                created_at:"Décembre 2025",
                level: "En cours",
                status: "Public",
                link: "",
                linkGitHub: "https://github.com/HarmonieDevWeb/PORTOFILO/tree/Dev/my-portofilo",
                image: "https://i.postimg.cc/L8h5znwv/Capture-d-ecran-du-2025-12-10-17-35-06.png"
            },
            {
                name: "Capsule Temporelle",
                content: "Application web pour créer et envoyer des capsules temporelles numériques à soi-même ou à d'autres personnes.",
                created_at:"Prévu pour 2026",
                level: "À venir",
                status: "Secret",
                link: "",
                linkGitHub: "",
                image: ""
            }
        ]
    };

    const ProjectCard = ({ project }) => {
        const isSecret = project.status === "Secret";
        const isPublic = project.status === "Public";

        const statusProjects = {
            Public: "bg-accent text-white border-gray-700",
            Privé: "bg-accent text-white border-gray-700",
        };

        const levelProjects = {
            Terminé: "bg-primary text-white border-red-700",
            "En cours": "bg-primary text-white border-green-500",
            "À venir": "bg-gray-500 text-white border-gray-700"
        };


return (
            <div className="mb-4 relative flex flex-col p-6 border border-gray-300 rounded-lg shadow-md w-full bg-white">
                <div className="transition-all duration-300">
                    <div className={`relative max-h-80 overflow-hidden ${isSecret ? 'mb-30' : ''}`}>
                        <img
                            src={isSecret ? "/images/badge-logo-icon.svg" : (project.image || "/images/badge-logo-icon.svg")}
                            alt={isSecret ? "Image projet secret" : "Image du projet"}
                            className={`w-full object-cover mb-4 rounded h-48 md:h-64 lg:h-80 ${isSecret ? 'blur-lg' : ''}`}
                        />
                        {isSecret && (
                            <div className="absolute inset-1 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold bg-black/50 px-4 py-2 rounded">       <EyeClosed size={50}/> </span>
                            </div>
                        )}
                    </div>
                    {!isSecret && (
                        <>
                            <h1 className="text-1xl font-semibold mb-2 text-text ">{project.name}</h1>
                            <p className="text-text mb-2 h-40 md:h-50 lg:h-65">{project.content}</p>
                        </>
                    )}
                    <span className="text-sm text-gray-500">{project.created_at}</span>
                </div>

                {/* Badge Status - toujours visible */}
                <div className="inline-block mt-2">
                    <span className={`mr-2 px-2 py-1 text-sm font-bold rounded border ${levelProjects[project.level]}`}>
                        {project.level}
                    </span>
                    <span
                        className={`px-2 py-1 text-sm font-bold rounded border ${statusProjects[project.status]} `}
                        onClick={() => isSecret}
                        title={isSecret ? "Cacher" : ""}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Button si Public */}
                {isPublic && (
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mx-auto">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" bg-primary text-white  font-bold px-2 py-2 rounded-xl hover:bg-primary/80 transition flex items-center gap-2" 
                        >
                            Web Site <TbWorldWww className="text-4xl" />
                        </a>
                        <a
                            href={project.linkGitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" bg-primary text-white font-bold px-2 py-2 rounded-xl hover:bg-primary/80 transition flex items-center gap-2"
                        >
                           Github <FaGithub className="text-4xl" />
                        </a>
                    </div>
                )}

            </div>
        );
    };

    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">

            <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
                Mes Projets
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h2>
            <div className=" text-center mt-5 grid grid-cols-1 sm:grid-rows-2 lg:grid-rows-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    {projectsInfo.Projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
            <button
                onClick={handleScrollToContact}
                className="bg-transparent border-none flex flex-col items-center mx-auto mt-12 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                aria-label="Faire défiler vers la section contact"
            >
                <FaAngleDoubleDown className="text-secondary text-4xl animate-bounce" />
            </button>
        </section>
    );
}