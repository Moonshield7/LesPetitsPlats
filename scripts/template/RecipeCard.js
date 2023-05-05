class RecipeCard {
	constructor(recipe) {
		this._recipe = recipe;
		this.$article = document.createElement('article');
	}

	get recipe() {
		return this._recipe;
	}

	createRecipeCard() {
		// Liste des ingrédients
		const ingredientsList = document.createElement('ul');
		this._recipe.ingredients.forEach(ingredient => {
			const ingredientsListElement = document.createElement('li');
			const ingredientQuantity = ingredient.quantity ? `: ${ingredient.quantity}` : '';
			ingredientsListElement.innerHTML = `<strong> ${ingredient.ingredient} </strong> ${ingredientQuantity} ${ingredient.unit ? ingredient.unit : ""}`;
			ingredientsList.appendChild(ingredientsListElement);
		});

		// Image grisée
		const imgPlaceholder = document.createElement('div');
		imgPlaceholder.classList.add("img-placeholder");

		// Titre et temps de préparation
		const recipeTilte = document.createElement('div');
		recipeTilte.classList.add("recipe-title");
		const recipeName = document.createElement('h2');
		recipeName.innerText = `${this._recipe.name}`;
		const recipeTime = document.createElement('h3');
		recipeTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${this._recipe.time} min`;

		// Contenu de la recette
		const recipeContent = document.createElement('div');
		recipeContent.classList.add("recipe-content");
		const recipeIngredients = document.createElement('div');
		recipeIngredients.classList.add("recipe-ingredients");
		const recipeInstructions = document.createElement('div');
		recipeInstructions.classList.add("recipe-instructions");
		recipeInstructions.innerText = `${this._recipe.description}`;

		// Ajout des différents éléments dans l'article
		this.$article.appendChild(imgPlaceholder);
		this.$article.appendChild(recipeTilte);
		recipeTilte.appendChild(recipeName);
		recipeTilte.appendChild(recipeTime);
		this.$article.appendChild(recipeContent);
		recipeContent.appendChild(recipeIngredients);
		recipeIngredients.appendChild(ingredientsList);
		recipeContent.appendChild(recipeInstructions);

		return this.$article
	}
}