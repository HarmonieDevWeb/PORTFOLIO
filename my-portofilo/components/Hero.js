{/* HERO */ }
import { FaAngleDoubleDown, FaGithub } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function Hero() {

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

    const handleScrollToContact = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

      return (
        <section className="mt-3 flex flex-col items-center bg-background w-full text-center">
          <img
            src="images/badge-logo-peach.svg"
            alt="Logo"
            className="w-auto h-auto"
          />
          <h2 className="text-2xl font-bold mb-2">
            Harmonie Chevrel
          </h2>
          <p className="px-12 text-accent uppercase font-bold">
            Développeuse FullStack
          </p>
          <span className="text-text italic text-center max-w-xl mb-5">
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
              className="bg-secondary text-white px-10 font-bold h-12 w-40 flex items-center justify-center rounded-full hover:bg-opacity-0 transition"
            >
              <FaGithub className="mr-2 text-4xl" />
              GitHub
            </a>

            {/* CONTACT */}
            <button
              onClick={handleScrollToContact}
              aria-label="Faire défiler vers la section contact"
              className="border-2 border-primary px-10 h-12 w-40 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition"
            >
              <IoChatbubbleEllipsesSharp className="mr-2 text-2xl" />
              Contact
            </button>

          </div>

          <button
            onClick={handleScrollToAbout}
            className="bg-transparent border-none flex flex-col items-center mx-auto mt-5 cursor-pointer hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Faire défiler vers la section à propos"
          >
            <FaAngleDoubleDown className="text-secondary text-4xl animate-bounce" />
          </button>
        </section>

      );
    };
