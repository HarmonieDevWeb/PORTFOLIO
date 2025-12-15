{/* https://mongoosejs.com/docs/nextjs.html */}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Projects';

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
      projects,
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
