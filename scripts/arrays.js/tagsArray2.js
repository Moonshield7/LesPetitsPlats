const currentRecipesArray = recipes;
const ingredientsArray = createIngredientsArray(recipes);

document.addEventListener('keyup', e => {
	currentRecipesArray.splice(0, currentRecipesArray.length);
	const currentRecipesDOM = document.querySelectorAll('article');
	currentRecipesDOM.forEach(DOMrecipe => {
		const title = DOMrecipe.querySelector('h2');
		recipes.forEach(recipe => {
			if(title.innerText === recipe.name){
				currentRecipesArray.push(recipe);
			}
		})
	})
	console.log(currentRecipesArray)

	// Tableau de tous les ingrédients
	createIngredientsArray(currentRecipesArray, ingredientsArray)

})

function createIngredientsArray(recipesArray, ingArray) {
	recipesArray.forEach(recipe => {
		const recipeIngredients = recipe.ingredients;
		recipeIngredients.forEach(ing => {
			if(!ingArray.includes(ing.ingredient.toLowerCase())){
				ingArray.push(ing.ingredient.toLowerCase());
			}
		})
	})
}



// Tableau de tous les appareils
const applianceArray = []
recipes.forEach(recipe => {
		if(!applianceArray.includes(recipe.appliance.toLowerCase())){
			applianceArray.push(recipe.appliance.toLowerCase());
		}
})

// Tableau de tous les ustentiles
const ustensilsArray = []
recipes.forEach(recipe => {
	const recipeUstensils = recipe.ustensils;
	recipeUstensils.forEach(ust => {
		if(!ustensilsArray.includes(ust.toLowerCase())){
			ustensilsArray.push(ust.toLowerCase());
		}
	})
})

// Recettes affichées

