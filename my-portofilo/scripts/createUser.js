// scripts/createUser.js
import argon2 from 'argon2';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Configuration pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: resolve(__dirname, '..', '.env.local') });

// Connexion MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error);
    throw error;
  }
}

// Schéma User défini dans le script
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'user']
  },
  present: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createUser() {
  try {
    await connectDB();

    const username = 'HDevWeb';
    const password = 'CH0c0_l4t';
    const firstname = 'Harmonie';
    const lastname = 'Chevrel';
    const email = 'chevrel.h.pro@gmail.com';
    const role = 'admin';
    const present = "Animée par la curiosité et l'envie de comprendre l'envers du décor d'une page web, j'ai entamé ma reconversion dans le développement web en 2025. En constante évolution, je développe mes compétences à travers des projets personnels, avec l'ambition de créer des applications utiles et accessibles au plus grand nombre dans l'avenir.";

    // Hasher le mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1
    });

    // Vérifier si l'utilisateur existe déjà et le supprimer
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('⚠️  Utilisateur existant trouvé. Suppression en cours...');
      await User.deleteOne({ username });
      console.log('✅ Utilisateur existant supprimé');
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      username,
      password: hashedPassword,
      lastname,
      firstname,
      email,
      role,
      present
    });

    console.log('✅ Nouvel utilisateur créé avec succès !');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('ID:', user._id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

createUser();