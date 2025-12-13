import mongoose from 'mongoose';

const stackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du projet est requis'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Le type est requis'],
        enum: {
            values: ['Frontend','Backend', 'Tool', 'Method']},
        trim: true
    },
    level: {
        type: Number, 
        min: [1, 'Le niveau doit être au minimum 1'],
        max: [100, 'Le niveau doit être au maximum 100'],
        default: 50
    },
    status:{
        type: String,
        required: [true, 'Le type est requis'],
        enum: {
            values: ['En découverte','En apprentissage', 'Acquis']},
        trim: true
    }
}, {
    timestamps: true
});

// Index pour améliorer les performances
stackSchema.index({ level: 1, order: 1 });
stackSchema.index({ status: 1 });

export default mongoose.models.Skill || mongoose.model('Skill', stackSchema);