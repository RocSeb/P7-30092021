import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const ustensilesItem = document.querySelector(".dropdown-ustensiles");
const dropButton = document.querySelector(".fa-sort-down");
const inputUstensiles = document.querySelector(".input-ustensiles");
let ustensilesArray = [];

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
    <li class="li-ustensiles dropdown-item">${ ustensils }</li>
    `
    }).join(" ");
    ustensilesItem.innerHTML = DOMUstensileContent;
});
renderListUstensiles(noDuplicateUstensiles);