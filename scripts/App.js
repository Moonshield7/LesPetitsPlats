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
		
		mainSearchBar.addEventListener('keyup', (e) => {
			e.preventDefault();
			e.stopImmediatePropagation();

			// console.log("current :",GlobalSearchedRecipes);
			const IngredientsDropdown2 = new DropdownList("ingredients-component", "Ingrédient", GlobalSearchedRecipes);
			IngredientsDropdown2.createDropdownList();
			IngredientsDropdown2.onSearch();
			IngredientsDropdown2.onTagSearch();
	
			const ApplianceDropdown2 = new DropdownList("appliance-component", "Appareil", GlobalSearchedRecipes);
			ApplianceDropdown2.createDropdownList();
			ApplianceDropdown2.onSearch();
			ApplianceDropdown2.onTagSearch();
	
			const UstensilsDropdown2 = new DropdownList("ustensils-component", "Ustensile", GlobalSearchedRecipes);
			UstensilsDropdown2.createDropdownList();
			UstensilsDropdown2.onSearch();
			UstensilsDropdown2.onTagSearch();
		})
		// console.log("ti", GlobalSearchedRecipes)

		// Affichage des listes dans les boutons dropdown
		const IngredientsDropdown = new DropdownList("ingredients-component", "Ingrédient", GlobalSearchedRecipes);
		IngredientsDropdown.createDropdownList();
		IngredientsDropdown.onSearch();
		IngredientsDropdown.onTagSearch();

		const ApplianceDropdown = new DropdownList("appliance-component", "Appareil", GlobalSearchedRecipes);
		ApplianceDropdown.createDropdownList();
		ApplianceDropdown.onSearch();
		ApplianceDropdown.onTagSearch();

		const UstensilsDropdown = new DropdownList("ustensils-component", "Ustensile", GlobalSearchedRecipes);
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