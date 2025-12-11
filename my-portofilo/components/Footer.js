{/* FOOTER */ }

import { LuLinkedin } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "../app/globals.css";


export default function Footer() {


    return (
        <footer className="bg-primary text-center py-6 mt-12 border-t border-gray-300">
            <div className="mb-4 flex flex-col items-center gap-2">
                <span className="text-white font-semibold text-[clamp(1rem, 3vw, 2rem)]">HARMONIE CHEVREL</span>
                <span className="text-background text-[clamp(0.8rem,2vw,1.5rem)]">Développeuse Fullstack</span>
            </div>
            <div className="flex justify-center space-x-6 mb-4">
                {/* GITHUB */}
                <a
                    href="https://github.com/HarmonieDevWeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 text-3xl transition-colors"
                    aria-label="Lien vers mon profil GitHub"
                >
                    <FaGithub />
                </a>

                {/* LINKEDIN */}
                <a
                    href="https://fr.linkedin.com/in/harmonie-chevrel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 text-3xl transition-colors"
                    aria-label="Lien vers mon profil LinkedIn"
                >
                    <LuLinkedin />
                </a>

                {/* EMAIL */}
                <a
                    href="#contact"
                    className="text-white hover:text-gray-200 text-3xl transition-colors"
                    aria-label="Lien vers la section contact"
                >
                    <FiSend />
                </a>
            </div>
            <p className="text-white text-sm">
                &copy; {new Date().getFullYear()} Harmonie Dev Web. Tous droits réservés.
            </p>
        </footer>
    );
}