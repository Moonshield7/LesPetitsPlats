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
		const filteredArray = [];
		for(let i = 0 ; i < this.Recipes.length ; i++){
			if(this.Recipes[i].name.toLowerCase().includes(query.toLowerCase())){
				filteredArray[filteredArray.length] = this.Recipes[i];
			}
		}
		return filteredArray;
	}
}

class IngredientNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		const filteredByIngredients = []
		for(let i = 0 ; i < recipes.length ; i++){
			const recipeIngredients = recipes[i].ingredients;
			
			for(let j = 0 ; j < recipeIngredients.length ; j++){
				if(recipeIngredients[j].ingredient.toLowerCase().includes(query.toLowerCase())){
					filteredByIngredients[filteredByIngredients.length] = recipes[i];
				}
			}
		}
		return filteredByIngredients;
	}
}

class ApplianceNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		const filteredArray = [];
		for(let i = 0 ; i < this.Recipes.length ; i++){
			if(this.Recipes[i].appliance.toLowerCase().includes(query.toLowerCase())){
				filteredArray[filteredArray.length] = this.Recipes[i];
			}
		}
		return filteredArray;
	}
}

class UstensilNameSearch extends Search {
	constructor(Recipes) {
		super(Recipes);
	}

	filterRecipes(query){
		const filteredByUstensils = []
		for(let i = 0 ; i < recipes.length ; i++ ) {
			const recipeUstensils = recipes[i].ustensils;
			for(let j = 0 ; j < recipeUstensils.length ; j++) {
				if(recipeUstensils[j].toLowerCase().includes(query.toLowerCase())){
					filteredByUstensils[filteredByUstensils.length] = recipes[i];
				}
			}
		}
		return filteredByUstensils;
	}
}