export { allRecipes };
import { recipes } from "./recipes.js";

let allRecipes = recipes;
let recipeName = [];
const container = document.getElementById('recipes-container');
const searchForm = document.querySelector('form');
const card = document.querySelector('.card');
const searchBar = document.getElementById('search-bar');
let searchQuery = ''; //store the input value
let arrayRecipeFiltered = [];
export { arrayRecipeFiltered };
/***** 
 *
 * 1- Intégrer un evenement d'écoute de saisie sur l'input
 * 2- stocker dans une variable la valeur entrer par l'utilisateur dans l'input, transformer les caractères en minuscule
 * 3- filtrer et comparer le tableaux de données avec la variable qui contient la valeur de saisie et stocker le resultat dans une variable de type array
 * 4- contrôler l'affichage par rapport au contenu du tableau de la variable qui contient le résultat du filtrage
 * 
 *  *****/

//Ecouteur d'evenement qui filtre le contenu lorsque l'user entre une valeur
searchBar.addEventListener('keyup', (e) => {
    //ciblage de la valeur introduit dans l'input en retournant un resultat en miniscule
    const searchString = e.target.value.toLowerCase();
    if (searchString.length >= 3) {
        //filtrage par nom de recette + retour du resultat en minuscule + comparaison avec le resultat de la valeur de l'input
        const filteredRecipes = allRecipes.filter( recipe => {
            const ingredientStr = recipe.ingredients.map(ingredients => {
                return Object.values(ingredients).toString().toLowerCase();
            });
            //converti le resultat des ustensiles en string
            const ustensileStr = recipe.ustensils.toString((ustensil) => {
                if (ustensil.toLowerCase().includes(searchString) === true) {
                    return ustensil.toLowerCase().includes(searchString);
                }   
            });
            const ingredient = ingredientStr.toString().toLowerCase().includes(searchString);
            const name = recipe.name.toLowerCase().includes(searchString);
            const appliance = recipe.appliance.toLowerCase().includes(searchString);
            const ustensile = ustensileStr.includes(searchString);
             if(name || appliance || ustensile || ingredient === true) {
                 return true;
             }
        });
        arrayRecipeFiltered = filteredRecipes;
    //execute la fonction d'ajout du contenu dans le DOM en mettant en parametre le filtrage de donnée
        renderRecipeCard(filteredRecipes);
    } else {
        
        renderRecipeCard(allRecipes);
    }
});

export function updateFilterTag() {
    console.log(arrayRecipeFiltered, "updated");
    return arrayRecipeFiltered;
    
};

// creation du composant card qui s'incrémente dynamiquement dans le DOM selon le nombre de résultat retourné par le fichier de données
export function renderRecipeCard(recipe) {
    arrayRecipeFiltered = recipe;
    const DOMCardContent = recipe.map((recipe) => {
        return `
    <div class="card-menu">
        <img class="card-img-top" src="media/350x150.png" alt="Card image cap">
        <div class="card-body">
            <div class="card-title">
                <h1 class="bold recipe-name">${recipe.name}</h1>
                <span><i class="bold fs-14 far fa-clock">${recipe.time}min</i></span>
            </div>
            <div class="recipe-info-container">
                <div class="ingredients-container">
            ${recipe.ingredients.map(element => {
                `
                <div class="info-ingredient">
                    <span><b>${ element.ingredient } : </b></span>
                    <span>${ "quantity" in element ? element.quantity : ""} </span>
                    <span>${ "unit" in element ? element.unit : ""}</span>
                </div>
                `
            }).join(" ")}
                </div>
                <div class="instructions">
                    <span>${recipe.description}</span>
                </div>        
            </div>
        </div>
    </div>
    `
    })
    .join('');
    container.innerHTML = DOMCardContent;
};

renderRecipeCard(allRecipes);
console.log(arrayRecipeFiltered, "filtré");



