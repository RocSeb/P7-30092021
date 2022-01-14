/***********
 * 1. importer le json dans une variable global
 * 2. créer variable de recettes filtrés
 * 3. créer variable de nom des recettes filtrés
 * 4. créer variable de type array de la liste des ingrédients
 * 5. créer variale de type array de la liste des ustensiles
 * 6. créer variable de type array de la liste des appareils
 * 7. créer variable de type string d'ingrédients filtrés
 * 8. créer variable de type string d'ustensiles filtrés
 * 9. créer variable de type string d'appareils filtrés
 **********/

 export { allRecipes };
 import { recipes } from "./recipes.js";
 
 let allRecipes = recipes;
 let recipeName = [];
 const container = document.getElementById('recipes-container');
 const searchForm = document.querySelector('form');
 const card = document.querySelector('.card');
 const searchBar = document.getElementById('search-bar');
 let searchQuery = ''; //store the input value

 searchBar.addEventListener('keyup', (e) => {
    //ciblage de la valeur introduit dans l'input en retournant un resultat en miniscule
    const searchString = e.target.value.toLowerCase();

    if (searchString.length >= 3) {
        //filtrage des données + retour du resultat en minuscule + comparaison avec le resultat de la valeur de l'input
        const filteredRecipes = allRecipes.filter( recipe => {  
            return recipe.name.toLowerCase().includes(searchString);
            recipe.ingredients.forEach(listeIngredient => {
                return listeIngredient.ingredient.toLowerCase().includes(searchString);
            }); 
        });
        recipeCard(filteredRecipes);
    }
    //execute la fonction d'ajout du contenu dans le DOM en mettant en parametre le filtrage de donnée
    
});