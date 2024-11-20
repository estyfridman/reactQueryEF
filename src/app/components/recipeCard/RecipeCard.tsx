"use client";

import { Recipe } from '@/types/types';
import styles from './RecipeCard.module.css';
import { UseMutationResult } from '@tanstack/react-query';

export type RecipeCardProps = {
    recipe: Recipe;
    onDelete: UseMutationResult<boolean, Error, string, { previousRecipes: unknown;}>;
    onUpdate: (recipe: Recipe) => void;
  };

export default function RecipeCard({ recipe, onDelete, onUpdate }: RecipeCardProps) {


    return (
        <div className={styles.container}>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className={styles.image}
          />
          <div className={styles.content}>
            <div className={styles.headerContent}>
              <h2 className={styles.name}>{recipe.name}</h2>
            </div>
            <p className={styles.category}>
              {Array.isArray(recipe.category) 
                ? recipe.category.join(', ') 
                : recipe.category}
            </p>	        
            <p className={styles.description}>{recipe.shortDescription}</p>
            <button className={styles.readMore} >Read more</button>
            <button onClick={()=>onDelete} className={styles.readMore}>delete</button>
            <button onClick={()=>onUpdate(recipe)} className={styles.readMore}>Edit</button>

          </div>
        </div>
      );
}