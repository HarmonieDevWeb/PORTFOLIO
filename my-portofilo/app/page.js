import Header from '@/components/Header'
import "./globals.css";


  export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-16 ">

        <section id="introduction" className="mb-20 flex flex-col items-center">
          <img src="images/badge-logo-peach.svg" alt="Logo" className="h-50 w-50 justify-center"/>
          <h2 className="text-3xl font-bold mb-4">
            Harmonie Chevrel
          </h2>
          <p className="text-text px-12 mb-4 c-accent">
            Développeuse FullStack</p>
          <div className="buttonCta h-4">
          <button className="mt-6 px-6 py-2 bg-secondary text-white rounded hover:bg-secondary/80 transition">
            Mes Projets
          </button>
          <button className="mt-6 ml-4 px-6 py-2 border border-secondary text-secondary rounded hover:bg-secondary hover:text-white transition">
            Me Contacter
          </button>
          </div>
        </section>

        <section id="about" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">
            À propos de moi
          </h3>
        </section>


        <section id="competences" className="mb-16">
          <h3 className="text-3xl font-bold  mb-4">
            Mes Compétences
          </h3>
        </section>

        <section id="projets" className="mb-16">
          <h3 className="text-3xl font-bold mb-4">
            Mes Projets
          </h3>
        </section>

        <section id="contact">
          <h3 className="text-3xl font-bold  mb-4">
            Me Contacter
          </h3>
        </section>
      </main>
    </div>
  )
}