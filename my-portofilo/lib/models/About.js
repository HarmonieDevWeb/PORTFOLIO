import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  location: {
    city: { type: String, default: "Le Mans" },
    region: { type: String, default: "Pays de la Loire" },
    country: { type: String, default: "France" },
    remote: { type: Boolean, default: true },
    description: { type: String }
  },
  education: [
    {
      year: { type: String, required: true },
      title: { type: String, required: true },
      institution: { type: String, required: true },
      type: {
        type: String,
        enum: ["diploma", "certification", "mooc"],
        required: true
      }
    }
  ],
  experience: [
    {
      period: { type: String, required: true },
      position: { type: String, required: true },
      type: {
        type: String,
        enum: ["job", "freelance", "internship"],
        default: "job"
      }
    }
  ],
  languages: [
    {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["native", "fluent", "intermediate", "beginner"],
        required: true
      }
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

const About = mongoose.model('About', aboutSchema);
export default About;
