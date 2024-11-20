"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createRecipe } from "@/services/recipe";
import styles from "./addRecipe.module.css";

const recipeSchema = z.object({
  recipe_name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  instructions: z.string().min(1, "Instructions are required"),
  shortDescription: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });
  const categoryData = ["Appetizers", "Main Courses", "Desserts", "Beverages"];

  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [ingredientError, setIngredientError] = useState<string | null>(null);

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
    setIngredientError(null); 
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    if (ingredients.length === 0 || ingredients.some((ingredient) => ingredient.trim() === "")) {
      setIngredientError("At least one valid ingredient is required.");
      return;
    }

    const newRecipe = {
      name: data.recipe_name,
      category: [data.category],
      imageUrl: data.imageUrl,
      ingredients,
      instructions: data.instructions,
      shortDescription: data.shortDescription || "",
    };

    try {
      const r:any = await createRecipe(newRecipe);
   
      let idd =r.result.insertedId
      const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "null");
      if (storedRecipes) {
        storedRecipes.documents.push({"_id":idd,...newRecipe});
        localStorage.setItem("recipes", JSON.stringify(storedRecipes));
      }
      setMessage("Recipe saved successfully!");
      reset();
      setIngredients([""]);
      setIngredientError(null); 
    } catch (error) {
      setMessage("Failed to save recipe. Please try again.");
    }
  };

  const handleFormSubmit = async () => {
    const isFormValid = await trigger();
    if (ingredients.length === 0 || ingredients.some((ingredient) => ingredient.trim() === "")) {
      setIngredientError("At least one valid ingredient is required.");
    }
    if (isFormValid && !ingredientError) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton} onClick={() => window.history.back()}>
        &#8592; Back
      </div>
      <h2 className={styles.title}>Add Recipe</h2>
      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className={styles.form}>
        <input
          className={`${styles.input} ${errors.recipe_name ? styles.errorInput : ""}`}
          placeholder="Meal name"
          {...register("recipe_name")}
        />
        {errors.recipe_name && <p className={styles.errorMessage}>{errors.recipe_name.message}</p>}


        <select
          className={`${styles.select} ${errors.category ? styles.errorInput : ""}`}
          {...register("category")}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && <p className={styles.errorMessage}>{errors.category.message}</p>}


        <input
          className={`${styles.input} ${errors.imageUrl ? styles.errorInput : ""}`}
          placeholder="Image URL"
          {...register("imageUrl")}
        />
        {errors.imageUrl && <p className={styles.errorMessage}>{errors.imageUrl.message}</p>}

        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientContainer}>
            <input
              className={`${styles.input} ${ingredient.trim() === "" && ingredientError ? styles.errorInput : ""}`}
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
          </div>
        ))}
        {ingredientError && <p className={styles.errorMessage}>{ingredientError}</p>}
        
        <button type="button" className={styles.addIngredientButton} onClick={addIngredient}>+</button>

        <textarea
          className={`${styles.textarea} ${errors.instructions ? styles.errorInput : ""}`}
          placeholder="Instructions"
          {...register("instructions")}
        ></textarea>
        {errors.instructions && <p className={styles.errorMessage}>{errors.instructions.message}</p>}

        <input
          className={styles.input}
          placeholder="Short Description"
          {...register("shortDescription")}
        />

        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export default AddRecipe;