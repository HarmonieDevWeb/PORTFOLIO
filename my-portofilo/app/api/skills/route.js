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
    console.error('Erreur GET /api/skills:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
