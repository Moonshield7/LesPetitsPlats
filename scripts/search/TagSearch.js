// class TagSearch {
// 	constructor(Recipes, DropdownList) {
// 		this.Recipes = Recipes;
// 		this.DropdownList = DropdownList;
// 		this.selectedTags = new Array();
// 		this.$filterWrapper = document.querySelector('.search_filters-active');
// 	}

// 	onTagSearch(){
// 		this.addTag();
// 		this.removeTag();
// 	}

// 	addTag(){
// 		const listElements = this.DropdownList._list.querySelectorAll('li');

// 		for(let i = 0 ; i < listElements.length ; i++){
// 			listElements[i].addEventListener('click', (e) => {
// 				e.preventDefault();
// 				e.stopImmediatePropagation();

// 				this.selectedTags.push(listElements[i].innerText);

// 				const tag = document.createElement('button');
// 				tag.classList.add('filter_button');
// 				tag.innerText = `${listElements[i].innerText}`;

// 				if(this.DropdownList._type === 'Appareil'){
// 					tag.classList.add('bg-green')
// 				} else if(this.DropdownList._type === 'Ustensile'){
// 					tag.classList.add('bg-orange')
// 				} else {
// 					tag.classList.add('bg-blue')
// 				}

// 				this.$filterWrapper.appendChild(tag);

// 				this.DropdownList._array.splice(i, 1);
					
// 				console.log(this.DropdownList._array);
// 				this.DropdownList.displayListElements(this.DropdownList._array);
// 				this.onTagSearch();

// 			})
// 		}
// 	}

// 	removeTag(){
// 		const listTags = this.$filterWrapper.querySelectorAll('.filter_button');
		
// 		for(let i = 0 ; i < listTags.length ; i++){
// 			listTags[i].addEventListener('click', (e) => {
// 				e.preventDefault();
// 				e.stopImmediatePropagation();

// 				this.selectedTags.splice(i, 1);
// 				listTags[i].remove();
// 				this.DropdownList._array.push(listTags[i].innerText);

// 				this.DropdownList.displayListElements(this.DropdownList._array);
// 				this.onTagSearch();

// 			})
// 		}
// 	}
// }