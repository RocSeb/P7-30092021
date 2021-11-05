import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const appareilsItem = document.querySelector(".dropdown-appareils");
const dropButton = document.querySelector(".fa-sort-down");
const inputAppareils = document.querySelector(".input-appareil");
let appareilsArray = [];


//Remplir tableau appareilsArray[]
dropRecipes.forEach((appliances) => {
    appareilsArray.push(appliances.appliance.toLowerCase());
});
// supprimer doublons dans le tableau appareilsArray[]
let noDuplicateAppareils = [...new Set(appareilsArray)];

inputAppareils.addEventListener('keyup', (e) => {
    //ciblage de la valeur introduit dans l'input en retournant un resultat en miniscule
    const searchString = e.target.value.toLowerCase(); 
    //filtrage des données + retour du resultat en minuscule + comparaison avec le resultat de la valeur de l'input
    const filteredAppliances = appareilsArray.filter( recipe => { 
        return recipe.toLowerCase().includes(searchString);
    });
    const filteredAppliancesNoDuplicated = [...new Set(filteredAppliances)];
    //execute la fonction d'ajout du contenu dans le DOM en mettant en parametre le filtrage de donnée
    renderListAppareils(filteredAppliancesNoDuplicated);
});
const renderListAppareils = (recipes => {
        const DOMApplianceContent = recipes.map((appliances) => {
            return `
            <li class="li-appliance dropdown-item">${(typeof appliances === "string" ? appliances : appliances.appliance)}</li>
            `
            }).join(" ");
        appareilsItem.innerHTML = DOMApplianceContent;
    });
renderListAppareils(noDuplicateAppareils);