import { useState, useEffect } from 'react';
import Image from "next/image";
import { EyeClosed, Github, ChevronsDown, Globe, Loader, AlertCircle, Linkedin } from 'lucide-react';

// state du composant
export default function Projects() {
    const [projects, setProjects] = useState([]); // les données
    const [loading, setLoading] = useState(true); // le chargement
    const [error, setError] = useState(false); // les erreurs

    // Effet au chargement
    useEffect(() => {
        fetchProjects();
    }, []);

    // Récupération des projets

    const fetchProjects = async () => {
        try {
            // chargement et reset erreurs
            setLoading(true);
            setError(null);

            // API Next
            const res = await fetch("/api/projects");

            // Controle de la requete
            if (!res.ok) {
                throw new Error("Erreur lors du chargement des projets.");
            }

            // Conversion Json
            const data = await res.json();

            // MAJ affichage projets
            setProjects(data.projects || []);
        } catch (err) {
            console.error("erreur:", err);
            setError(err.message);
        } finally {
            setLoading(false); // Annulation du chargement que ce soit succes ou error
        }
    };


    // COMPOSANT CARD PROJECT

    const ProjectCard = ({ project }) => {
        const isSecret = project.state === "Secret";
        const isPublic = project.state === "Public";

        const stateProjects = {
            Public: "bg-accent text-white border-gray-700",
            Privé: "bg-accent text-white border-gray-700",
            Secret: "bg-accent text-white border-gray-700"
        };

        const statusProjects = {
            Terminé: "bg-primary text-white border-green-700",
            "En cours": "bg-primary text-white border-orange-700",
            "À venir": "bg-gray-500 text-white border-blue-700"
        };


        const getProjectImage = (image) => {
            console.log("Image reçue:", image);
            if (!image) return "/images/badge-logo-icon.svg";
            if (/^https?:\/\//i.test(image)) return image;
            return `/images/${image}`;
        };


        return (
            <div className="mb-4 relative flex flex-col p-6 border border-gray-300 rounded-lg shadow-md w-full bg-white">
                <div className="transition-all duration-300">
                    <div className={`relative w-full h-60 overflow-hidden shadow-2xl ${isSecret ? 'mb-30' : ''}`}>
                        <Image
                            src={getProjectImage(project.image)}
                            alt={project.state === "Secret" ? "Image projet secret" : "Image du projet"}
                            fill
                            className={`${project.state === "Secret" ? "blur-lg mb-40" : ""} rounded object-cover`}
                        />
                        {isSecret && (
                            <div className="absolute inset-1 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold bg-black/50 px-4 py-2 rounded">
                                    <EyeClosed size={50} /> </span>
                            </div>
                        )}
                    </div>
                    {isSecret && (
                        <div className='mb-20 flex flex-col items-center text-center'>
                            <h1 className="text-1xl font-semibold mb-2 text-text">FUTUR PROJET</h1>
                            <p className="text-text mb-40">à découvrir prochainement sur</p>
                            <a
                                href="https://fr.linkedin.com/in/harmonie-chevrel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-accent text-3xl md:text-4xl transition-all duration-300 flex items-center gap-3 "
                                aria-label="Lien vers mon profil LinkedIn"
                            >
                                LinkedIn <Linkedin size={30}/>
                            </a>
                        </div>
                    )}
                    {!isSecret && (
                        <>
                            <h1 className="text-1xl font-semibold mb-2 text-text ">{project.name}</h1>
                            <p className="text-text mb-1 h-40 md:h-45 lg:h-50">{project.content}</p>
                        </>
                    )}
                    <span className="text-sm text-gray-500">{project.create}</span>
                </div>

                {/* Badge Status - toujours visible */}
                <div className="inline-block mt-2">
                    <span className={`mr-2 px-2 py-1 text-sm font-bold rounded border ${stateProjects[project.state]}`}>
                        {project.state}
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
                            className=" bg-primary text-white px-10 font-bold h-12 w-40 flex items-center justify-center rounded-full hover:bg-opacity-0 transition gap-2"
                        >
                            Site <Globe className="text-4xl" />
                        </a>
                        <a
                            href={project.linkGitHub}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-secondary text-white px-10 font-bold h-12 w-40 flex items-center justify-center rounded-full hover:bg-opacity-0 transition gap-2"
                        >
                            Github <Github className="text-4xl" />
                        </a>
                    </div>
                )}

            </div>
        );
    };

    // FONCTION SCROLL DOWN

    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // RENDU LOADING
    if (loading) {
        return (
            <section id="projects" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
                    Mes Projets
                    <span className="block h-1 w-20 bg-accent mt-2"></span>
                </h2>
                <div className="flex justify-center items-center min-h-[400px]">
                    {/* Animation Chargement*/}
                    <Loader className="animate-spin text-primary" size={48} />
                </div>
            </section>
        )
    }

    // RENDU SI ERROR
    if (error) {
        return (
            <section id="projects" className="mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
                    Mes Projets
                    <span className="block h-1 w-20 bg-accent mt-2"></span>
                </h2>
                <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
                    {/* Icône d'alerte */}
                    <AlertCircle className="text-red-500 mb-4" size={48} />

                    {/* Message d'erreur */}
                    <p className="text-red-500 text-lg mb-4">{error}</p>

                    {/* Bouton pour réessayer le chargement */}
                    <button
                        onClick={fetchProjects} // Rappelle la fonction de récupération
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-black transition"
                    >
                        Réessayer
                    </button>
                </div>
            </section>
        );
    }

    return (


        <section id="projects" className="mb-16 px-4 pt-20 md:(px-6, pt-25) lg:(px-8, pt-30) max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold italic relative inline-block mb-8 ">
                Mes Projets
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h2>

            {/* GRILLE DE PROJETS OU MESSAGE VIDE */}
            {projects.length === 0 ? (
                // Si aucun projet n'est disponible
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Aucun projet disponible pour le moment.</p>
                </div>
            ) : (
                // Sinon, affiche la grille de projets
                <div className="text-center mt-5 mb-5 grid grid-cols-1  gap-2 sm:gap-4 lg:gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project._id}  // _id de MongoDB comme clé unique
                                project={project}   // Passe toutes les données du projet
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* BOUTON DE SCROLL VERS CONTACT */}
            <button
                onClick={handleScrollToContact}
                className="bg-transparent border-none flex flex-col items-center mx-auto cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                aria-label="Faire défiler vers la section contact"
            >
                {/* Icône avec animation bounce */}
                <ChevronsDown className="text-secondary animate-bounce" size={50} />
            </button>
        </section>
    );
}