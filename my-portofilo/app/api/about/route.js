import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/lib/models/About';

// GET ABOUT
export async function GET(request) {
  try {
    await connectDB();
    
    // Récupérer les données About avec un cache désactivé
    const about = await About.findOne().lean();
    
    if (!about) {
      return NextResponse.json(
        { success: false, error: 'Aucune donnée About trouvée' },
        { status: 404 }
      );
    }

    // Retourner les données avec un header no-cache
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

// POST ABOUT
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // Vérifier si un document About existe déjà
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return NextResponse.json(
        { success: false, error: 'Un profil About existe déjà. Utilisez PUT pour le modifier.' },
        { status: 400 }
      );
    }

    // Validation basique
    if (!body.location || !body.education) {
      return NextResponse.json(
        { success: false, error: 'Les champs location et education sont requis' },
        { status: 400 }
      );
    }

    const about = await About.create(body);
    
    return NextResponse.json(
      { success: true, data: about, message: 'Profil About créé avec succès' },
      { status: 201 }
    );
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

    // Trouver et mettre à jour le document About
    const about = await About.findOneAndUpdate(
      {}, // Trouve le premier document
      body,
      { 
        new: true, // Retourne le document mis à jour
        runValidators: true // Valide les données
      }
    );

    if (!about) {
      return NextResponse.json(
        { success: false, error: 'Aucun profil About trouvé' },
        { status: 404 }
      );
    }

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