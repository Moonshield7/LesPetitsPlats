let currentFilters = {
	ingredients: [],
	appliance: [],
	ustensils: []
};

const recipeCount = document.querySelector("#recipe-count");
const noResults = document.querySelector("#no-results");
const recipesContainer = document.querySelector(".recipes");

// Set de tous les ingrédients
const ingredientList = document.getElementById("ingredients-list");
const ingredientsData = [...new Set()];

// Set de tous les appareils
const applianceList = document.getElementById("appliance-list");
const applianceData = [...new Set()];

// Set de tous les ustentiles
const ustensilsList = document.getElementById("ustensils-list");
const ustensilsData = [...new Set()];


// 				################################
// 				### DECLARATION DE FONCTIONS ###
// 				################################

// Création des différents sets de tags pour les dropdown lists
function createIngredientsList(recipesArray){
	ingredientList.innerHTML = "";
	ingredientsData.length = 0;
	recipesArray.forEach(recipe => {
		const recipeIngredients = recipe.ingredients;
		recipeIngredients.forEach(ing => {
			if(!ingredientsData.includes(ing.ingredient.toLowerCase())){
				ingredientsData.push(ing.ingredient.toLowerCase());
			}
		})
	});
	ingredientsData.map((ingredient) => createFilter("ingredients", ingredient, ingredientList));
}

function createApplianceList(recipesArray) {
	applianceList.innerHTML = "";
	applianceData.length = 0;
	recipesArray.forEach(recipe => {
		if(!applianceData.includes(recipe.appliance.toLowerCase())){
			applianceData.push(recipe.appliance.toLowerCase());
		}
	});
	applianceData.map((appliance) => createFilter("appliance", appliance, applianceList));
}

function createUstensilsList(recipesArray){
	ustensilsData.length = 0;
	recipesArray.forEach(recipe => {
		const recipeUstensils = recipe.ustensils;
		recipeUstensils.forEach(ust => {
			if(!ustensilsData.includes(ust.toLowerCase())){
				ustensilsData.push(ust.toLowerCase());
			}
		})
	});
	ustensilsData.map((ustensils) => createFilter("ustensils", ustensils, ustensilsList));
}

// Assemblage des fonctions ci-dessus en une seule fonction
function createTagsLists(recipesArray){
	createIngredientsList(recipesArray);
	createApplianceList(recipesArray);
	createUstensilsList(recipesArray);
}

// Création des éléments li du dropdown contenant la liste de tags
function createFilter(key, param, container) {
	const filterLi = document.createElement("li");
	filterLi.className = "filter-list";
	filterLi.innerText = param;
	filterLi.setAttribute("data-state", "inactive");
	filterLi.addEventListener("click", (e) => {
		handleLiClick(e, key, param, container)
	});

	container.append(filterLi)
}

// Ouverture du dropdown container :
function openDropdownList(componentName, type){
	const component = document.getElementById(componentName);
	const arrow = component.querySelector('i');
	const input = component.querySelector('input');
	const dropContainer = component.querySelector('.dropdown_list');

	// On initialise un compteur de clic pour ouvrir et fermer la partie dropdown. Si le compteur est impair : la liste est affichée. S'il est pair : elle est cachée.
	let countClicks = 0
	arrow.addEventListener('click', () => {
		countClicks += 1;
		if(countClicks%2 !== 0){
			dropContainer.classList.remove("hidden");
			component.style.width = "640px";
			component.style.borderRadius = "5px 5px 0 0";
			input.setAttribute("placeholder", `Rechercher un ${type.toLowerCase()}`);
			input.classList.add("grey-text");
			arrow.classList.add("fa-chevron-up");
			arrow.classList.remove("fa-chevron-down");
		} else {
			dropContainer.classList.add("hidden");
			component.style.width = "170px";
			component.style.borderRadius = "5px 5px 5px 5px";
			input.setAttribute("placeholder", type + "s");
			input.classList.remove("grey-text");
			arrow.classList.remove("fa-chevron-up");
			arrow.classList.add("fa-chevron-down");
		}
	})
}

// Gestion de ce qu'il se produit quand on clique sur l'un des tags dans la liste. S'il est inactif : il passe actif et est ajouté au tableau des filtres choisis. S'il est déjà actif, il repasse inactif et est retiré du tableau.
// -> A mettre en place : faire disparaître le tag de la liste lorsqu'il est actif et l'afficher en tant que tag en dessous de la barre principale
function handleLiClick(e, key, param) {
	const listElement = e.target;
	const listElementState = listElement.getAttribute("data-state");
	if(listElementState === "inactive") {
		listElement.classList.add("is-active");
		listElement.setAttribute("data-state", "active");
		currentFilters[key].push(param);
		handleFilterPosts(currentFilters);
	} else {
		listElement.classList.remove("is-active");
		listElement.setAttribute("data-state", "inactive");
		currentFilters[key] = currentFilters[key].filter((item) => item !== param);
		handleFilterPosts(currentFilters);
	}
}

// Affichage des recettes en fonction du tableau fourni
function displayRecipes(recipesArray) {
	recipesArray.forEach(recipe => {
		const Template = new RecipeCard(recipe);
		recipesContainer.appendChild(Template.createRecipeCard(recipe));
	})
}

function handleFilterPosts(filters){
	let filteredRecipes = [...GlobalSearchedRecipes];

	// Dans le cas des appareils :
	if (filters.appliance.length > 0) {
	    filteredRecipes = filteredRecipes.filter((recipe) => filters.appliance.includes(recipe.appliance.toLowerCase()));
	}

	// Dans le cas des ustensils :
	if(filters.ustensils.length > 0){
		filteredRecipes = filteredRecipes.filter(recipe => 
			recipe.ustensils.some((ustensil) => {
				return filters.ustensils.includes(ustensil.toLowerCase())
			}))
	}

	if(filters.ingredients.length > 0){
		filteredRecipes = filteredRecipes.filter(recipe =>
			recipe.ingredients.some(recipeIngredient => {
				return filters.ingredients.includes(recipeIngredient.ingredient.toLowerCase())
			})
		)
	}

	if(filteredRecipes.length == 0) {
		noResults.innerText = " Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
	} else {
		noResults.innerText = "";
	}

	recipesContainer.innerHTML = "";
	filteredRecipes.map(recipe => createRecipe(recipe));
}

function createRecipe(recipe){
	const Template = new RecipeCard(recipe);
	recipesContainer.appendChild(Template.createRecipeCard(recipe));
}