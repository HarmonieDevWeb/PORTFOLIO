// Lancer avec : node scripts/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// -------------------------------
// 🔥 SCHEMAS
// -------------------------------

const projectSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    stack: [String],
    create: String,
    status: String,
    state: String,
    link: String,
    linkGitHub: String,
    image: String,
    order: Number,
    visibility: Boolean
  },
  { timestamps: true }
);

const skillSchema = new mongoose.Schema(
{
  name: String,
  category: String,
  level: Number,
  status: String
},
  { timestamps: true }
);



// -------------------------------
// MODELS (évite la recréation)
// -------------------------------
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

// -------------------------------
// DATA
// -------------------------------

const projectsData = [
  {
    name: "SKILLFUSION",
    content: "Plateforme DIY & BRICO - Projet de soutenance Titre DWWM",
    stack: ["Node.js", "Express", "SvelteKit", "PostgreSQL", "Sequelize"],
    create: "Septembre 2025",
    state: "Privé",
    status: "Terminé",
    link: "",
    linkGitHub: "",
    image: "https://i.postimg.cc/5NgQ5ctD/Capture-d-ecran-du-2025-10-21-13-33-41.png",
    order: 1,
    visibility: true
  },

  {
    name: "PORTOFILO",
    content: "Mon site web personnel pour présenter mes compétences, projets et expériences.",
    stack: ["React.js", "Next.js", "Tailwind"],
    create: "Décembre 2025",
    state: "Public",
    status: "En cours",
    link: "",
    linkGitHub: "https://github.com/HarmonieDevWeb/PORTOFILO/tree/Dev/my-portofilo",
    image: "https://i.postimg.cc/L8h5znwv/Capture-d-ecran-du-2025-12-10-17-35-06.png",
    order: 2,
    visibility: true
  },

  {
    name: "Capsule Temporelle",
    content: "Application web pour créer et envoyer des capsules temporelles numériques.",
    stack: [],
    create: "Début 2026",
    state: "Secret",
    status: "À venir",
    link: "",
    linkGitHub: "",
    image: "https://i.postimg.cc/YqqXP1qh/laterz-logo-complet.jpg",
    order: 3,
    visibility: true
  }
];


const skillsData = [
 // ======================
  // FRONTEND — ACQUIS
  // ======================
  {
    name: "HTML5 / CSS3",
    category: "Frontend",
    level: 95,
    status: "Acquis",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    level: 70,
    status: "Acquis",
  },
  {
    name: "Svelte / SvelteKit",
    category: "Frontend",
    level: 70,
    status: "Acquis",
  },
  {
    name: "CMS PocketBase",
    category: "Frontend",
    level: 70,
    status: "Acquis",
  },

  // ======================
  // BACKEND — ACQUIS
  // ======================
  {
    name: "Node.js",
    category: "Backend",
    level: 70,
    status: "Acquis",
  },
  {
    name: "Express.js",
    category: "Backend",
    level: 70,
    status: "Acquis",
  },
  {
    name: "APIs RESTful",
    category: "Backend",
    level: 70,
    status: "Acquis",
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    level: 80,
    status: "Acquis",
  },
  {
    name: "Sequelize",
    category: "Backend",
    level: 80,
    status: "Acquis",
  },

  // ======================
  // EN APPRENTISSAGE
  // ======================
  {
    name: "React.js",
    category: "Frontend",
    level: 40,
    status: "En apprentissage",
  },
  {
    name: "Next.js",
    category: "Frontend",
    level: 40,
    status: "En apprentissage",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    level: 50,
    status: "En apprentissage",
  },

  {
    name: "MongoDB",
    category: "Backend",
    level: 60,
    status: "En apprentissage",
  },

  // ======================
  // TOOLS
  // ======================
  {
    name: "Visual Studio Code",
    category: "Tool",
    level: 90,
    status: "Acquis",
  },
  {
    name: "Git & GitHub",
    category: "Tool",
    level: 85,
    status: "Acquis",
  },
  {
    name: "Thunder Client",
    category: "Tool",
    level: 75,
    status: "Acquis",
  },
  {
    name: "Jest",
    category: "Tool",
    level: 60,
    status: "En apprentissage",
  },
    {
    name: "Docker",
    category: "Tool",
    level: 30,
    status: "En apprentissage",
  },
  {
    name: "EmailJS",
    category: "Tool",
    level: 70,
    status: "Acquis",
  },

  // ======================
  // METHODS
  // ======================
  {
    name: "Agile / Scrum",
    category: "Method",
    level: 70,
    status: "Acquis",
  },
  {
    name: "Méthodologie MERISE",
    category: "Method",
    level: 65,
    status: "Acquis",
  },
  {
    name: "Mobile First",
    category: "Method",
    level: 75,
    status: "Acquis",
  },
  {
    name: "A11Y",
    category: "Method",
    level: 60,
    status: "Acquis",
  },
  {
    name: "SEO",
    category: "Method",
    level: 65,
    status: "En apprentissage",
  },
  {
    name: "RGPD",
    category: "Method",
    level: 55,
    status: "Acquis",
  },
  {
    name: "Cybersécurité",
    category: "Method",
    level: 45,
    status: "En apprentissage",
  },
  {
    name: "DRY / Clean Code",
    category: "Method",
    level: 70,
    status: "Acquis",
  },
 
];


// -------------------------------
// SEED FUNCTION
// -------------------------------

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI manquant dans .env.local");
    }

    console.log("🔌 Connexion MongoDB :", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connecté à MongoDB Atlas");

    // Nettoyage
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
    ]);

    console.log("🗑️ Données existantes supprimées");

    // Insertion
    const projects = await Project.insertMany(projectsData);
    const skills = await Skill.insertMany(skillsData);

    console.log(`💾 Ajouté :`);
    console.log(`   - ${projects.length} projets`);
    console.log(`   - ${skills.length} compétences`);


    console.log("🎉 Base seedée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Déconnexion MongoDB");
  }
}

// -------------------------------
// RUN
// -------------------------------
seedDatabase();
