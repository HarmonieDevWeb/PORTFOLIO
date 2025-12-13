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
    levelLabel: String,
    experience: { years: Number, months: Number },
    icon: String,
    color: String,
    website : String,
    order: Number,
    visibility: Boolean,
  },
  { timestamps: true }
);

const toolSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    icon: String,
    website: String,
    usedFor: [String],
    order: Number,
    visibility: Boolean,
  },
  { timestamps: true }
);

const methodSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    icon: String,
    website: String,
    usedFor: [String],
    order: Number,
    visibility: Boolean,
  },
  { timestamps: true }
);

// -------------------------------
// 🔥 MODELS (évite la recréation)
// -------------------------------
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);
const Tool = mongoose.models.Tool || mongoose.model("Tool", toolSchema);
const Method = mongoose.models.Method || mongoose.model("Method", methodSchema);

// -------------------------------
// 🔥 DATA
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


const skillsData = [/* ... identique ... */];
const toolsData = [/* ... identique ... */];
const methodsData = [/* ... identique ... */];

// -------------------------------
// 🔥 SEED FUNCTION
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
      Tool.deleteMany({}),
      Method.deleteMany({}),
    ]);

    console.log("🗑️ Données existantes supprimées");

    // Insertion
    const projects = await Project.insertMany(projectsData);
    const skills = await Skill.insertMany(skillsData);
    const tools = await Tool.insertMany(toolsData);
    const methods = await Method.insertMany(methodsData);

    console.log(`💾 Ajouté :`);
    console.log(`   - ${projects.length} projets`);
    console.log(`   - ${skills.length} compétences`);
    console.log(`   - ${tools.length} outils`);
    console.log(`   - ${methods.length} méthodes`);

    console.log("🎉 Base seedée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Déconnexion MongoDB");
  }
}

// -------------------------------
// 🔥 RUN
// -------------------------------
seedDatabase();
