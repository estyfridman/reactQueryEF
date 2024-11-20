export type Recipe = {
    _id?: string;                              
    name: string;           
    imageUrl: string; 
    category: string[];   
    ingredients: string[];  
    instructions: string;    
    shortDescription: string; 
};

export type Category={
    _id?: string;   
    name: string; 
}

export type User = {
    _id?: string;
    name: string;
    email: string;
    password: string;
}
       