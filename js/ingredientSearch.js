import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const ingredientsItem = document.querySelector(".dropdown-ingredients");
const dropButton = document.querySelector(".fa-sort-down");
const inputIngredients = document.querySelector(".input-ingredient");
let ingredientsArray = [];

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
    return `
    <li class="li-ingredient dropdown-item">${(typeof recipe === "string" ? recipe : recipe.ingredients)}</li>
    `
    }).join(" ");
    ingredientsItem.innerHTML = DOMIngredientContent;
});
renderListIngredient(noDuplicateIngredients);