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
            values: ['Softskill', 'HardSkill', 'Tool', 'Method']},
        trim: true
    },
    level: {
        type: Number, 
        min: [1, 'Le niveau doit être au minimum 1'],
        max: [10, 'Le niveau doit être au maximum 100'],
        default: 5
    },
    status:{
        type: String,
        required: [true, 'Le type est requis'],
        enum: {
            values: ['En découverte','En apprentissage', 'Acquis']},
        trim: true
    },
icon: {
    type: String,
    trim: true,
    validate: {
        validator: function(v) {
            return /^https?:\/\/.+\..+/.test(v);
        },
        message: props => `${props.value} n'est pas une URL valide !`
    }
}
}, {
    timestamps: true
});



export default mongoose.models.Skill || mongoose.model('Skill', stackSchema);