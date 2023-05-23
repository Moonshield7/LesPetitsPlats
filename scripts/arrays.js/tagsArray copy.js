function getCurrentRecipes() {
	const recipesWrapper = document.querySelector('.recipes')
	const currentRecipesDOM = recipesWrapper.querySelectorAll('article');
	const currentRecipesArray = [];
	currentRecipesDOM.forEach(currentRecipe => {
		const recipeTitle = currentRecipe.querySelector('h2');
		recipes.forEach(recipe => {
			if(recipeTitle.innerText === recipe.name){
				currentRecipesArray.push(recipe);
			}
		})
	})

	// console.log('hu', currentRecipesArray)
	return currentRecipesArray;
}

function createIngredientsArray(currentRecipes) {
	const array = []
	currentRecipes.forEach(recipe => {
		const recipeIngredients = recipe.ingredients;
		recipeIngredients.forEach(ing => {
			if(!array.includes(ing.ingredient.toLowerCase())){
				array.push(ing.ingredient.toLowerCase());
			}
		})
	})
	// console.log(array)
	return array;
}

// Tableau de tous les ingrédients
// const ingredientsArray = []
// recipes.forEach(recipe => {
// 	const recipeIngredients = recipe.ingredients;
// 	recipeIngredients.forEach(ing => {
// 		if(!ingredientsArray.includes(ing.ingredient.toLowerCase())){
// 			ingredientsArray.push(ing.ingredient.toLowerCase());
// 		}
// 	})
// })

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