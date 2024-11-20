"use client";

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import RecipeCard from '@/app/components/recipeCard/RecipeCard';
import { Recipe } from '@/types/types';
import styles from './RecipesList.module.css';
import Loading from '@/app/components/Loading';

export type ShowRecipesProps = {
  recipes: Recipe[],
  onDelete: any,
};

export default function RecipesList() {
  const queryClient = useQueryClient()
  const [isMutating, setIsMutating] = useState(false);

  return (
    <div >
    </div>
    //   {recipes.length> 0 ? recipes.map((recipe, index) => (
    //     <RecipeCard
    //       key={index}
    //       recipe={recipe}
    //       onDelete={onDelete}
    //     />
    //   )): <Loading/>}
    
  );
}