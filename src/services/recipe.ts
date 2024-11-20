'use client'

import http from "./http";
import { Recipe } from "@/types/types";

export const getAllRecipes = async (): Promise<Recipe[]> => {
    
    try {
        const response = await http.get("/recipes");
        const recipes = response.data;
        return recipes;
    } catch (error) {
        console.error("error in fetching data: ", error);
        throw error;
    }
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
    try {
        const response = await http.get(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipe with ID ${id}:`, error);
        throw error;
    }
};

export const getRecipeByCategory = async (category: string): Promise<Recipe[]> => {
    try {
        const response = await http.get(`/recipes/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipes for category ${category}:`, error);
        throw error;
    }
};

export const getRecipeByIds = async (ids: string[]): Promise<Recipe[]> => {
    try {
        const response = await http.post(`/recipes/ids`, {"ids": ids});
        return response.data;
    } catch (error) {
        console.error(`Error fetching recipes with IDs ${ids}:`, error);
        throw error;
    }
};

export const createRecipe = async (recipe: Omit<Recipe, '_id'>): Promise<Recipe> => {//+
    try {
        const response = await http.post("/recipes", recipe);
        return response.data;
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

export const deleteRecipe = async (id: string): Promise<boolean> => {
    try {
        const response = await http.delete(`/recipes/${id}`);
        return response.data; 
    } catch (error) {
        console.error("Error deleting recipe:", error);
        throw error;
    }
};

export const updateRecipe = async (recipe: Recipe): Promise<boolean> => {
    try {
        console.log(recipe);
        const response = await http.patch("/recipes", recipe);
        return response.data; 
    } catch (error) {
        console.error("Error patching recipe:", error);
        throw error;
    }
};
