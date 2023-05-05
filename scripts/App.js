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
	}
}

const app = new App();
app.main();