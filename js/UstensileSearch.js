import { recipes } from "./recipes.js";
import { updateFilterTag } from "./recipes-box.js";


let dropRecipes = recipes;
const ustensilesItem = document.querySelector(".dropdown-ustensiles");
const dropButton = document.querySelector(".fa-sort-down");
const inputUstensiles = document.querySelector(".input-ustensiles");
const chipUstensile = document.querySelector(".bloc-chips");
let ustensilesArray = [];
const chips = [];
const arrayRecipeFiltre = updateFilterTag;
let ArrayFilteredData = [];
const container = document.getElementById('recipes-container');
const filtrage = [];

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
        ArrayFilteredData = arrayRecipeFiltre(); //update the filter with the main searchBar

        /*****
         *  créate the chip of ustensile
         *****/
        const dataValue = listItem.getAttribute("data-selected");
        const chipCreate = document.createElement('div');
        const chipContainer = document.createElement('div');
        const chipContent = document.createTextNode(dataValue);
        chipCreate.setAttribute('class', 'chip-container red-bg');
        chipCreate.setAttribute('data-selected', dataValue);
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
        filtrage.push(dataValue);
        console.log(chips, "chips");
        console.log(filtrage, "filtrage");

        const filteredRecipesUstensiles = ArrayFilteredData.filter( recipe => {
          //converti le resultat des ustensiles en string

          const ustensileStr = recipe.ustensils.toString((ustensil) => {
              if (ustensil.toLowerCase().includes(dataValue) === true) {
                filtrage.push(dataValue);
                return ustensil.toLowerCase().includes(dataValue);
              }   
          });
          const ustensile = ustensileStr.includes(filtrage);
          if (ustensile === true) {
            return true;
          }    
        });
        console.log(filteredRecipesUstensiles, "<== filteredRecipesUstensiles")

        renderRecipeCardByTagsUstensiles(filteredRecipesUstensiles);
        /****
         * fonction tri par tag
         ***/
         function renderRecipeCardByTagsUstensiles(recipe) {
           console.log(recipe.length, 'recipe length');
          if (recipe.length >= 1) {
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
            console.log(DOMCardContent, 'DOMCardContent');
          container.innerHTML = DOMCardContent;
          } else {
            const ERRORCardContent = 
               `
              <div class="empty-content">
                <h1 class="title-error">Désolé nous n'avons pas de menu correspondant à votre recherche</h1>
                <h2>Merci de modifier le contenu de vos filtres</h2>
              </div>
              `;
            
            container.innerHTML = ERRORCardContent;
          }
        };
      });
    });
  //close chip
  const removeChip = (e) => {
    const item = e.target.parentNode;
    const dataItem = e.target.parentNode.getAttribute('data-selected');
    console.log(item, "<== item");
    e.target.parentElement.remove();
    console.log(chips.indexOf(item), 'index du chips');
    chips.splice(chips.indexOf(item), 1);
    filtrage.splice(filtrage.indexOf(dataItem), 1);
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