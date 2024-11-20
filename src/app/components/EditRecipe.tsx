import React, { useState } from 'react';

interface EditRecipeProps {
    data: {
        name: string;
        imageUrl: string; 
        category: string[];   
        ingredients: string[];  
        instructions: string;    
        shortDescription: string; 
        _id: string;
    },
    onDelete: (id: string) => void;
    onUpdate: (car: object) => void;
}

export default function EditRecipe({ data, onDelete, onUpdate }: EditRecipeProps){
    const [isEdit, setIsEdit] = useState(false);
    const toggleEdit = () => { setIsEdit(!isEdit) }
    
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const car = {
            name: (form[0] as HTMLInputElement).value,
            imageUrl: (form[1] as HTMLInputElement).value,
            category: (form[2] as HTMLInputElement).value,
            ingredients: (form[3] as HTMLInputElement).value,
            instructions: (form[4] as HTMLInputElement).value,
            shortDescription: (form[5] as HTMLInputElement).value,
            _id: data._id
        }
        onUpdate(car);
        setIsEdit(false);
    }

    
    const form = () => {
        return (
            <form onSubmit={handleUpdate} className='form-layout'>
                <input type="text" placeholder={data.name} defaultValue={data.name} />
                <input type="file" placeholder={data.imageUrl} defaultValue={data.imageUrl} />
                <input type="text" placeholder={data.category[0]} defaultValue={data.category} />
                <input type="text" placeholder={data.ingredients[0]} defaultValue={data.ingredients} />
                <input type="text" placeholder={data.instructions} defaultValue={data.instructions} />
                <input type="text" placeholder={data.shortDescription} defaultValue={data.shortDescription} />

                <div className='row'>
                    <button onClick={toggleEdit}>Cancel</button>
                    <button type="submit"><b>Update Car</b></button>
                </div>
            </form>
        );
    }
}