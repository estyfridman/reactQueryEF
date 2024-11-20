import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument,getAllDocuments } from '@/services/mongo';

export async function GET() {
    try {
        const client = await connectDatabase();
        console.log('api/recipes/get method')
        const recipes = await getAllDocuments(client, 'recipes');
        return NextResponse.json(recipes);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json(); 
        const client = await connectDatabase();
        
        const result = await insertDocument(client, 'recipes', newItem);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to insert item'}, { status: 500 });
    }
}