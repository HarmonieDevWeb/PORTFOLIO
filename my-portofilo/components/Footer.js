{/* FOOTER */}
import { Linkedin, Github, Send, ShieldUser} from "lucide-react";
import "../app/globals.css";
import Link from 'next/link'
export default function Footer() {

    
    return (
        <footer className="bg-primary text-center py-8 md:py-10 mt-12 border-t border-gray-300">
                <div className="mb-6 flex flex-col items-center gap-2">
                <span className="text-white font-bold text-3xl md:text-4xl lg:text-5xl tracking-wide">
                    HARMONIE CHEVREL
                </span>
                <span className="text-background text-lg md:text-xl lg:text-2xl italic">
                    Développeuse Fullstack
                </span>

            </div>
            
            <div className="flex justify-center space-x-6 md:space-x-8 mb-6">
                {/* GITHUB */}
                <a
                    href="https://github.com/HarmonieDevWeb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-background hover:scale-110 text-3xl md:text-4xl transition-all duration-300"
                    aria-label="Lien vers mon profil GitHub"
                >
                    <Github />
                </a>
                {/* LINKEDIN */}
                <a
                    href="https://fr.linkedin.com/in/harmonie-chevrel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-background hover:scale-110 text-3xl md:text-4xl transition-all duration-300"
                    aria-label="Lien vers mon profil LinkedIn"
                >
                        <Linkedin />
                </a>
                {/* EMAIL */}
                <a
                    href="#contact"
                    className="text-white hover:text-background hover:scale-110 text-3xl md:text-4xl transition-all duration-300"
                    aria-label="Lien vers la section contact"
                >
                    <Send />
                </a>
                <Link href="/dashboard"><ShieldUser className="right-5 top-2 text-white" /> </Link>
            </div>
            
            <p className="text-white/80 text-sm md:text-base">
                &copy; {new Date().getFullYear()} Harmonie Dev Web. Tous droits réservés.
            </p>
            
        </footer>
    );
}