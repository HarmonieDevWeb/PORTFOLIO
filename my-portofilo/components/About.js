{/* ABOUT */ }
import { FaAngleDoubleDown } from "react-icons/fa";


export default function About() {
    return (
        <section id="about" className="mb-16 px-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold italic relative inline-block mb-8 mt-20">
                À propos de moi
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h2>

            <div className="mt-4 p-2 rounded-lg shadow-md border-l-6 border-secondary">
                <h3 className="text-2xl font-semibold mb-2">Localisation</h3>
                <p className="text-lg pl-2 leading-7 text-gray-700 italic">
                    Basée au Mans (72), France, je suis ouverte à des opportunités de collaboration à distance ou en présentiel dans la région.
                </p>
            </div>

            <div className="mt-4 p-2 rounded-lg shadow-md border-l-6 border-secondary">
                <h3 className="text-2xl font-semibold mb-2">Formations</h3>
                <div className="text-lg leading-7 text-gray-700">
                    <h4 className="text-xl font-semibold mb-1">Parcours Académique :</h4>
                    <ul className="list-disc list-inside pl-3">
                        <li>2025 : Formation DWWM - O'Clock</li>
                        <li>2010 : BTS Ass. Gestion PME PMI</li>
                        <li>2008 : BAC STG Mercatique</li>
                    </ul>

                    <h4 className="text-xl font-semibold mb-1 mt-4">Certification :</h4>
                    <ul className="list-disc list-inside pl-3">
                        <li>2023 : Marketing Digital - AFDE</li>
                        <li>2025 : MOOC - Cybersécurité - ANSSI</li>
                    </ul>
                </div>

            </div>
                <div className="mt-4 p-2 rounded-lg shadow-md border-l-6 border-secondary">
                    <h3 className="text-xl font-semibold mb-1">Expérience Pro :</h3>
                    <ul className="list-disc list-inside pl-3">
                        <li>2010 - 2024 : Restauration (Serveuse)</li>
                        <li>2022 - 2025 : Streaming (auto entrepreneur)</li>
                    </ul>
                </div>

                <div className="mt-4 p-2 rounded-lg shadow-md border-l-6 border-secondary">
                    <h3 className="text-xl font-semibold mb-1">Langues :</h3>
                    <ul className="list-disc list-inside pl-3">
                        <li>Français : Langue maternelle</li>
                        <li>Anglais : Niveau intermédiaire</li>
                    </ul>
                </div>

            <button
                onClick={() => {
                    const aboutSection = document.getElementById('skills');
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border-none flex flex-col items-center mx-auto mt-5 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label="Faire défiler vers la section compétence"    >            
                <FaAngleDoubleDown className="mt-20 animate-bounce text-secondary text-4xl" />
            </button>

        </section>
    );
}
