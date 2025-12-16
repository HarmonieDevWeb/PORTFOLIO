// Lancer avec : node scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Configuration pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

// -------------------------------
// SCHÉMAS MONGOOSE
// -------------------------------

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  stack: [String],
  create: String,
  state: String,
  status: String,
  link: String,
  linkGitHub: String,
  image: String,
  order: Number,
  visibility: Boolean
}, { timestamps: true });



// Modèle
const Project = mongoose.model('Project', projectSchema);

// -------------------------------
// DONNÉES À INSÉRER
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

// -------------------------------
// FONCTION DE SEED
// -------------------------------

async function seedDatabase() {
  try {
    // Vérification de la variable d'environnement
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI manquant dans .env.local");
    }

    console.log("🔌 Connexion à MongoDB...");
    
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connecté à MongoDB Atlas");

    // Nettoyage des collections existantes
    console.log("🗑️  Suppression des données existantes...");
        await Promise.all([
      Project.deleteMany({}),
    ]);
    console.log("✅ Données existantes supprimées");

    // Insertion des nouvelles données
    console.log("💾 Insertion des nouvelles données...");
    
    const projects = await Project.insertMany(projectsData);
    console.log(`   ✓ ${projects.length} projets insérés`);
    
    console.log("\n🎉 Base de données seedée avec succès !");
    
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error.message);
    console.error(error);
    process.exit(1);
  } finally {
    // Déconnexion
    await mongoose.disconnect();
    console.log("👋 Déconnexion de MongoDB");
  }
}

// -------------------------------
// EXÉCUTION
// -------------------------------

seedDatabase();