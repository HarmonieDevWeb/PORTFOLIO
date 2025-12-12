import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du projet est requis'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true
  },
  stack: [{
    type: String,
    required: true
  }],
  created_at: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Terminé', 'En cours', 'À venir'],
    default: 'En cours'
  },
  status: {
    type: String,
    required: true,
    enum: ['Public', 'Privé', 'Secret'],
    default: 'Privé'
  },
  link: {
    type: String,
    default: ''
  },
  linkGitHub: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  visibility: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
projectSchema.index({ level: 1, order: 1 });
projectSchema.index({ status: 1 });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);