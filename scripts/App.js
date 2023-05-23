class App {
	constructor() {
		this.$recipesWrapper = document.querySelector('.recipes');
		this.Recipes = recipes;
	}

	async main() {
		// Affichage de toutes les recettes
		this.Recipes.forEach(recipe => {
			const Template = new RecipeCard(recipe);
			this.$recipesWrapper.appendChild(Template.createRecipeCard(recipe));
		})

		// Recherche principale
		const Search = new SearchForm(this.Recipes);
		Search.onSearch();

		// Affichage des listes dans les boutons dropdown
		const IngredientsDropdown = new DropdownList("ingredients-component", ingredientsArray, "Ingrédient");
		IngredientsDropdown.createDropdownList();
		IngredientsDropdown.onSearch();
		IngredientsDropdown.onTagSearch();

		const ApplianceDropdown = new DropdownList("appliance-component", applianceArray, "Appareil");
		ApplianceDropdown.createDropdownList();
		ApplianceDropdown.onSearch();
		ApplianceDropdown.onTagSearch();

		const UstensilsDropdown = new DropdownList("ustensils-component", ustensilsArray, "Ustensile");
		UstensilsDropdown.createDropdownList();
		UstensilsDropdown.onSearch();
		UstensilsDropdown.onTagSearch();




		// Recherche par tags
		// const IngredientTagSearch = new TagSearch(this.recipes, IngredientsDropdown);
		// IngredientTagSearch.onTagSearch();

		// const ApplianceTagSearch = new TagSearch(this.recipes, ApplianceDropdown);
		// ApplianceTagSearch.onTagSearch();

		// const UstensilsTagSearch = new TagSearch(this.recipes, UstensilsDropdown);
		// UstensilsTagSearch.onTagSearch();
	}
}

const app = new App();
app.main();