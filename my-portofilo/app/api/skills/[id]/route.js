import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/lib/models/Skills'; 

// GET - ONE SKILL
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const skill = await Skill.findById(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    console.log("📦 Projet récupéré:", skill); // ✅ Debug
    
    return NextResponse.json({ success: true, data: Skill });
  } catch (error) {
    console.error('❌ Erreur GET /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - UPDATE SKILL (remplacement complet)
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
    console.error('❌ Erreur PUT /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PATCH - UPDATE SKILL (modification partielle)
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const skill = await Skill.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true } // ✅ Ajout runValidators
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
      message: 'Projet modifié avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur PATCH /api/skills/[id]:', error);
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
    console.error('❌ Erreur DELETE /api/skills/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}