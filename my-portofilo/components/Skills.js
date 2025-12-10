{/* SKILLS */ }
import { FaAngleDoubleDown } from "react-icons/fa";
export default function Skills() {

      const ToolItems = [
        "Visual Studio Code",
        "Git & GitHub",
        "ThunderClient",
        "Deploiement",
        "Jest",
        "Agile / Scrum",
        "Méthodologie MERISE",
        "Mobile First",
        "Accessibilité RGAA",
        "RGPD"
  ];
    return (
        <section id="skills" className="mb-16">
            <h3 className="text-3xl font-bold italic relative inline-block mb-5 mt-25">
                Mes Compétences
                <span className="block h-1 w-20 bg-accent mt-2"></span>
            </h3>
            <h3 className="text-2xl font-semibold mb-2">FRONTEND</h3>
            <ul className="list-none list-inside pl-3 mb-4">
                <li>HTML5 CSS3</li>
                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>
                <li>JavaScript (ES6+)</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>
                <li>Svelte SvelteKit</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>React.js</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>Next.js</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>Tailwind CSS</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

            </ul>

            <h3 className="text-2xl font-semibold mb-2">BACKEND</h3>
            <ul className="list-none list-inside pl-3 mb-6">
                <li>Node.js</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>Express.js</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>APIs RESTful</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>PostgreSQL</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>Sequlize</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

                <li>MongoDB</li>
                                <span className="block h-3 w-70 bg-secondary border-r-30 border-gray-300 mb-2 ml-6 rounded-lg shadow-md"></span>

            </ul>
            <h4 className="text-2xl font-semibold mb-2">OUTILS & METHODES</h4>
            <ul className="list-none list-inside pl-3 mb-4 flex flex-wrap gap-5">
                    {ToolItems.map((item)=>(
                        <span key={item} className="block h-7 w-auto mb-2 ml-6 rounded-lg shadow-md align-center px-5 py-1 bg-background">{item}</span>
                    )
                    )} 
            </ul>

            <button
                onClick={() => {
                    const aboutSection = document.getElementById('projects');
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border-none flex flex-col items-center animate-bounce">
                <FaAngleDoubleDown className="mt-20 animate-bounce text-secondary text-4xl" />
            </button>
        </section>

    );
}