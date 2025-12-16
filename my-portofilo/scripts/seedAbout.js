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

const aboutSchema = new mongoose.Schema({
  location: {
    city: String,
    region: String,
    country: String,
    remote: Boolean,
    description: String
  },
  education: [{
    year: String,
    title: String,
    institution: String,
    type: { type: String, enum: ['diploma', 'certification', 'mooc'] }
  }],
  experience: [{
    period: String,
    position: String,
    type: { type: String, enum: ['job', 'freelance', 'volunteer'] }
  }],
  languages: [{
    name: String,
    level: { type: String, enum: ['native', 'fluent', 'advanced', 'intermediate', 'beginner'] }
  }]
}, { timestamps: true });

// Modèles
const About = mongoose.model('About', aboutSchema);

// -------------------------------
// DONNÉES À INSÉRER
// -------------------------------

const aboutData = {
  location: {
    city: "Le Mans",
    region: "Pays de la Loire",
    country: "France",
    remote: true,
    description: "Basée au Mans (72), France, je suis ouverte à des opportunités de collaboration à distance ou en présentiel dans la région."
  },
  education: [
    {
      year: "2025",
      title: "Développeur Web et Web Mobile",
      institution: "O'Clock",
      type: "diploma"
    },
    {
      year: "2010",
      title: "BTS Assistant de Gestion PME-PMI",
      institution: "",
      type: "diploma"
    },
    {
      year: "2008",
      title: "BAC STG Mercatique",
      institution: "",
      type: "diploma"
    },
    {
      year: "2023",
      title: "Marketing Digital",
      institution: "AFDE",
      type: "certification"
    },
    {
      year: "2025",
      title: "MOOC Cybersécurité",
      institution: "ANSSI",
      type: "mooc"
    }
  ],
  experience: [
    {
      period: "2010 - 2024",
      position: "Serveuse",
      type: "job"
    },
    {
      period: "2022 - 2025",
      position: "Streaming",
      type: "freelance"
    }
  ],
  languages: [
    {
      name: "Français",
      level: "native"
    },
    {
      name: "Anglais",
      level: "intermediate"
    }
  ]
};

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
      About.deleteMany({})
    ]);
    console.log("✅ Données existantes supprimées");

    // Insertion des nouvelles données
    console.log("💾 Insertion des nouvelles données...");

    const about = await About.create(aboutData);
    console.log(`   ✓ 1 profil "About" inséré`);

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