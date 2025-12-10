        {/* PROJECTS */}
        import { FaAngleDoubleDown } from "react-icons/fa";

        export default function Projects() {
            return (
        <section id="projects" className="mb-16">
          <h3 className="text-3xl font-bold italic relative inline-block mb-5 mt-25">
            Mes Projets
            <span className="block h-1 w-20 bg-accent mt-2"></span>
          </h3>
                      <button
                          onClick={() => {
                              const aboutSection = document.getElementById('contact');
                              aboutSection.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-transparent border-none flex flex-col items-center animate-bounce">
                          <FaAngleDoubleDown className="mt-20 animate-bounce text-secondary text-4xl" />
                      </button>
        </section>

        );
    }