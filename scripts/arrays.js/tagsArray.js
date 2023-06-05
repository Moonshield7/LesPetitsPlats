let currentFilters = {
	ingredients: [],
	appliance: [],
	ustensils: []
};

const recipeCount = document.querySelector("#recipe-count");
const noResults = document.querySelector("#no-results");
const recipesContainer = document.querySelector(".recipes");
const filtersWrapper = document.querySelector(".search_filters-active");

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
	ustensilsList.innerHTML = "";
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
	if(!currentFilters.appliance.includes(param) && !currentFilters.ingredients.includes(param) && !currentFilters.ustensils.includes(param)){
		const filterLi = document.createElement("li");
		filterLi.className = "filter-list";
		filterLi.innerText = param;
		filterLi.setAttribute("data-state", "inactive");
		filterLi.addEventListener("click", (e) => {
		handleLiClick(e, key, param, container)
	});

	container.append(filterLi)
	}
	
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
function handleLiClick(e, key, param) {
	const listElement = e.target;
	const listElementState = listElement.getAttribute("data-state");
	if(listElementState === "inactive") {
		listElement.classList.add("is-active");
		listElement.setAttribute("data-state", "active");
		currentFilters[key].push(param);
		handleFilterRecipes(currentFilters);
		createFilterButton(key, param, listElement)
		createTagsLists(handleFilterRecipes(currentFilters))
	} 
}

// Création du bouton pour le filtre sélectionné, sur lequel on peut cliquer ensuite pour le retirer
function createFilterButton(key, param, listElement){
	const filterButton = document.createElement('button');
	filterButton.classList.add('filter_button');
	filterButton.innerHTML = `${param} <i class="far fa-times-circle"></i>`;
	
	if(key === 'appliance'){
		filterButton.classList.add('bg-green')
	} else if(key === 'ustensils'){
		filterButton.classList.add('bg-orange')
	} else {
		filterButton.classList.add('bg-blue')
	}

	filterButton.addEventListener('click', e => {
		listElement.classList.remove("is-active");
		listElement.setAttribute("data-state", "inactive");
		currentFilters[key] = currentFilters[key].filter((item) => item !== param);
		filterButton.remove();

		createTagsLists(handleFilterRecipes(currentFilters))
		toggleActiveFiltersContainer();
	})

	filtersWrapper.appendChild(filterButton);

	toggleActiveFiltersContainer();
}

// Afficher ou (masquer si elle est vide) la div contenant les tags actifs
function toggleActiveFiltersContainer(){
	if(filtersWrapper.querySelectorAll('button').length > 0){
		filtersWrapper.classList.remove("hidden");
	} else {
		filtersWrapper.classList.add("hidden");
	}
}

// Affichage des recettes en fonction du tableau fourni
function displayRecipes(recipesArray) {
	recipesArray.forEach(recipe => {
		const Template = new RecipeCard(recipe);
		recipesContainer.appendChild(Template.createRecipeCard(recipe));
	})
}

function intersection(first){
	
	first = new Set(first);
	let intersection = [...first]

	if(currentFilters.ingredients.length > 0){
		for(let i = 0 ; i < currentFilters.ingredients.length ; i++){
			let second = new Set();
			GlobalSearchedRecipes.forEach(recipe => {
				recipe.ingredients.forEach(ings => {
					if(ings.ingredient.toLowerCase().includes(currentFilters.ingredients[i])){
						second.add(recipe)
					}
				})
			})
			intersection = intersection.filter(item => second.has(item))
		}
	}
	if(currentFilters.ustensils.length > 0) {
		for(let i = 0 ; i < currentFilters.ustensils.length ; i++){
			let third = new Set();
			GlobalSearchedRecipes.forEach(recipe => {
				recipe.ustensils.forEach(ust => {
					if(ust.toLowerCase().includes(currentFilters.ustensils[i])){
						third.add(recipe)
					}
				})
			})
			intersection = intersection.filter(item => third.has(item))
		}
		
	}
	return intersection
}



//
function handleFilterRecipes(filters){
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

	//Dans le cas des ingrédients :
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

	intersection(filteredRecipes).map(recipe => createRecipe(recipe));
	return intersection(filteredRecipes);
}

function createRecipe(recipe){
	const Template = new RecipeCard(recipe);
	recipesContainer.appendChild(Template.createRecipeCard(recipe));
}

// ### PARTIE RECHERCHE DE TAGS ###

// Appliance

function applianceTagSearch(query){
	createApplianceList(handleFilterRecipes(currentFilters).filter(element => element.appliance.toLowerCase().includes(query.toLowerCase())));
}

function onApplianceTagSearch(){
	const applianceInput = document.getElementById('appliance');
	applianceInput.addEventListener('keyup', e => {
		let query = e.target.value;

		if(query.length >= 3){
			applianceTagSearch(query)
		} else if (query.length === 0) {
			createApplianceList(handleFilterRecipes(currentFilters));
		}
	})
}

// Ustensils

function ustensilTagSearch(query){
	ustensilsList.innerHTML = ""
	handleFilterRecipes(currentFilters)
	const filteredUstensilsData = ustensilsData.filter(ust => ust.includes(query));
	filteredUstensilsData.forEach(ustensil => {
		if(!currentFilters.ustensils.includes(ustensil)){
			const filterLi = document.createElement("li");
			filterLi.className = "filter-list";
			filterLi.innerText = ustensil;
			filterLi.setAttribute("data-state", "inactive");
			filterLi.addEventListener("click", (e) => {
				handleLiClick(e, "ustensils", ustensil, ustensilsList)
			});
			ustensilsList.append(filterLi)
		}
	});
}


function onUstensilsTagSearch(){
	const input = document.getElementById('ustensils');
	input.addEventListener('keyup', e => {
		let query = e.target.value;

		if(query.length >= 3){
			ustensilTagSearch(query)
		} else if (query.length === 0) {
			createUstensilsList(handleFilterRecipes(currentFilters));
		}
	})
}

// Ingredients
function ingredientsTagSearch(query){
	ingredientList.innerHTML = ""
	handleFilterRecipes(currentFilters)
	const filteredIngredients = ingredientsData.filter(ing => ing.includes(query));
	filteredIngredients.forEach(ingredient => {
		if(!currentFilters.ingredients.includes(ingredient)){
			const filterLi = document.createElement("li");
			filterLi.className = "filter-list";
			filterLi.innerText = ingredient;
			filterLi.setAttribute("data-state", "inactive");
			filterLi.addEventListener("click", (e) => {
				handleLiClick(e, "ingredients", ingredient, ingredientList)
			});
	
			ingredientList.append(filterLi)
		}
	});
}

function onIngredientsTagSearch(){
	const input = document.getElementById('ingredients');
	input.addEventListener('keyup', e => {
		let query = e.target.value;

		if(query.length >= 3){
			ingredientsTagSearch(query)
		} else if (query.length === 0) {
			createIngredientsList(handleFilterRecipes(currentFilters));
		}
	})
}

function onTagSearch(){
	onIngredientsTagSearch();
	onApplianceTagSearch();
	onUstensilsTagSearch()
}