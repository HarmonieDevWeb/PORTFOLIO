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
    if (firstname) query.firstname = firstname;
    if (lastname) query.lastname = lastname;
    if (username) query.username = username;

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

// PUT - Mettre à jour la présentation de l'utilisateur
export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, present } = body;

    let query = {};
    
    // Si un username est fourni, l'utiliser, sinon prendre le premier admin
    if (username) {
      query.username = username;
    } else {
      query.role = 'admin';
    }

    const user = await User.findOneAndUpdate(
      query,
      { 
        present,
        updatedAt: Date.now()
      },
      { 
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Présentation mise à jour avec succès',
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
    console.error('Erreur PUT /api/user:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}