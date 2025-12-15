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
    status: String,
    icon: String
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
    name: "PORTFOLIO",
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
  // HARDSKILL
  // ======================
  {
    name: "HTML5 / CSS3",
    category: "HardSkill",
    level: 9,
    status: "Acquis",
    icon: "Code2"
  },
  {
    name: "JavaScript (ES6+)",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "FileCode"
  },
  {
    name: "Svelte / SvelteKit",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "Zap"
  },
  {
    name: "CMS PocketBase",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "Database"
  },
  {
    name: "Node.js",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "Server"
  },
  {
    name: "Express.js",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "Route"
  },
  {
    name: "APIs RESTful",
    category: "HardSkill",
    level: 7,
    status: "Acquis",
    icon: "Network"
  },
  {
    name: "PostgreSQL",
    category: "HardSkill",
    level: 8,
    status: "Acquis",
    icon: "Database"
  },
  {
    name: "Sequelize",
    category: "HardSkill",
    level: 8,
    status: "Acquis",
    icon: "Layers"
  },
  {
    name: "React.js",
    category: "HardSkill",
    level: 4,
    status: "En apprentissage",
    icon: "Atom"
  },
  {
    name: "Next.js",
    category: "HardSkill",
    level: 4,
    status: "En apprentissage",
    icon: "Rocket"
  },
  {
    name: "Tailwind CSS",
    category: "HardSkill",
    level: 5,
    status: "En apprentissage",
    icon: "Palette"
  },
  {
    name: "MongoDB",
    category: "HardSkill",
    level: 6,
    status: "En apprentissage",
    icon: "Database"
  },

  // ======================
  // SOFTSKILLS
  // ======================
  {
    name: "Communication",
    category: "Softskill",
    level: 8,
    status: "Acquis",
    icon: "MessageCircle"
  },
  {
    name: "Travail d'équipe",
    category: "Softskill",
    level: 8,
    status: "Acquis",
    icon: "Users"
  },
  {
    name: "Résolution de problèmes",
    category: "Softskill",
    level: 7,
    status: "Acquis",
    icon: "Lightbulb"
  },
  {
    name: "Autonomie",
    category: "Softskill",
    level: 9,
    status: "Acquis",
    icon: "Target"
  },
  {
    name: "Gestion du temps",
    category: "Softskill",
    level: 9,
    status: "Acquis",
    icon: "Clock"
  },
  {
    name: "Adaptabilité",
    category: "Softskill",
    level: 8,
    status: "Acquis",
    icon: "RefreshCw"
  },
  {
    name: "Curiosité / Veille techno",
    category: "Softskill",
    level: 6,
    status: "Acquis",
    icon: "Eye"
  },
  {
    name: "Esprit critique",
    category: "Softskill",
    level: 9,
    status: "Acquis",
    icon: "Brain"
  },
  {
    name: "Créativité",
    category: "Softskill",
    level: 6,
    status: "Acquis",
    icon: "Palette"
  },
  {
    name: "Persévérance",
    category: "Softskill",
    level: 9,
    status: "Acquis",
    icon: "Flame"
  },

  // ======================
  // TOOLS
  // ======================
  {
    name: "Visual Studio Code",
    category: "Tool",
    level: 9,
    status: "Acquis",
    icon: "Code"
  },
  {
    name: "Git & GitHub",
    category: "Tool",
    level: 8,
    status: "Acquis",
    icon: "GitBranch"
  },
  {
    name: "Thunder Client",
    category: "Tool",
    level: 7,
    status: "Acquis",
    icon: "Zap"
  },
  {
    name: "Jest",
    category: "Tool",
    level: 6,
    status: "En apprentissage",
    icon: "TestTube"
  },
  {
    name: "Docker",
    category: "Tool",
    level: 3,
    status: "En apprentissage",
    icon: "Container"
  },
  {
    name: "EmailJS",
    category: "Tool",
    level: 7,
    status: "Acquis",
    icon: "Mail"
  },
    {
    name: "Vercel",
    category: "Tool",
    level: 7,
    status: "Acquis",
    icon: "View"
  },

  // ======================
  // METHODS
  // ======================
  {
    name: "Agile / Scrum",
    category: "Method",
    level: 7,
    status: "Acquis",
    icon: "Users"
  },
  {
    name: "Méthodologie MERISE",
    category: "Method",
    level: 6,
    status: "Acquis",
    icon: "Workflow"
  },
  {
    name: "Mobile First",
    category: "Method",
    level: 7,
    status: "Acquis",
    icon: "Smartphone"
  },
  {
    name: "A11Y",
    category: "Method",
    level: 6,
    status: "Acquis",
    icon: "Accessibility"
  },
  {
    name: "SEO",
    category: "Method",
    level: 6,
    status: "En apprentissage",
    icon: "Search"
  },
  {
    name: "RGPD",
    category: "Method",
    level: 5,
    status: "Acquis",
    icon: "Shield"
  },
  {
    name: "Cybersécurité",
    category: "Method",
    level: 4,
    status: "En apprentissage",
    icon: "Lock"
  },
  {
    name: "DRY",
    category: "Method",
    level: 7,
    status: "Acquis",
    icon: "Sparkles"
  }
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
