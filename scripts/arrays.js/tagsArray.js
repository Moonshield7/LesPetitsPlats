let GlobalSearchedRecipes = recipes;

let currentFilters = {
	ingredients: [],
	appliance: [],
	ustensils: []
};

let filteredRecipes = [...new Set(recipes)];

console.log(filteredRecipes)

// Tableau de tous les ingrédients
const ingredientList = document.getElementById("ingredients-list");
const ingredientsData = [...new Set()];
recipes.forEach(recipe => {
	const recipeIngredients = recipe.ingredients;
	recipeIngredients.forEach(ing => {
		if(!ingredientsData.includes(ing.ingredient.toLowerCase())){
			ingredientsData.push(ing.ingredient.toLowerCase());
		}
	})
});
ingredientsData.map((ingredient) => createFilter("ingredients", ingredient, ingredientList));

// console.log(ingredientsData)

// Tableau de tous les appareils
const applianceList = document.getElementById("appliance-list");
const applianceData = [...new Set()];
recipes.forEach(recipe => {
		if(!applianceData.includes(recipe.appliance.toLowerCase())){
			applianceData.push(recipe.appliance.toLowerCase());
		}
});
applianceData.map((appliance) => createFilter("appliance", appliance, applianceList));

// console.log(applianceData)

// Tableau de tous les ustentiles
const ustensilsList = document.getElementById("ustensils-list");
const ustensilsData = [...new Set()];
recipes.forEach(recipe => {
	const recipeUstensils = recipe.ustensils;
	recipeUstensils.forEach(ust => {
		if(!ustensilsData.includes(ust.toLowerCase())){
			ustensilsData.push(ust.toLowerCase());
		}
	})
});
ustensilsData.map((ustensils) => createFilter("ustensils", ustensils, ustensilsList));

// console.log(ustensilsData)

openDropdownList("ingredients-component", "Ingrédient");
openDropdownList("appliance-component", "Appareil");
openDropdownList("ustensils-component", "Ustensile");

// 				################################
// 				### DECLARATION DE FONCTIONS ###
// 				################################

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
			input.setAttribute("placeholder", this._type + "s");
			input.classList.remove("grey-text");
			arrow.classList.remove("fa-chevron-up");
			arrow.classList.add("fa-chevron-down");
		}
	})
}

function handleLiClick(e, key, param, container) {
	const listElement = e.target;
	const listElementState = listElement.getAttribute("data-state");
	if(listElementState === "inactive") {
		listElement.classList.add("is-active");
		listElement.setAttribute("data-state", "active");
		currentFilters[key].push(param);
		// handleFilterPosts(currentFilters);
		console.log(currentFilters)
	} else {
		listElement.classList.remove("is-active");
		listElement.setAttribute("data-state", "inactive");
		currentFilters[key] = currentFilters[key].filter((item) => item !== param);
		// handleFilterPosts(currentFilters);
		console.log(currentFilters)
	  }
}

function displayRecipes(recipesArray) {
	recipesWrapper = document.querySelector('.recipes');
	recipesArray.forEach(recipe => {
		const Template = new RecipeCard(recipe);
		recipesWrapper.appendChild(Template.createRecipeCard(recipe));
	})
}