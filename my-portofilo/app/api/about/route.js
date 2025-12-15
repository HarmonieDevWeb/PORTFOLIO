/* https://mongoosejs.com/docs/nextjs.html */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/lib/models/About';

// GET ABOUT
export async function GET(request) {
  try {
    await connectDB();
    
    // Récupérer les données About (un seul document normalement)
    const about = await About.findOne();
    
    if (!about) {
      return NextResponse.json(
        { success: false, error: 'Aucune donnée About trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      ...about.toObject()
    });
  } catch (error) {
    console.error('Erreur GET /api/about:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}