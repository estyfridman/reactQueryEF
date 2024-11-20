import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument, getAllDocuments, updateDocument } from '@/services/mongo';
import { Recipe } from '@/types/types';

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
        return NextResponse.json({ message: 'Failed to insert item' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const updatedRecipe: Recipe = {
        name: body.name,
        imageUrl: body.imageUrl,
        category: body.category,
        ingredients: body.ingredients,
        instructions: body.instructions,
        shortDescription: body.shortDescription,
    };
    if (typeof updatedRecipe._id === 'string' && updatedRecipe._id !== undefined) {
        const result = await updateDocument(client, 'recipes', updatedRecipe._id, updatedRecipe);
        return NextResponse.json(result);

    } else {
        return NextResponse.json('id not exist');
    }
}