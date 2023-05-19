class Search {
	constructor(Recipes) {
		this.Recipes = Recipes;
	}

	search(query) {
		return this.filterRecipes(query)
	}
}

class RecipeNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes)
	}

	filterRecipes(query){
		return this.Recipes.filter(Recipe => Recipe.name.toLowerCase().includes(query.toLowerCase()));
	}
}

class IngredientNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes)
	}

	filterRecipes(query){
		const filteredByIngredients = []
		for(let i = 0 ; i < recipes.length ; i++){
			const recipeIngredients = recipes[i].ingredients;
			
			for(let j = 0 ; j < recipeIngredients.length ; j++){
				if(recipeIngredients[j].ingredient.toLowerCase().includes(query.toLowerCase())){
					console.log(recipes[i])
					filteredByIngredients.push(recipes[i]);
				}
			}
		}
		return filteredByIngredients;
	}
}

class ApplianceNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes)
	}

	filterRecipes(query){
		return this.Recipes.filter(Recipe => Recipe.appliance.toLowerCase().includes(query.toLowerCase()));
	}
}

class UstensilNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes)
	}

	filterRecipes(query){
		const filteredByUstensils = []
		for(let i = 0 ; i < recipes.length ; i++ ) {
			const recipeUstensils = recipes[i].ustensils;
			for(let j = 0 ; j < recipeUstensils.length ; j++) {
				if(recipeUstensils[j].toLowerCase().includes(query.toLowerCase())){
					filteredByUstensils.push(recipes[i]);
				}
			}
		}
		return filteredByUstensils;
	}
}