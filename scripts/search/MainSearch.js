class Search {
	constructor(Recipes) {
		this.Recipes = Recipes;
	}

	search(query) {
		return this.filterRecipes(query);
	}
}

class RecipeNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		return this.Recipes.filter(Recipe => Recipe.name.toLowerCase().includes(query.toLowerCase()));
	}
}

class IngredientNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		const filteredByIngredients = [];
		recipes.forEach(recipe => {
			const recipeIngredients = recipe.ingredients;
			recipeIngredients.forEach(ing => {
				if(ing.ingredient.toLowerCase().includes(query.toLowerCase())){
					filteredByIngredients.push(recipe);
				}
			});
		});
		return filteredByIngredients;
	}
}

class ApplianceNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		return this.Recipes.filter(Recipe => Recipe.appliance.toLowerCase().includes(query.toLowerCase()));
	}
}

class UstensilNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		const filteredByUstensils = [];
		recipes.forEach(recipe => {
			const recipeUstensils = recipe.ustensils;
			recipeUstensils.forEach(ust => {
				if(ust.toLowerCase().includes(query.toLowerCase())){
					filteredByUstensils.push(recipe);
				}
			});
		});
		return filteredByUstensils;
	}
}