import "tailwindcss";
import "../app/globals.css";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Header() {
    return (
        <header className="py-4 shadow-md bg-[#334155] ">
            <div className="container mx-auto flex justify-between items-center">
                <img src="images/badge-logo-icon.svg" alt="Logo" className="h-10 w-10 ml-5"/>
                <GiHamburgerMenu className="text-white mr-5"/>
            </div>
        </header>
    );
}

