import { connectDatabase, getDocumentById, deleteDocument } from '@/services/mongo';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }
        const objectId = new ObjectId(id);
        const client = await connectDatabase();
        const document = await getDocumentById(client, 'recipes', objectId);
        if (!document) {
            return NextResponse.json({ message: 'Document not found' }, { status: 404 });
        }
        return NextResponse.json(document);
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json({ message: 'Failed to fetch document' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }

        const objectId = new ObjectId(id);
        const client = await connectDatabase();
        const result = await deleteDocument(client, 'recipes', objectId);
        
        if (result) {
            return NextResponse.json(result);
        } else {
            return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return NextResponse.json({ message: 'Failed to delete recipe' }, { status: 500 });
    }
}
