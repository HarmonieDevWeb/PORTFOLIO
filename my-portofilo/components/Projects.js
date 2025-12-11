import { FaAngleDoubleDown, FaGithub } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";



export default function Projects() {
    const projectsInfo = {
        Projects: [
            {
                name: "SKILLFUSION",
                content: "Plateforme DIY & BRICO - Projet Soutenance Titre DWWM",
                Level: "Terminé",
                status: "Privé",
                link: "",
                linkGitHub: "",
                image: "https://i.postimg.cc/5NgQ5ctD/Capture-d-ecran-du-2025-10-21-13-33-41.png"
            },
            {
                name: "Portfolio Personnel",
                content: "Mon site web personnel pour présenter mes compétences, projets et expériences en développement web.",
                Level: "En cours",
                status: "Public",
                link: "",
                linkGitHub: "https://github.com/HarmonieDevWeb/PORTOFILO/tree/Dev/my-portofilo",
                image: "https://i.postimg.cc/L8h5znwv/Capture-d-ecran-du-2025-12-10-17-35-06.png"
            },
            {
                name: "Capsule Temporelle",
                content: "Application web pour créer et envoyer des capsules temporelles numériques à soi-même ou à d'autres personnes.",
                Level: "À venir",
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
            Secret: "bg-secondary text-white border-gray-700"
        };

        const levelProjects = {
            Terminé: "bg-primary text-white border-red-700",
            "En cours": "bg-primary text-white border-green-500",
            "À venir": "bg-gray-500 text-white border-gray-700"
        };

        const linkProject = {
            link: project.link,
            linkGitHub: project.linkGitHub
        };

        return (
            <div className="mb-4 relative flex flex-col p-6 border border-gray-300 rounded-lg shadow-md w-full bg-white">
                <div className={`${isSecret ? 'blur-sm select-none' : ''} transition-all duration-300`}>
                    <img
                        src={project.image || "/images/badge-logo-icon.svg"}
                        alt={project.name}
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h4 className="text-xl font-semibold mb-2 text-text">{project.name}</h4>
                    <p className="text-text mb-2">{project.content}</p>
                    <div className="flex space-x-2">
                    </div>
                </div>

                {/* Badge Status - toujours visible */}
                <div className={`${isSecret ? 'absolute top-0 right-0' : 'inline-block mt-2'}`}>
                    <span className={`mr-2 px-2 py-1 text-sm font-medium rounded border ${levelProjects[project.Level]}`}>
                        {project.Level}
                    </span>
                    <span
                        className={`px-2 py-1 text-sm font-medium rounded border ${statusProjects[project.status]} ${isSecret ? 'cursor-pointer hover:opacity-20' : ''}`}
                        onClick={() => isSecret}
                        title={isSecret ? "Cacher" : ""}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Button si Public */}
                {isPublic && (
                    <div className="mt-4 flex space-x-4 justify-center-safe">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" bg-primary text-white px-2 py-2 rounded-xl hover:bg-primary/80 transition"
                        >
                            <TbWorldWww className="text-4xl" />
                        </a>
                        <a
                            href={project.linkGitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" bg-primary text-white px-2 py-2 rounded-xl hover:bg-primary/80 transition"
                        >
                            <FaGithub className="text-4xl" />
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
        <section id="projects" className="mb-16 px-4 max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
                Mes Projets
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h2>
            <div className="max-w-4xl mx-auto text-center mt-5">
                <div className="space-y-8">
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