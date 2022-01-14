import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const ingredientsItem = document.querySelector(".dropdown-ingredients");
const inputIngredients = document.querySelector(".input-ingredient");
const chipIngredient = document.querySelector(".bloc-chips");
let ingredientsArray = [];
const chips = [];

//Remplir tableau ingredientsArray[]
dropRecipes.forEach(dropRecipe => {
    dropRecipe.ingredients.forEach((ingredients) => {
        ingredientsArray.push(ingredients.ingredient.toLowerCase());
    })
});
// supprimer doublons dans le tableau ingredientsArray[]
let noDuplicateIngredients = [...new Set(ingredientsArray)];

// compare la saisie pour filtrer les données
inputIngredients.addEventListener('keyup', (e) => {
    //ciblage de la valeur introduit dans l'input en retournant un resultat en miniscule
    const searchString = e.target.value.toLowerCase();
    //filtrage ingredients
    const filteredIngredients = ingredientsArray.filter( recipe => {
        //const ingRecipe = recipe.ingredients.map(element => {
            return recipe.toLowerCase().includes(searchString);
        //return ingRecipe.includes(searchString);
    });
    const filteredIngredientsNoDuplicated = [...new Set(filteredIngredients)];
    //Execute la fonction d'ajout des éléments filtrer dans le DOM
    renderListIngredient(filteredIngredientsNoDuplicated);
});
// Rajoute les ustensiles dans une balise <li></li> dans le DOM
const renderListIngredient = (recipes => {
    const DOMIngredientContent = recipes.map((recipe) => {
        console.log(recipe, "<=== recipe");
        const dataValue = typeof recipe === "string" ? recipe : recipe.ingredients;
    return `
    <li class="li-ingredient dropdown-item" data-selected="${ dataValue }">${ dataValue }</li>
    `
    }).join(" ");
    ingredientsItem.innerHTML = DOMIngredientContent;
    //
    const listItemIngredient = document.querySelectorAll(".dropdown-ingredients li");
//créer un chip avec l'ingredient sélectionné en value
    listItemIngredient.forEach((listItem) => {
        listItem.addEventListener('click', () => {
            const dataValue = listItem.getAttribute("data-selected");
            const chipCreate = document.createElement('div');
            const chipContainer = document.createElement('div');
            const chipContent = document.createTextNode(dataValue);
            chipCreate.setAttribute('class', 'chip-container blue-bg');
            chipContainer.setAttribute('class', 'chip-content active');
            chipContainer.appendChild(chipContent);

            const closeChip = document.createElement('button');
            closeChip.setAttribute('class', 'close-button');
            closeChip.innerHTML = '&#10006;';
            closeChip.onclick = removeChip;

            chipCreate.appendChild(chipContainer);
            chipCreate.appendChild(closeChip);
            chipIngredient.appendChild(chipCreate);
            chips.push(chipCreate);
        });
        const removeChip = (e) => {
            const item = e.target.textContent;
            e.target.parentElement.remove();
            chips.splice(chips.indexOf(item), 1);
        };
    });
});
//Déroule la dropdown ingredient
const toggleIngredient = document.getElementById("ing-id");
      toggleIngredient.addEventListener('click', () => {
        document.getElementById("ingredients").classList.add("show-ing");
        document.getElementById("bloc-ingredients").classList.add("changeWidth");
      });
const iconToggleIng = document.getElementById("icon-ing");
      iconToggleIng.addEventListener('click', () => {
        document.getElementById("ingredients").classList.toggle("show-ing");
        document.getElementById("bloc-ingredients").classList.toggle("changeWidth");
      })
renderListIngredient(noDuplicateIngredients);


