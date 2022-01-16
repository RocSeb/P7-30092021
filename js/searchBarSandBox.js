//import database with all recipe
import { data } from "./recipes.js";

//store last results
let lastSearch = [];
export function getLastSearch() {
    return lastSearch;
};

export function search(request, appliance, ustensil, ingredients) {
    let recipes = data.recipes;
    recipes = matchAppliance(recipes, appliance.toLowerCase());
    recipes = matchUstensils(recipes, ustensil.toLowerCase());
    recipes = matchIngredients(recipes, ingredients);
    recipes = matchContent(recipes, request.toLowerCase());
    //save the result
    lastSearch = [appliance, ustensil, ingredients, recipes];
    return recipes;
}

//check if a recipe with all tagged apliance
function matchAppliance(recipes, appliance) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(appliance)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}
// ustensil
function matchUstensils(recipes, ustensil) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (ustensil == "" || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

//ingredient
function matchIngredients(recipes, ingredients) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        let ingredientsMatch = []
        ingredients.forEach(ingredient => {
            ingredientsMatch.push(
                recipe.ingredients.filter(recIngredient =>
                    recIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())    
                ).length > 0 
        )})
        if (ingredientsMatch.every(match => match == true)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

function matchContent(recipes, request) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(request) 
            || recipe.description.toLowerCase().includes(request)
            || recipe.ingredients
                .filter(ingredient => ingredient.ingredient
                    .toLowerCase().includes(request)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}