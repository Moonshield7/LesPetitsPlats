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