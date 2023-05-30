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

		const mainSearchBar = document.getElementById('main_searchbar')

		// Affichage des listes dans les boutons dropdown
		// const IngredientsDropdown = new DropdownList("ingredients-component", "Ingrédient", GlobalSearchedRecipes, ingredientsData);
		// IngredientsDropdown.openDropdownList();
		// IngredientsDropdown.onSearch();

		// const ApplianceDropdown = new DropdownList("appliance-component", "Appareil", GlobalSearchedRecipes, ingredientsData);
		// ApplianceDropdown.openDropdownList();
		// ApplianceDropdown.onSearch();

		// const UstensilsDropdown = new DropdownList("ustensils-component", "Ustensile", GlobalSearchedRecipes, ingredientsData);
		// UstensilsDropdown.openDropdownList();
		// UstensilsDropdown.onSearch();
	}
}

const app = new App();
app.main();