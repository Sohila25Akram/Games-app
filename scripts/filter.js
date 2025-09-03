import {sortByArr, platforms, categories} from './data.js';
import {fetchGamesListWithFilter} from './api-fetch.js';
import { renderGameList } from './game-list.js';


const sortContainer = document.querySelector(".sort-container");
const filterByPlatformContainer = document.querySelector(
  ".filter-by-platform-container"
);
const filterByCategoryContainer = document.querySelector(
  ".filter-by-category-container"
);

sortByArr.forEach((element) => {
  createList(element, "sort", "sort");
});

platforms.forEach((element) => {
  createList(element, "platform", "platform");
});

categories.forEach((element) => {
  createList(element, "category", "category");
});


function createList(element, filterType, nameType) {

  const inputEl = createInput(element, nameType);
  const labelEl = createLabel(element, inputEl);
  const itemLi = createLi(labelEl);

  defineFilter(filterType).appendChild(itemLi);
}

function createInput(element, nameType){
  const inputEl = document.createElement("input");
  inputEl.type = "radio";
  inputEl.value = element.toUpperCase();
  inputEl.name = nameType;
  inputEl.id = `checkbox-${element}`;
  if(element === 'all'){
    inputEl.checked = true;
  }
  inputEl.addEventListener("click", function () {
    handleChange(element, this, nameType);
  });
  return inputEl;
}

function createLabel(element, inputEl){
  const labelEl = document.createElement("label");
  labelEl.htmlFor = inputEl.id;
  labelEl.textContent = element;
  labelEl.appendChild(inputEl);
  return labelEl;
}

function createLi (labelEl) {
  const itemLi = document.createElement("li");
  itemLi.className = "category-container";
  itemLi.appendChild(labelEl);
  return itemLi;
}


function defineFilter(filterType) {
  let currentContainer;
  switch (filterType) {
    case "sort":
      currentContainer = sortContainer;
      break;
    case "platform":
      currentContainer = filterByPlatformContainer;
      break;
    case "category":
      currentContainer = filterByCategoryContainer;
      break;
    default:
      currentContainer = null;
  }

   if (!currentContainer) {
    console.error(`❌ Container for filterType '${filterType}' not found`);
  }

  return currentContainer;
}


let selectedSort = 'relevance'
let selectedPlatform = 'pc'
let selectedCategory = null

function handleChange(element, checkbox, nameType) {
  if (checkbox.checked) {
    switch(nameType){
      case 'sort':
        selectedSort = element;
        break;
      case 'platform':
        selectedPlatform = element;
        break;
      case 'category':
        selectedCategory = element;
        break;
    }
  }

  fetchGamesListWithFilter(selectedSort, selectedPlatform, selectedCategory).then(r => renderGameList(r));
}
