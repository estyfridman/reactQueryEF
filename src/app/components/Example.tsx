'use client'

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { getAllRecipes, deleteRecipe, createRecipe, updateRecipe } from '@/services/recipe'
import Loading from './Loading'
import RecipeCard from './recipeCard/RecipeCard'
import { useState } from 'react'
import { Recipe } from '@/types/types'

export default function Example() {

  const queryClient = useQueryClient()
  const { isLoading, isFetching, data } = useQuery({queryKey: ['recipes'], queryFn: getAllRecipes, staleTime: 10000 })
  const [isMutating, setIsMutating] = useState(false);

    const deleteMutation = useMutation({
      mutationFn: deleteRecipe,
      onMutate: async (id: string) => {
          setIsMutating(true);
          await queryClient.cancelQueries({ queryKey: ['recipes'] })
          const previousRecipes = queryClient.getQueryData(['recipes'])
          queryClient.setQueryData(['recipes'], (old: Recipe[]) => old.filter((recipe: Recipe) => recipe._id !== id))
          return { previousRecipes }
      },
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['recipes'] }); setIsMutating(false) },
  })

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onMutate: async (recipe: Recipe) => {
        setIsMutating(true);
        await queryClient.cancelQueries({ queryKey: ['recipes'] })
        const previousRecipes = queryClient.getQueryData(['recipes'])
        queryClient.setQueryData(['recipes'], (old: Recipe[]) => [...old, recipe])
        return { previousRecipes }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['recipes'] }); setIsMutating(false);
    },
})

const updateRecipeMutation = useMutation({
  mutationFn: ({ id, recipe }: { id: string, recipe: Recipe }) => updateRecipe(recipe),
  onMutate: async ({ id, recipe }: { id: string, recipe: Recipe }) => {
      setIsMutating(true);
      await queryClient.cancelQueries({ queryKey: ['recipes'] })
      const previousRecipes = queryClient.getQueryData(['recipes'])
      queryClient.setQueryData(['recipes'], (old: Recipe[]) => old.map((oldRecipe: any) => oldRecipe._id === id ? recipe : oldRecipe))
      return { previousRecipes }
  },
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] }); setIsMutating(false);
  },
})


    return (
      <div>
        { (isLoading || isFetching || isMutating ) && (<Loading/>)}
        <h1> All Recipes</h1>
        { data && (
          data.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe} 
              onDelete={deleteMutation}
              onUpdate={(recipe: Recipe) => updateRecipeMutation.mutate({ id: recipe._id!, recipe })}

            />
          )
        ))}
      </div>
    )
}