{/* https://mongoosejs.com/docs/nextjs.html */}


import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

// GET PROJECT
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const status = searchParams.get('status');
    
    let query = { visibility: true };
    
    if (level) {
      query.level = level;
    }
    
    if (status) {
      query.status = status;
    }
    
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: projects,
      count: projects.length 
    });
  } catch (error) {
    console.error('Erreur GET /api/projects:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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