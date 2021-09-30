import { recipes } from "./recipes.js";
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const ingredientsItem = document.querySelector(".dropdown-ingredients");
const appareilsItem = document.querySelector(".dropdown-appareils");
const ustensilesItem = document.querySelector(".dropdown-ustensiles");
const dropButton = document.querySelector(".fa-sort-down");
const inputUstensiles = document.querySelector(".input-ustensiles");
let ingredientsArray = [];
let appareilsArray = [];
let ustensilesArray = [];


//Remplir tableau ingredientsArray[]
dropRecipes.forEach(dropRecipe => {
    dropRecipe.ingredients.forEach((element) => {
        ingredientsArray.push(element.ingredient);
    })
});
//Remplir tableau appareilsArray[]
dropRecipes.forEach((appliances) => {
    appareilsArray.push(appliances.appliance);
});
//Remplir tableau ustensilesArray[]
dropRecipes.forEach(dropRecipe => {
    dropRecipe.ustensils.forEach((ustensil) => {
        ustensilesArray.push(ustensil);
    })
});

// supprimer doublons dans le tableau ingredientsArray[]
let noDuplicateIngredients = [...new Set(ingredientsArray)];

// supprimer doublons dans le tableau appareilsArray[]
let noDuplicateAppareils = [...new Set(appareilsArray)];

// supprimer doublons dans le tableau ustensilesArray[]
let noDuplicateUstensiles = [...new Set(ustensilesArray)];


// Afficher ingrédients
const showIngredient = (newIngredients => {
    newIngredients.forEach((newIngredient) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${newIngredient}`
        ingredientsItem.appendChild(listItem);
        listItem.classList.add('a-ingredients');
        listItem.classList.add('dropdown-item');
    })
});

const showAppareil = (newAppareils => {
    newAppareils.forEach((newAppareil) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${newAppareil}`
        appareilsItem.appendChild(listItem);
        listItem.classList.add('a-ingredients');
        listItem.classList.add('dropdown-item');
    })
})

// Afficher ustensiles
const showUstensile = (newUstensiles => {
    newUstensiles.forEach((newUstensile) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${newUstensile}`
        ustensilesItem.appendChild(listItem);
        listItem.classList.add('a-ustensiles');
        listItem.classList.add('dropdown-item');
        listItem.setAttribute("value", `${newUstensile}`);
        /*
        // Affiche la valeur Selectionnée dans l'input
        $(listItem).click(function() {
            $(inputUstensiles).attr("value", `${newUstensile}`);
            $("ul").slideToggle();
        })*/
    })
});

// // Affiche le résultat sélectionné dans l'input

// const resultAparreil = (appareilsVal) => {
//     document.getElementById("input-appareils").value = appareilsVal;
// }; 

    

showIngredient(noDuplicateIngredients);
showAppareil(noDuplicateAppareils);
showUstensile(noDuplicateUstensiles)
console.log(noDuplicateUstensiles, "No duplication");
console.log(noDuplicateUstensiles.length);