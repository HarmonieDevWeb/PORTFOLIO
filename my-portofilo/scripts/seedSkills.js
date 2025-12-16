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


const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['HardSkill', 'Softskill', 'Tool', 'Method']
  },
  level: { type: Number, min: 0, max: 10 },
  status: { 
    type: String,
    enum: ['Acquis', 'En apprentissage', 'À venir']
  },
  icon: String
}, { timestamps: true });


// Modèle
const Skill = mongoose.model('Skill', skillSchema);

// -------------------------------
// DONNÉES À INSÉRER
// -------------------------------

const skillsData = [
  // HARDSKILLS
  { name: "HTML5 / CSS3", category: "HardSkill", level: 9, status: "Acquis", icon: "Code2" },
  { name: "JavaScript (ES6+)", category: "HardSkill", level: 7, status: "Acquis", icon: "FileCode" },
  { name: "Svelte / SvelteKit", category: "HardSkill", level: 7, status: "Acquis", icon: "Zap" },
  { name: "CMS PocketBase", category: "HardSkill", level: 7, status: "Acquis", icon: "Database" },
  { name: "Node.js", category: "HardSkill", level: 7, status: "Acquis", icon: "Server" },
  { name: "Express.js", category: "HardSkill", level: 7, status: "Acquis", icon: "Route" },
  { name: "APIs RESTful", category: "HardSkill", level: 7, status: "Acquis", icon: "Network" },
  { name: "PostgreSQL", category: "HardSkill", level: 8, status: "Acquis", icon: "Database" },
  { name: "Sequelize", category: "HardSkill", level: 8, status: "Acquis", icon: "Layers" },
  { name: "React.js", category: "HardSkill", level: 4, status: "En apprentissage", icon: "Atom" },
  { name: "Next.js", category: "HardSkill", level: 4, status: "En apprentissage", icon: "Rocket" },
  { name: "Tailwind CSS", category: "HardSkill", level: 5, status: "En apprentissage", icon: "Palette" },
  { name: "MongoDB", category: "HardSkill", level: 6, status: "En apprentissage", icon: "Database" },

  // SOFTSKILLS
  { name: "Communication", category: "Softskill", level: 8, status: "Acquis", icon: "MessageCircle" },
  { name: "Travail d'équipe", category: "Softskill", level: 8, status: "Acquis", icon: "Users" },
  { name: "Résolution de problèmes", category: "Softskill", level: 7, status: "Acquis", icon: "Lightbulb" },
  { name: "Autonomie", category: "Softskill", level: 9, status: "Acquis", icon: "Target" },
  { name: "Gestion du temps", category: "Softskill", level: 9, status: "Acquis", icon: "Clock" },
  { name: "Adaptabilité", category: "Softskill", level: 8, status: "Acquis", icon: "RefreshCw" },
  { name: "Curiosité / Veille techno", category: "Softskill", level: 6, status: "Acquis", icon: "Eye" },
  { name: "Esprit critique", category: "Softskill", level: 9, status: "Acquis", icon: "Brain" },
  { name: "Créativité", category: "Softskill", level: 6, status: "Acquis", icon: "Palette" },
  { name: "Persévérance", category: "Softskill", level: 9, status: "Acquis", icon: "Flame" },

  // TOOLS
  { name: "Visual Studio Code", category: "Tool", level: 9, status: "Acquis", icon: "Code" },
  { name: "Git & GitHub", category: "Tool", level: 8, status: "Acquis", icon: "GitBranch" },
  { name: "Thunder Client", category: "Tool", level: 7, status: "Acquis", icon: "Zap" },
  { name: "Jest", category: "Tool", level: 6, status: "En apprentissage", icon: "TestTube" },
  { name: "Docker", category: "Tool", level: 3, status: "En apprentissage", icon: "Container" },
  { name: "EmailJS", category: "Tool", level: 7, status: "Acquis", icon: "Mail" },
  { name: "Vercel", category: "Tool", level: 7, status: "Acquis", icon: "View" },

  // METHODS
  { name: "Agile / Scrum", category: "Method", level: 7, status: "Acquis", icon: "Users" },
  { name: "Méthodologie MERISE", category: "Method", level: 6, status: "Acquis", icon: "Workflow" },
  { name: "Mobile First", category: "Method", level: 7, status: "Acquis", icon: "Smartphone" },
  { name: "A11Y", category: "Method", level: 6, status: "Acquis", icon: "Accessibility" },
  { name: "SEO", category: "Method", level: 6, status: "En apprentissage", icon: "Search" },
  { name: "RGPD", category: "Method", level: 5, status: "Acquis", icon: "Shield" },
  { name: "Cybersécurité", category: "Method", level: 4, status: "En apprentissage", icon: "Lock" },
  { name: "DRY", category: "Method", level: 7, status: "Acquis", icon: "Sparkles" }
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
      Skill.deleteMany({}),
    ]);
    console.log("✅ Données existantes supprimées");

    // Insertion des nouvelles données
    console.log("💾 Insertion des nouvelles données...");
    
    const skills = await Skill.insertMany(skillsData);
    console.log(`   ✓ ${skills.length} compétences insérées`);
    
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