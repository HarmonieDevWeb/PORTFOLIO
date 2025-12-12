// Lancer avec : node scripts/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// -------------------------------
// 🔥 SCHEMAS
// -------------------------------

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    longDescription: String,
    technologies: [String],
    images: [{ url: String, alt: String }],
    thumbnail: String,
    githubUrl: String,
    liveUrl: String,
    category: String,
    featured: Boolean,
    status: String,
    startDate: Date,
    endDate: Date,
    order: Number,
    visibility: Boolean,
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
    description: String,
    order: Number,
    visibility: Boolean,
  },
  { timestamps: true }
);

const toolSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    proficiency: Number,
    icon: String,
    website: String,
    description: String,
    usedFor: [String],
    order: Number,
    visibility: Boolean,
  },
  { timestamps: true }
);

const methodSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
    icon: String,
    practices: [{ name: String, description: String }],
    benefits: [String],
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
    title: "SKILLFUSION",
    description: "Plateforme DIY & BRICO - Projet de soutenance Titre DWWM",
    longDescription: "Plateforme complète orientée bricolage et DIY, permettant la consultation, la création et le partage de projets entre utilisateurs.",
    technologies: ["Node.js", "Express", "SvelteKit", "PostgreSQL", "Sequelize"],
    thumbnail: "https://i.postimg.cc/5NgQ5ctD/Capture-d-ecran-du-2025-10-21-13-33-41.png",
    githubUrl: "",
    liveUrl: "",
    category: "web",
    featured: true,
    status: "terminé",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
    order: 1,
    visibility: true
  },

  {
    title: "PORTOFILO",
    description: "Mon site web personnel pour présenter mes compétences, projets et expériences.",
    longDescription: "Portfolio moderne développé avec Next.js, React et Tailwind, permettant la visualisation de mes projets, compétences et informations professionnelles.",
    technologies: ["React.js", "Next.js", "Tailwind"],
    thumbnail: "https://i.postimg.cc/L8h5znwv/Capture-d-ecran-du-2025-12-10-17-35-06.png",
    githubUrl: "https://github.com/HarmonieDevWeb/PORTOFILO/tree/Dev/my-portofilo",
    liveUrl: "",
    category: "web",
    featured: true,
    status: "en-cours",
    startDate: new Date("2025-12-01"),
    order: 2,
    visibility: true
  },

  {
    title: "Capsule Temporelle",
    description: "Application web pour créer et envoyer des capsules temporelles numériques.",
    longDescription: "Projet futur permettant aux utilisateurs d'envoyer un message dans le futur, avec stockage sécurisé et libération programmée.",
    technologies: [],
    thumbnail: "",
    githubUrl: "",
    liveUrl: "",
    category: "web",
    featured: false,
    status: "à-venir",
    startDate: new Date("2026-01-01"),
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
