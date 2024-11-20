'use server'

import { MongoClient, ObjectId } from 'mongodb';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
   if (!client) {
       const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
       if (!dbConnectionString) {
           throw new Error('Database connection string is not defined');
       }
       client = new MongoClient(dbConnectionString);
       clientPromise = client.connect();
   }
   return clientPromise;
}

export async function insertDocument(client: any, collection: string, document: object) {
   const db = client.db('mini_project');
   const result = await db.collection(collection).insertOne(document);
   return result;
}

export async function deleteDocument(client: any, collection: string, id: ObjectId) {
    const db = client.db('mini_project');
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) }); 
    return result; 
}

export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('mini_project');
    const documents = await db.collection(collection).find().toArray();
    return documents;
} 

export async function getDocumentById(client: MongoClient, collectionName: string, id: ObjectId) {
    const collection = client.db('mini_project').collection(collectionName);
    return await collection.findOne({ _id: id });
}

export async function getDocumentsByIds(client: MongoClient, collectionName: string, ids: ObjectId[]) {
    const collection = client.db('mini_project').collection(collectionName);
    return await collection.find({ _id: { $in: ids } }).toArray();
}

export async function getDocumentsByCategory(client: MongoClient, collectionName: string, category: string) {
    const db = client.db('mini_project');
    const collection = db.collection(collectionName);
    const documents = await collection.find({ category: category }).toArray();
    return documents;
}

export async function getAllCategory(client: any, collection: string) {
    const db = client.db('mini_project');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}

export async function updateDocument(client: any, collection: string, id: string, document: object) {
    const db = client.db('mini_project');
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
}