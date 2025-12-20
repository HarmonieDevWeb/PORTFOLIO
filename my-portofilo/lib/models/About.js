import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  location: {
    localisation: { type: String },
    remote: { type: Boolean, default: false },
    description: { type: String },
  },
  education: [
    {
      // Utiliser directement le format YYYY-MM d'un input type="month"
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
      title: { type: String, required: true } // Changé de "type" à "title" pour clarté
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
  // Pour les sections dynamiques personnalisées (hobbies, centres d'intérêt, etc.)
  others: [
    {
      label: { type: String, required: true },  // Nom de la section (ex: "Hobbies")
      title: { type: String, required: true },  // Titre de l'élément
      content: { type: String, required: true } // Contenu/description
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const About = mongoose.model('About', aboutSchema);
export default About;