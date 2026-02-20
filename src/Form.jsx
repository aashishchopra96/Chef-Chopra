import React, { useEffect, useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList"

const Form = () => {

  const [ingredient, setIngredient] = useState(["all the main spices", "pasta", "ground beef", "tomato paste"]);
  const [recipeShown, setRecipeShown] = useState(false)

  const handleSubmit = (formData) => {
    //e.preventDefault();
    //const formData = new FormData(e.currentTarget)
    const typedingridient = formData.get("ingredient")
    console.log(typedingridient);
    setIngredient(previngredients => [...previngredients, typedingridient])
    console.log(ingredient);
  }
  const recipeList=()=>{
    setRecipeShown(prev => !prev)
  }
  return (
    <div>
      <main>
        <form
          //onSubmit={handleSubmit} 
          action={handleSubmit}
          className="add-ingredient-form">
          <input
            name="ingredient"
            placeholder="e.g. oregano"
            type="text"
          />
          <button>Add ingredient</button>
        </form>
        {ingredient.length > 0 && <IngredientsList ingredient={ingredient} recipeList={recipeList}/>}
        {recipeShown && <ClaudeRecipe/>}

      </main>
    </div>
  );
};

export default Form;
