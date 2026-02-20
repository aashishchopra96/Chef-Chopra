import React from 'react'

const IngredientsList = (prop) => {
    console.log(prop);

    const ingredientsList = prop.ingredient.map(event => (<li key={event}>{event}</li>))
    
  return (
    <div><section>
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite"  >{ingredientsList}</ul>
          {prop.ingredient.length > 3 &&
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button className="btn-get-recipe" onClick={prop.recipeList}>Get a recipe</button>
            </div>}
        </section></div>
  )
}

export default IngredientsList