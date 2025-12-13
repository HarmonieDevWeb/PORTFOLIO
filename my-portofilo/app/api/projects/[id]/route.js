import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Projects'; // ✅ Importer le MODÈLE, pas le schéma

// GET - ONE PROJECT
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const project = await Project.findById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    console.log("📦 Projet récupéré:", project); // ✅ Debug
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('❌ Erreur GET /api/projects/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - UPDATE PROJECT (remplacement complet)
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const project = await Project.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: project,
      message: 'Projet mis à jour avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur PUT /api/projects/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PATCH - UPDATE PROJECT (modification partielle)
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    
    const project = await Project.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true } // ✅ Ajout runValidators
    );
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Projet non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: project,
      message: 'Projet modifié avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur PATCH /api/projects/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - ONE PROJECT
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const project = await Project.findByIdAndDelete(params.id);
    
    if (!project) {
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
    console.error('❌ Erreur DELETE /api/projects/[id]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}