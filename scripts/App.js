class App {
	constructor() {
		this.Recipes = recipes;
	}

	async main() {
		displayRecipes(recipes);
		onTagSearch();

		// Recherche principale
		const Search = new SearchForm(this.Recipes);
		Search.onSearch();

		createTagsLists(GlobalSearchedRecipes);
		openDropdownList("ingredients-component", "Ingrédient");
		openDropdownList("appliance-component", "Appareil");
		openDropdownList("ustensils-component", "Ustensile");

		const mainSearchBar = document.getElementById("main_searchbar");
		mainSearchBar.addEventListener("keyup", e => {
			createTagsLists(GlobalSearchedRecipes);
		});
	}
}

const app = new App();
app.main();