class SearchForm {
	constructor(Recipes) {
		this.Recipes = Recipes;
		this.RecipeNameSearch = new RecipeNameSearch(Recipes);
		this.IngredientNameSearch = new IngredientNameSearch(Recipes);
		this.ApplianceNameSearch = new ApplianceNameSearch(Recipes);
		this.UstensilNameSearch = new UstensilNameSearch(Recipes);

		this.$wrapper = document.createElement('div');
		this.$recipesWrapper = document.querySelector('.recipes');
		this.$searchFormWrapper = document.querySelector('.search_recipe');
	}

	search(query) {
		let SearchByName = this.RecipeNameSearch.search(query);
		let SearchByIngredient = this.IngredientNameSearch.search(query);
		let SearchByAppliance = this.ApplianceNameSearch.search(query);
		let SearchByUstensil = this.UstensilNameSearch.search(query);

		let SearchedRecipes = [];

		createArray(SearchByName);
		createArray(SearchByIngredient);
		createArray(SearchByAppliance);
		createArray(SearchByUstensil);

		this.displayRecipes(SearchedRecipes);

		function createArray(array){
			for(let i = 0 ; i < array.length ; i++){
				if(!SearchedRecipes.includes(array[i])){
					SearchedRecipes.push(array[i]);
				}
			}
		}
	}

	clearRecipesWrapper() {
		this.$recipesWrapper.innerHTML = "";
	}

	displayRecipes(Recipes) {
		this.clearRecipesWrapper();

		for(let i = 0 ; i < Recipes.length ; i++){
			const Template = new RecipeCard(Recipes[i]);
			this.$recipesWrapper.appendChild(Template.createRecipeCard());
		}
	}

	onSearch() {
		this.$searchFormWrapper
			.querySelector('input')
			.addEventListener('keyup', e => {
				const query = e.target.value;

				if(query.length >= 3){
					this.search(query);
				} else if (query.length === 0) {
					this.displayRecipes(this.Recipes);
				}
			})
	}
}