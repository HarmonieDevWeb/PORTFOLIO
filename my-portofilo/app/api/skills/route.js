{/* https://mongoosejs.com/docs/nextjs.html */}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/lib/models/Skills';

// GET SKILL
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
  
    let query = {};

    if (level) {
      query.level = parseInt(level);
    }
    
    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }
    
    const skills = await Skill.find(query).sort({ level: -1, createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      skills,
      count: skills.length 
    });
  } catch (error) {
    console.error('Erreur GET /api/skills', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - UPDATE SKILL
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const skill = await Skill.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: skill,
      message: 'Projet mis à jour avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur PUT /api/skills', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}


// DELETE - ONE SKILL
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const skill = await Skill.findByIdAndDelete(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: {},
      message: 'Projet supprimé avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur DELETE /api/skills', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
