import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const ustensilesItem = document.querySelector(".dropdown-ustensiles");
const dropButton = document.querySelector(".fa-sort-down");
const inputUstensiles = document.querySelector(".input-ustensiles");
const chipUstensile = document.querySelector(".bloc-chips");
let ustensilesArray = [];
const chips = [];

//Remplir tableau ustensilesArray[]
dropRecipes.forEach(dropRecipe => {
    dropRecipe.ustensils.forEach((ustensil) => {
        ustensilesArray.push(ustensil.toLowerCase());
    })
});
// supprimer doublons dans le tableau ustensilesArray[]
let noDuplicateUstensiles = [...new Set(ustensilesArray)];

// compare la saisie pour filtrer les données
inputUstensiles.addEventListener('keyup', (e) => {
    //ciblage de la valeur introduit dans l'input en retournant un resultat en miniscule
    const searchString = e.target.value.toLowerCase();
    //filtrage ustensiles
    const filteredUstensiles = ustensilesArray.filter( recipe => {
        console.log(recipe, "yooooooo");
        return recipe.toLowerCase().includes(searchString);
    });
    const filteredUstensilesNoDuplicated = [...new Set(filteredUstensiles)];
    renderListUstensiles(filteredUstensilesNoDuplicated);
});
// Rajoute les ustensiles dans une balise <li></li> dans le DOM
const renderListUstensiles = (recipes => {
    const DOMUstensileContent = recipes.map((ustensils) => {
    return `
    <li class="li-ustensiles dropdown-item" data-selected="${ ustensils }">${ ustensils }</li>
    `
    }).join(" ");
    ustensilesItem.innerHTML = DOMUstensileContent;

    const listItemUstensile = document.querySelectorAll(".dropdown-ustensiles li");
//créer un chip avec l'ingredient sélectionné en value
    listItemUstensile.forEach((listItem) => {
        listItem.addEventListener('click', () => {
        const dataValue = listItem.getAttribute("data-selected");
        const chipCreate = document.createElement('div');
                const chipContainer = document.createElement('div');
                const chipContent = document.createTextNode(dataValue);
                chipCreate.setAttribute('class', 'chip-container red-bg');
                chipContainer.setAttribute('class', 'chip-content active');
                chipContainer.appendChild(chipContent);

                const closeChip = document.createElement('button');
                closeChip.setAttribute('class', 'close-button');
                closeChip.innerHTML = '&#10006;';
                closeChip.onclick = removeChip;

                chipCreate.appendChild(chipContainer);
                chipCreate.appendChild(closeChip);
                chipUstensile.appendChild(chipCreate);
                chips.push(chipCreate);
            });
        });
  //close chip
  const removeChip = (e) => {
    const item = e.target.textContent;
    e.target.parentElement.remove();
    chips.splice(chips.indexOf(item), 1);
  };
});
//Déroule la dropdown ustensile
const toggleUstensile = document.getElementById("ust-id");
      toggleUstensile.addEventListener('click', () => {
        document.getElementById("ustensiles").classList.add("show-ust");
        document.getElementById("bloc-ustensiles").classList.add("changeWidth");
      });
const iconToggleUst = document.getElementById("icon-ust");
      iconToggleUst.addEventListener('click', () => {
        document.getElementById("ustensiles").classList.toggle("show-ust");
        document.getElementById("bloc-ustensiles").classList.toggle("changeWidth");
      })

renderListUstensiles(noDuplicateUstensiles);