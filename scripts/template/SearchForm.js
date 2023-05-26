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
		return SearchedRecipes;

		function createArray(array){
			array.forEach(recipe => {
				if(!SearchedRecipes.includes(recipe)){
					SearchedRecipes.push(recipe);
				}
			})
		}
	}

	clearRecipesWrapper() {
		this.$recipesWrapper.innerHTML = "";
	}

	displayRecipes(Recipes) {
		this.clearRecipesWrapper();

		Recipes.forEach(Recipe => {
			const Template = new RecipeCard(Recipe);
			this.$recipesWrapper.appendChild(Template.createRecipeCard());
		})
	}

	onSearch() {
		this.$searchFormWrapper
			.querySelector('input')
			.addEventListener('keyup', e => {
				const query = e.target.value;

				if(query.length >= 3){
					const SearchedRecipes = this.search(query);
					GlobalSearchedRecipes = SearchedRecipes;
					// return SearchedRecipes;
				} else if (query.length === 0) {
					this.displayRecipes(this.Recipes);
				}
			})
	}
}