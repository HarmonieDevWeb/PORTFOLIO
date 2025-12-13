import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Veuillez définir MONGODB_URI dans votre fichier .env.local"
  );
}

/**
 * Mise en cache globale pour éviter plusieurs connexions
 * lors du hot reload en développement
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  // Si déjà connecté, retourner la connexion existante
  if (cached.conn) {
    console.log("✅ MongoDB: Utilisation connexion existante");
    return cached.conn;
  }

  // Si pas de promesse en cours, créer une nouvelle connexion
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Désactive le buffering des commandes
    };

    console.log("🔌 MongoDB: Nouvelle connexion...");
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB: Connecté avec succès");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB: Erreur de connexion", error);
    throw error;
  }

  return cached.conn;
}