import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

// GET USER DATA
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const firstname = searchParams.get('firstname');
    const lastname = searchParams.get('lastname');
    const username = searchParams.get('username');
  
    let query = {};

    if (firstname) {
      query.firstname = firstname;
    }
    
    if (lastname) {
      query.lastname = lastname;
    }

    if (username) {
      query.username = username;
    }
    
    // Si aucun paramètre, récupérer le premier utilisateur admin
    if (Object.keys(query).length === 0) {
      query.role = 'admin';
    }
    
    const user = await User.findOne(query);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Structure de données avec les informations de l'utilisateur
    return NextResponse.json({ 
      success: true, 
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        present: user.present,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erreur GET /api/user:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}