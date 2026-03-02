import React, { useEffect, useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList"
import {getRecipeFromMistral} from "./ai"

const Form = () => {

  const [ingredient, setIngredient] = useState([]);
  const [recipe, setRecipe] = useState("")

  const handleSubmit = (formData) => {
    //e.preventDefault();
    //const formData = new FormData(e.currentTarget)
    const typedingridient = formData.get("ingredient")
    console.log(typedingridient);
    setIngredient(previngredients => [...previngredients, typedingridient])
    console.log(ingredient);
  }
  
  async function getRecipe(){
    // console.log("am i clicd");
    const recipeMarkdown = await getRecipeFromMistral(ingredient)
    console.log(recipeMarkdown);
    setRecipe(recipeMarkdown)     
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
        {ingredient.length > 0 && <IngredientsList ingredient={ingredient} getRecipe={getRecipe}/>}
        {recipe && <ClaudeRecipe recipe={recipe}/>}
      </main>
    </div>
  );
};

export default Form;
