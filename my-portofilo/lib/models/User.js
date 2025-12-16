import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
    trim: true,
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis']
  },
  firstname: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'user']
  },
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

// Méthode pour obtenir le nom complet
UserSchema.virtual('fullname').get(function() {
  return `${this.firstname} ${this.lastname}`;
});

export default mongoose.models.User || mongoose.model('User', UserSchema);