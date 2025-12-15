import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Projects'; // ✅ Importer le MODÈLE, pas le schéma


// POST PROJECT
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    if (!body.name || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Le nom et la description sont requis' },
        { status: 400 }
      );
    }
    
    const project = await Project.create(body);
    
    return NextResponse.json(
      { success: true, data: project, message: 'Projet créé avec succès' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur POST /api/projects:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
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