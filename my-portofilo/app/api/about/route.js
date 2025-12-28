import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/lib/models/About';

// GET ABOUT
export async function GET(request) {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    
    if (!about) {
      // Retourner une structure vide si aucune donnée n'existe
      return NextResponse.json({
        presentation: "",
        location: { localisation: "", remote: false, description: "" },
        diplomas: [],
        certifs: [],
        expPros: [],
        languages: [],
        otherSections: []
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    return NextResponse.json(about, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Erreur GET /api/about:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST ABOUT - Créer OU Mettre à jour
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation des données
    const errors = validateAboutData(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Vérifier si un document existe déjà
    const existingAbout = await About.findOne();

    if (existingAbout) {
      // Mise à jour du document existant
      const updatedAbout = await About.findOneAndUpdate(
        {},
        body,
        { 
          new: true,
          runValidators: true
        }
      );

      return NextResponse.json(
        { success: true, data: updatedAbout, message: 'Profil About mis à jour avec succès' },
        { status: 200 }
      );
    } else {
      // Création d'un nouveau document
      const about = await About.create(body);
      
      return NextResponse.json(
        { success: true, data: about, message: 'Profil About créé avec succès' },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Erreur POST /api/about:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT ABOUT (mettre à jour)
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validation des données
    const errors = validateAboutData(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const about = await About.findOneAndUpdate(
      {},
      body,
      { 
        new: true,
        runValidators: true,
        upsert: true // Crée le document s'il n'existe pas
      }
    );

    return NextResponse.json(
      { success: true, data: about, message: 'Profil About mis à jour avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur PUT /api/about:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE ABOUT
export async function DELETE(request) {
  try {
    await connectDB();
    const about = await About.findOneAndDelete({});
    
    if (!about) {
      return NextResponse.json(
        { success: false, error: 'Aucun profil About trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Profil About supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur DELETE /api/about:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Fonction de validation
function validateAboutData(data) {
  const errors = [];

  // Validation de la présentation
  if (data.presentation && data.presentation.length > 1000) {
    errors.push('La présentation ne peut pas dépasser 1000 caractères');
  }

  // Validation de la localisation
  if (data.location) {
    if (!data.location.localisation || data.location.localisation.trim() === '') {
      errors.push('La localisation est requise');
    }
    if (typeof data.location.remote !== 'boolean') {
      errors.push('Le champ remote doit être un booléen');
    }
  } else {
    errors.push('Les informations de localisation sont requises');
  }

  // Validation des diplômes
  if (data.diplomas && Array.isArray(data.diplomas)) {
    data.diplomas.forEach((diploma, index) => {
      if (!diploma.title || diploma.title.trim() === '') {
        errors.push(`Diplôme ${index + 1}: Le titre est requis`);
      }
      if (!diploma.localisation || diploma.localisation.trim() === '') {
        errors.push(`Diplôme ${index + 1}: La localisation est requise`);
      }
      if (diploma.dateStart && diploma.dateEnd && diploma.dateStart > diploma.dateEnd) {
        errors.push(`Diplôme ${index + 1}: La date de début ne peut pas être après la date de fin`);
      }
    });
  }

  // Validation des certifications
  if (data.certifs && Array.isArray(data.certifs)) {
    data.certifs.forEach((certif, index) => {
      if (!certif.title || certif.title.trim() === '') {
        errors.push(`Certification ${index + 1}: Le titre est requis`);
      }
      if (certif.dateStart && certif.dateEnd && certif.dateStart > certif.dateEnd) {
        errors.push(`Certification ${index + 1}: La date de début ne peut pas être après la date de fin`);
      }
    });
  }

  // Validation des expériences professionnelles
  if (data.expPros && Array.isArray(data.expPros)) {
    data.expPros.forEach((exp, index) => {
      if (!exp.title || exp.title.trim() === '') {
        errors.push(`Expérience ${index + 1}: Le titre du poste est requis`);
      }
      if (!exp.localisation || exp.localisation.trim() === '') {
        errors.push(`Expérience ${index + 1}: La localisation est requise`);
      }
      if (exp.dateStart && exp.dateEnd && exp.dateStart > exp.dateEnd) {
        errors.push(`Expérience ${index + 1}: La date de début ne peut pas être après la date de fin`);
      }
    });
  }

  // Validation des langues
  if (data.languages && Array.isArray(data.languages)) {
    const validLevels = ['Débutant', 'Scolaire', 'Intermédiaire', 'Maîtrise', 'Bilingue'];
    data.languages.forEach((lang, index) => {
      if (!lang.name || lang.name.trim() === '') {
        errors.push(`Langue ${index + 1}: Le nom est requis`);
      }
      if (!validLevels.includes(lang.level)) {
        errors.push(`Langue ${index + 1}: Niveau invalide`);
      }
    });
  }

  // Validation des sections autres
  if (data.otherSections && Array.isArray(data.otherSections)) {
    data.otherSections.forEach((section, index) => {
      if (!section.label || section.label.trim() === '') {
        errors.push(`Section ${index + 1}: Le label est requis`);
      }
      if (section.items && Array.isArray(section.items)) {
        section.items.forEach((item, itemIndex) => {
          if (!item.title || item.title.trim() === '') {
            errors.push(`Section ${index + 1}, Élément ${itemIndex + 1}: Le titre est requis`);
          }
        });
      }
    });
  }

  return errors;
}