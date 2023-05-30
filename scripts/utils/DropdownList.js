class DropdownList {
	constructor(componentName, type, recipes, set){
		this._component = document.getElementById(componentName);
		this._dropContainer = this.component.querySelector('.dropdown_list');
		this._input = this.component.querySelector('input');
		this._arrow = this.component.querySelector('i')
		this._list = document.createElement('ul');
		this._array = set;
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

	// Création de la liste qui s'affiche lorsque l'on clique sur la flèche du bouton.
	openDropdownList(){
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

}