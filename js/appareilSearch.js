import { recipes } from "./recipes.js";
import { renderRecipeCard } from "./recipes-box.js"; 
//import { allRecipes } from "./recipes-box";

let dropRecipes = recipes;
const appareilsItem = document.querySelector(".dropdown-appareils");
const dropButton = document.querySelector(".fa-sort-down");
const inputAppareils = document.querySelector(".input-appareil");
const chipAppareil = document.querySelector(".bloc-chips");
let appareilsArray = [];
const chips = [];


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
            const dataValue = typeof appliances === "string" ? appliances : appliances.appliance;
            return `
            <li class="li-appliance dropdown-item" data-selected="${ dataValue }">${ dataValue }</li>
            `
            }).join(" ");
        appareilsItem.innerHTML = DOMApplianceContent;

        const listItemAppareil = document.querySelectorAll(".dropdown-appareils li");

        listItemAppareil.forEach((listItem) => {
            listItem.addEventListener('click', () => {
                const dataValue = listItem.getAttribute("data-selected");
                const chipCreate = document.createElement('div');
                const chipContainer = document.createElement('div');
                const chipContent = document.createTextNode(dataValue);
                chipCreate.setAttribute('class', 'chip-container green-bg');
                chipContainer.setAttribute('class', 'chip-content active');
                chipContainer.appendChild(chipContent);

                const closeChip = document.createElement('button');
                closeChip.setAttribute('class', 'close-button');
                closeChip.innerHTML = '&#10006;';
                closeChip.onclick = removeChip;

                chipCreate.appendChild(chipContainer);
                chipCreate.appendChild(closeChip);
                chipAppareil.appendChild(chipCreate);
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
//Déroule la dropdown appareil
const toggleAppareil = document.getElementById("app-id");
      toggleAppareil.addEventListener('click', () => {
        document.getElementById("appliances").classList.add("show-app");
        document.getElementById("bloc-appareils").classList.add("changeWidth");
      });
const iconToggleApp = document.getElementById("icon-app");
      iconToggleApp.addEventListener('click', () => {
        document.getElementById("appliances").classList.toggle("show-app");
        document.getElementById("bloc-appareils").classList.toggle("changeWidth");
      })
//Ferme le dropdown appareil
  window.onclick = function(event) {
    if (event.target.getAttribute("target-id") != "bloc-appareils") {
      var dropdowns = document.getElementsByClassName("dropdown-cont");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-app')) {
          openDropdown.classList.remove('show-app');
          document.getElementById("bloc-appareils").classList.remove('changeWidth');
        }
      }
    }
    if (!event.target.matches('input.input-ustensiles, i.unroll-ustensiles')) {
      var dropdowns = document.getElementsByClassName("dropdown-cont");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show-ust')) {
          openDropdown.classList.remove('show-ust');
          document.getElementById("bloc-ustensiles").classList.remove('changeWidth');
        }
      }
    }
    if (!event.target.matches('input.input-ingredient, i.unroll-ingredients')) {
        var dropdowns = document.getElementsByClassName("dropdown-cont");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-ing')) {
              openDropdown.classList.remove('show-ing');
              document.getElementById("bloc-ingredients").classList.remove('changeWidth');
            }
        }
    }
}
renderListAppareils(noDuplicateAppareils);