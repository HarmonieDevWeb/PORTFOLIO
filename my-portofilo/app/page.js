"use client";
import "./globals.css";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Project from "@/components/Project";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div id="home" className="min-h-screen w-full">

      {/* MAIN */}
      <main className="w-full bg-background py-4">

        <div className="max-w-5xl mx-auto px-10 py-4">

          {/* HERO SECTION */}

          <Hero />



        </div>
      </main>

      {/* ARTICLE SECTION  */}
      <div className=" bg-white w-full py-16 px-4">

        <About />
        <Skills />
        <Project />
        <Contact />


      </div>


    </div>
  );
}
