import { NextResponse } from 'next/server';
import { connectDatabase, getDocumentsByCategory } from '@/services/mongo';

export async function GET(request: Request, { params }: any) {
    try {
        const { category } = params;
        const client = await connectDatabase();
        const documents = await getDocumentsByCategory(client, 'recipes', category);
        return NextResponse.json(documents);
    } catch (error) {
        console.error('Error fetching documents by category:', error);
        return NextResponse.json({ message: 'Failed to fetch documents by category' }, { status: 500 });
    }
}
