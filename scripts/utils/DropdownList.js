class DropdownList {
	constructor(componentName, type, recipes){
		this._component = document.getElementById(componentName);
		this._dropContainer = this.component.querySelector('.dropdown_list');
		this._input = this.component.querySelector('input');
		this._arrow = this.component.querySelector('i')
		this._list = document.createElement('ul');
		this._array = new Array();
		this._type = type;
		this._recipes = recipes;
		this._filteredRecipes = new Array();

		// this.selectedTags = new Array();
		this.$filterWrapper = document.querySelector('.search_filters-active');
		this.$recipesWrapper = document.querySelector('.recipes');
	}

	get component(){
		return this._component;
	}

	get dropContainer(){
		return this._dropContainer;
	}

	get input(){
		return this._input;
	}

	get arrow(){
		return this._arrow;
	}

	get list(){
		return this._list;
	}

	// Création du tableau de tags en fonction du type
	createArray(){
		if(this._type === "Ingrédient"){
			this._recipes.forEach(recipe => {
				const recipeIngredients = recipe.ingredients;
				recipeIngredients.forEach(ing => {
					if(!this._array.includes(ing.ingredient.toLowerCase())){
						this._array.push(ing.ingredient.toLowerCase());
					}
				})
			})
		}
		if(this._type === "Appareil"){
			this._recipes.forEach(recipe => {
				if(!this._array.includes(recipe.appliance.toLowerCase())){
					this._array.push(recipe.appliance.toLowerCase());
				}
			})
		}
		if(this._type === "Ustensile"){
			this._recipes.forEach(recipe => {
				const recipeUstensils = recipe.ustensils;
				recipeUstensils.forEach(ust => {
					if(!this._array.includes(ust.toLowerCase())){
						this._array.push(ust.toLowerCase());
					}
				})
			})
		}
	}

	// Création de la liste qui s'affiche lorsque l'on clique sur la flèche du bouton.
	createDropdownList(){
		// On vide la div contenant la liste
		this._dropContainer.innerHTML = '';
		// On créé le tableau des tags possibles en fonction des recettes affichées (après recherche principale ou non)
		this.createArray();
		for(let i = 0 ; i < this._array.length ; i++){
			const listElement = document.createElement('li');
			listElement.innerText = `${this._array[i]}`;
			this._list.appendChild(listElement);
		}
		this._dropContainer.appendChild(this._list);

		// On initialise un compteur de clic pour ouvrir et fermer la partie dropdown. Si le compteur est impair : la liste est affichée. S'il est pair : elle est cachée.
		let countClicks = 0
		this._arrow.addEventListener('click', () => {
			countClicks += 1;
			if(countClicks%2 !== 0){
				this._dropContainer.classList.remove("hidden");
				this._component.style.width = "640px";
				this._component.style.borderRadius = "5px 5px 0 0";
				this._input.setAttribute("placeholder", `Rechercher un ${this._type.toLowerCase()}`);
				this._input.classList.add("grey-text");
				this._arrow.classList.add("fa-chevron-up");
				this._arrow.classList.remove("fa-chevron-down");
			} else {
				this._dropContainer.classList.add("hidden");
				this._component.style.width = "170px";
				this._component.style.borderRadius = "5px 5px 5px 5px";
				this._input.setAttribute("placeholder", this._type + "s");
				this._input.classList.remove("grey-text");
				this._arrow.classList.remove("fa-chevron-up");
				this._arrow.classList.add("fa-chevron-down");
			}
		})
	}

	// La fonction search permet de rechercher la liste des tags en fonction de la recherche (query)effectuée dans chaque champ de tag et de l'afficher grâce à displayListElements.
	search(query){
		this.displayListElements(this._array.filter(element => element.toLowerCase().includes(query.toLowerCase())));
		this.onTagSearch();
	}

	// clearList permet de vider le contenu de la liste
	clearList(){
		this._list.innerHTML = '';
	}

	// displayListElements récupère le tableau de tags filtré et l'affiche dans le DOM
	displayListElements(filteredArray){
		this.clearList();

		for(let i = 0 ; i < filteredArray.length ; i++){
			const listElement = document.createElement('li');
			listElement.innerText = `${filteredArray[i]}`;
			this._list.appendChild(listElement);
		}

		this._dropContainer.appendChild(this._list);
	}

	// onSearch lance la recherche par tag dès lors que trois caractères ou plus sont entrés dans le champ de recherche par tag. S'il y a moins de 3 caractères, toutes les recettes (ou celles résultant de la recherche principale) sont affichées
	onSearch() {
		this._input.addEventListener('keyup', e => {
				let query = e.target.value;

				if(query.length >= 3){
					this.search(query);
				} else if (query.length === 0) {
					this.displayListElements(this._array);
				}
			})
			
	}

	// onTagSearch permet l'ajout et le retrait de tags, et affiche les recettes filtrées avec les tags sélectionnés s'il y en a au moins un
	onTagSearch(){
		this.addTag();
		this.removeTag();
		// if(this.selectedTags.length > 0){
		// 	this.displayRecipes();
		// 	console.log("flap", this._filteredRecipes)
		// }
		
	}

	// Ajout d'un tag
	addTag(){
		// On récupère tous les tags affichés dans le dropdown, et on y ajoute un écouteur d'évènement pour permettre d'intéragir avec. 
		const listElements = this._list.querySelectorAll('li');

		for(let i = 0 ; i < listElements.length ; i++){
			listElements[i].addEventListener('click', (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				// Lorsque l'on clique sur l'un des éléments de la liste, son text est stocké dans le tableau selectedTags, et on créé le tag dans le DOM.
				currentTags.push(listElements[i].innerText);

				const tag = document.createElement('button');
				tag.classList.add('filter_button');
				tag.innerText = `${listElements[i].innerText}`;

				if(this._type === 'Appareil'){
					tag.classList.add('bg-green')
				} else if(this._type === 'Ustensile'){
					tag.classList.add('bg-orange')
				} else {
					tag.classList.add('bg-blue')
				}

				this.$filterWrapper.appendChild(tag);	

				// On retire le tag cliqué de la liste dans le dropdown, et on affiche la liste mise à jour
				this._array = this._array.filter(element => element !== listElements[i].innerText);

				console.log("tags added", currentTags);
				this.displayListElements(this._array);
				this.displayRecipes();
				this.onTagSearch();


			})
		}
	}

	// Retrait d'un tag
	removeTag(){
		// On récupère tous les tags sélectionnés, et on y ajoute un écouteur d'évènement.
		const listTags = this.$filterWrapper.querySelectorAll('.filter_button');
		
		for(let i = 0 ; i < listTags.length ; i++){
			listTags[i].addEventListener('click', (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				// Lorsque l'on click sur l'un des tags, il est retiré, et ajouté dans le tableau des tags
				currentTags.splice(i, 1);
				listTags[i].remove();
				this._array.push(listTags[i].innerText);

				console.log("tags removed", currentTags);
				console.log("recettes", this._filteredRecipes);
				this._recipes.forEach(Recipe => {
					if(this._type === "Appareil"){
						if(Recipe.appliance.toLowerCase() !== listTags[i]){
							if(!this._filteredRecipes.includes(Recipe)){
								this._filteredRecipes.push(Recipe);
							}
						}
					}
					if(this._type === "Ustensile"){
							if(!Recipe.ustensils.includes(listTags[i])){
								if(!this._filteredRecipes.includes(Recipe)){
									this._filteredRecipes.push(Recipe);
								}
							}			
					}
				})
				console.log("recettes sans le filtre", this._filteredRecipes);
				// On affiche la liste mise à jour
				this.displayListElements(this._array);
				this.displayRecipes();
				this.onTagSearch();
				

			})
		}
	}

	clearRecipesWrapper() {
		this.$recipesWrapper.innerHTML = "";
	}

	// Affichage des recettes
	displayRecipes() {
		this.clearRecipesWrapper();

		// On passe en revue toutes les recettes actuellement affichées, ainsi que tous les tags sélectionnés, et on les compare : si une recette contient l'un des tags, elle est ajoutée au tableau de recettes filtrées

		// ATTENTION : la fonctionnalité n'est pas bonne : à revoir -> on peut accumuler les tags
		this._recipes.forEach(Recipe => {
			if(this._type === "Appareil"){
				currentTags.forEach(tag => {
					if(Recipe.appliance.toLowerCase() === tag){
						this._filteredRecipes.push(Recipe);
					}
				})
			}
			if(this._type === "Ustensile"){
				currentTags.forEach(tag => {
					if(Recipe.ustensils.includes(tag)){
						this._filteredRecipes.push(Recipe);
					}
				})				
			}
			if(this._type === "Ingrédient"){
				const ingredients = Recipe.ingredients;
				ingredients.forEach(ingredient => {
					currentTags.forEach(tag => {
						if(ingredient.ingredient.toLowerCase().includes(tag)){
								this._filteredRecipes.push(Recipe);
						}
					})
				})			
			}
		})

		// On affiche toutes les recettes contenue dans le tableau de recettes filtrées
		this._filteredRecipes.forEach(recipe => {
			const Template = new RecipeCard(recipe);
			this.$recipesWrapper.appendChild(Template.createRecipeCard(recipe));
		})
	}


}