import "./globals.css";
import { FaAngleDoubleDown, FaGithub } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function Home() {
  return (
    <div id="home" className="min-h-screen w-full">

      {/* MAIN */}
      <main className="w-full bg-background py-4">

        <div className="max-w-5xl mx-auto px-10 py-4">

        {/* HERO SECTION */}
        <section className="mb-3 flex flex-col items-center bg-background w-full text-center">

          <img
            src="images/badge-logo-peach.svg"
            alt="Logo"
            className="w-auto"
          />

          <h2 className="text-3xl font-bold mb-4">
            Harmonie Chevrel
          </h2>

          <p className="px-12 text-accent uppercase font-bold">
            Développeuse FullStack
          </p>

          <span className="text-text italic text-center mt-4 max-w-xl">
            Animée par la curiosité et l’envie de comprendre l’envers du décor d’une page web,
            j’ai entamé ma reconversion dans le développement web en 2025.
            En constante évolution, je développe mes compétences à travers des projets personnels,
            avec l’ambition de créer des applications utiles et accessibles au plus grand nombre.
          </span>


          <div className="buttonCta flex flex-row justify-center gap-4 mt-6">

            {/* GITHUB */}
            <a
              href="https://github.com/HarmonieDevWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-white px-12 font-bold h-12 flex items-center justify-center rounded-full hover:bg-opacity-90 transition"
            >
              <FaGithub className="mr-2 text-2xl" />
              Mon GitHub
            </a>

            {/* CONTACT */}
            <a
              href="#contact"
              className="border-2 border-primary px-12 h-12 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition"
            >
              <IoChatbubbleEllipsesSharp className="mr-2 text-2xl" />
              Contact
            </a>

          </div>

        <button href="#about" className="bg-transparent border-none flex flex-col items-center mt-10 animate-bounce">
          <FaAngleDoubleDown className="mt-10 animate-bounce text-secondary text-4xl" />
          </button>
        </section>
</div>
      </main>

      {/* ARTICLE SECTION  */}
      <div className=" bg-white w-full py-16 px-4">

        {/* ABOUT */}
        <section id="about" className="mb-16">
          <h3 className="text-3xl font-bold italic relative inline-block mb-4">
            À propos de moi
            <span className="block h-1 w-20 bg-accent mt-2"></span>
          </h3>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">
            Mes Compétences
          </h3>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">
            Mes Projets
          </h3>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <h3 className="text-3xl font-bold mb-4">
            Me Contacter
          </h3>
        </section>

      </div>


    </div>
  );
}
