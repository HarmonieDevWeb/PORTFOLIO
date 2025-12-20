// Lancer avec : node scripts/seedAbout.js

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
// SCHÉMA MONGOOSE (CORRIGÉ)
// -------------------------------

const aboutSchema = new mongoose.Schema({
  location: {
    localisation: { type: String },
    remote: { type: Boolean, default: false },
    description: { type: String }
  },
  education: [
    {
      dateStart: { type: String, required: true }, // Format: "YYYY-MM"
      dateEnd: { type: String, required: true },   // Format: "YYYY-MM"
      title: { type: String, required: true },
      localisation: { type: String, required: true },
      type: {
        type: String,
        enum: ["diploma", "certif"],
        required: true
      }
    }
  ],
  experience: [
    {
      dateStart: { type: String, required: true }, // Format: "YYYY-MM"
      dateEnd: { type: String, required: true },   // Format: "YYYY-MM"
      localisation: { type: String, required: true },
      title: { type: String, required: true }
    }
  ],
  languages: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["Débutant", "Scolaire", "Intermédiaire", "Maîtrise", "Bilingue"],
        required: true
      }
    }
  ],
  others: [
    {
      label: { type: String, required: true },
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const About = mongoose.model('About', aboutSchema);

// -------------------------------
// DONNÉES À INSÉRER (CORRIGÉES)
// -------------------------------

const aboutData = {
  location: {
    localisation: "Le Mans (72), France",
    remote: false,
    description: "je suis ouverte à des opportunités de collaboration à distance ou en présentiel dans la région."
  },
  education: [
    // Diplômes
    {
      dateStart: "2025-04",
      dateEnd: "2025-11",
      title: "Développeur Web et Web Mobile",
      localisation: "O'Clock (Formation en ligne)",
      type: "diploma"
    },
    {
      dateStart: "2008-09",
      dateEnd: "2010-06",
      title: "BTS Assistant de Gestion PME-PMI",
      localisation: "Le Mans",
      type: "diploma"
    },
    {
      dateStart: "200-09",
      dateEnd: "2008-06",
      title: "BAC STG Mercatique",
      localisation: "Le Mans",
      type: "diploma"
    },
    // Certifications
    {
      dateStart: "2023-02",
      dateEnd: "2023-03",
      title: "Marketing Digital",
      localisation: "AFDE",
      type: "certif"
    },
    {
      dateStart: "2025-10",
      dateEnd: "2025-11",
      title: "MOOC Cybersécurité",
      localisation: "ANSSI",
      type: "certif"
    }
  ],

  experience: [
        {
      dateStart: "2016-09",
      dateEnd: "2024-12",
      title: "Serveuse - Bar Brasserie",
      localisation: "Le Mans"
    },
    {
      dateStart: "2022-01",
      dateEnd: "2024-01",
      title: "Streameuse - Twitch",
      localisation: "En ligne"
    },
        {
      dateStart: "2010-01",
      dateEnd: "2014-02",
      title: "Serveuse - PUB Brasserie",
      localisation: "Saint Flour"
    },
    {
      dateStart: "2010-02",
      dateEnd: "2010-03",
      title: "Stage Assistante de Gestion",
      localisation: "BTP - SARL Privat"
    }
  ],
  
  languages: [
    {
      name: "Français",
      level: "Bilingue"
    },
    {
      name: "Anglais",
      level: "Intermédiaire"
    }
  ],
  
  others: [
    {
      label: "Passion & Tech",
      title: "Gaming",
      content: "Évasion créative et animation de communauté sur Twitch à mes heures perdues."
    },
    {
      label: "Sport & Valeurs",
      title: "Athlétisme",
      content: "15 ans de pratique intensive au service du dépassement de soi et de la discipline."
    },
    {
      label: "Vie Personnelle",
      title: "Ma famille",
      content: "L'organisation et la rigueur au cœur de mon quotidien pour concilier vie de famille et projets professionnels."
    }
  ],
  
  updatedAt: new Date()
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
    
    // Connexion à MongoDB avec options pour éviter les caches
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connecté à MongoDB Atlas");

    // 🔥 NETTOYAGE BRUTAL - Suppression de la collection complète
    console.log("🔥 Suppression TOTALE de la collection About...");
    try {
      await About.collection.drop();
      console.log("✅ Collection About supprimée");
    } catch (error) {
      if (error.code === 26) {
        console.log("ℹ️  Collection About n'existait pas (normal au premier lancement)");
      } else {
        throw error;
      }
    }

    // Attendre un peu pour que MongoDB synchronise
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérification finale
    const count = await About.countDocuments();
    if (count > 0) {
      throw new Error(`❌ Erreur: ${count} document(s) persistent encore après suppression !`);
    }
    console.log("✅ Collection complètement vide");

    // Insertion des nouvelles données
    console.log("💾 Insertion des nouvelles données...");

    const about = await About.create(aboutData);
    console.log("   ✔ 1 profil 'About' inséré");
    console.log(`   📍 Localisation: ${about.location.localisation}`);
    console.log(`   📍 Télétravail: ${about.location.remote ? 'Oui' : 'Non'}`);
    console.log(`   🎓 Formations: ${about.education.length} entrées`);
    console.log(`   💼 Expériences: ${about.experience.length} entrées`);
    console.log(`   🌍 Langues: ${about.languages.length} entrées`);
    console.log(`   ✨ Autres: ${about.others.length} entrées`);

    console.log("\n🎉 Base de données seedée avec succès !");
    console.log(`📋 ID du document: ${about._id}`);
    
    // Vérification finale
    const finalCount = await About.countDocuments();
    console.log(`📊 Nombre total de documents About: ${finalCount}`);
    
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error.message);
    
    // Affichage détaillé des erreurs de validation
    if (error.name === 'ValidationError') {
      console.error("\n🔍 Détails de l'erreur de validation:");
      Object.keys(error.errors).forEach(key => {
        console.error(`   - ${key}: ${error.errors[key].message}`);
      });
    } else {
      console.error(error);
    }
    
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