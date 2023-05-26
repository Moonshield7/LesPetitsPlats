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

		this.selectedTags = new Array();
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

	createDropdownList(){
		this._dropContainer.innerHTML = '';
		this.createArray();
		console.log(this._array)
		for(let i = 0 ; i < this._array.length ; i++){
			const listElement = document.createElement('li');
			listElement.innerText = `${this._array[i]}`;
			this._list.appendChild(listElement);
		}

		this._dropContainer.appendChild(this._list);
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

	search(query){
		this.displayListElements(this._array.filter(element => element.toLowerCase().includes(query.toLowerCase())));
		this.onTagSearch();
	}

	clearList(){
		this._list.innerHTML = '';
	}

	displayListElements(filteredArray){
		this.clearList();

		for(let i = 0 ; i < filteredArray.length ; i++){
			const listElement = document.createElement('li');
			listElement.innerText = `${filteredArray[i]}`;
			this._list.appendChild(listElement);
		}

		this._dropContainer.appendChild(this._list);
	}

	onSearch() {
		this._input.addEventListener('keyup', e => {
				let query = e.target.value;

				if(query.length >= 3){
					this.search(query);
					console.log(this.search(query))
				} else if (query.length === 0) {
					this.displayListElements(this._array);
				}
			})
			
	}

	onTagSearch(){
		this.addTag();
		this.removeTag();
		if(this.selectedTags.length > 0){
			this.displayRecipes();
		}
		
	}

	addTag(){
		const listElements = this._list.querySelectorAll('li');
		const blob = this._array;

		for(let i = 0 ; i < listElements.length ; i++){
			listElements[i].addEventListener('click', (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				this.selectedTags.push(listElements[i].innerText);

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

				this._array = this._array.filter(element => element !== listElements[i].innerText);

				this.displayListElements(this._array);
				this.onTagSearch();

			})
		}
	}

	removeTag(){
		const listTags = this.$filterWrapper.querySelectorAll('.filter_button');
		
		for(let i = 0 ; i < listTags.length ; i++){
			listTags[i].addEventListener('click', (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				this.selectedTags.splice(i, 1);
				listTags[i].remove();
				this._array.push(listTags[i].innerText);

				this.displayListElements(this._array);
				this.onTagSearch();

			})
		}
	}

	clearRecipesWrapper() {
		this.$recipesWrapper.innerHTML = "";
	}

	displayRecipes() {
		this.clearRecipesWrapper();
		const filteredRecipes = []

		
		this._recipes.forEach(Recipe => {
			if(this._type === "Appareil"){
				this.selectedTags.forEach(tag => {
					if(Recipe.appliance.toLowerCase() === tag){
						filteredRecipes.push(Recipe);
					}
				})
			}
			if(this._type === "Ustensile"){
				this.selectedTags.forEach(tag => {
					if(Recipe.ustensils.includes(tag)){
						filteredRecipes.push(Recipe);
					}
				})				
			}
			if(this._type === "Ingrédient"){
				const ingredients = Recipe.ingredients;
				for(let i = 0 ; i < ingredients.length ; i++){
					
					this.selectedTags.forEach(tag => {
						if(ingredients[i].ingredient.toLowerCase().includes(tag)){
							console.log(tag)
							filteredRecipes.push(Recipe);
						}
					})
				}			
			}
			
		})

		console.log(filteredRecipes)
		filteredRecipes.forEach(recipe => {
			const Template = new RecipeCard(recipe);
			this.$recipesWrapper.appendChild(Template.createRecipeCard(recipe));
		})
	}


}