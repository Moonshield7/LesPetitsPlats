class DropdownList {
	constructor(componentName, array, type){
		this._component = document.getElementById(componentName);
		this._dropContainer = this.component.querySelector('.dropdown_list');
		this._input = this.component.querySelector('input');
		this._arrow = this.component.querySelector('i')
		this._list = document.createElement('ul');
		this._array = array;
		this._type = type;
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

	createDropdownList(){
		for(let i = 0 ; i < this._array.length ; i++){
			const listElement = document.createElement('li');
			listElement.innerText = `${this._array[i]}`;
			this._list.appendChild(listElement);
		}

		this._dropContainer.appendChild(this._list);

		this._arrow.addEventListener('click', () => {
			if(this._dropContainer.classList[1] === "hidden"){
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
		this.displayListElements(this._array.filter(element => element.toLowerCase().includes(query.toLowerCase())))
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
				const query = e.target.value;

				if(query.length >= 3){
					this.search(query);
				} else if (query.length === 0) {
					this.displayListElements(this._array);
				}
			})
	}


}