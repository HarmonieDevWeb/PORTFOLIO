import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Veuillez définir MONGODB_URI dans votre fichier .env local");
}

/* 
 * Mise en cache pour éviter plusieurs connexions lors du hot reload
 */
let isConnected = null;

export default async function connectDB() {
  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState;

  console.log("💾 MongoDB connecté :", isConnected === 1 ? "OK" : "FAIL");
}
