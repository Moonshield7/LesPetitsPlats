class App {
	constructor() {
		this.recipesContainer = document.querySelector('.recipes');
		this.recipes = recipes;
	}

	async main() {
		// Affichage de toutes les recettes
		this.recipes.forEach(recipe => {
			const Template = new RecipeCard(recipe);
			this.recipesContainer.appendChild(Template.createRecipeCard(recipe));
		})

		// Affichage des listes dans les boutons dropdown
		const IngredientsDropdown = new DropdownList("ingredients-component", ingredientsArray, "Ingrédient");
		IngredientsDropdown.createDropdownList();
		IngredientsDropdown.onSearch();

		const ApplianceDropdown = new DropdownList("appliance-component", applianceArray, "Appareil");
		ApplianceDropdown.createDropdownList();
		ApplianceDropdown.onSearch();

		const UstensilsDropdown = new DropdownList("ustensils-component", ustensilsArray, "Ustensile");
		UstensilsDropdown.createDropdownList();
		UstensilsDropdown.onSearch();


		// Recherche principale
		const Search = new SearchForm(this.recipes);
		Search.onSearch();
	}
}

const app = new App();
app.main();