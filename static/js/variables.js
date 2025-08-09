// Déclaration des variables 

import * as apiConfig from './api'

export let loader = document.querySelector('.loader');
export let askVille = document.querySelector('.ask-ville');
export let mainWrapper = document.querySelector('.main-wrapper');
export let btnAskVille = document.getElementById('ask-ville-submit');
export let ville = document.querySelector('.ville');
export let icone = document.querySelector('.icone');
export let temperature = document.querySelector('.temperature');
export let minTemperature = document.querySelector('.min-temperature');
export let maxTemperature = document.querySelector('.max-temperature')
export let description = document.querySelector('.description');
export let prenomVille = document.querySelector('.ask-ville');
export let divAddNote = document.querySelector('.add-note')
export let btnAddNote = document.getElementById('btn-add-note');
export let formAddNote = document.querySelector('.add-note-form');
export let noteTexte  = document.querySelector('.paragraphe-note-texte');
export let containerNote = document.querySelector('.container-paragraphe-note')
export let btnDeleteHistorique = document.querySelector('.btn-delete-historique');
export let annulerFormAddNote = document.querySelector('.annuler-form')
export let btnRetry = document.querySelector('.retry');
export let errorLoader = document.querySelector('.loader-error');
export let btnSearchCity = document.querySelector('.search-ville');
export let historiqueContainer = document.querySelector('.historique-container');
export let btnHistorique = document.getElementById('btn-historique');
export let closeBtn = document.querySelector('.close-btn');
export let moreOptionsBtn =document.querySelector('.dropdown');
export function capitalizeFirstLetter(text){
   return text[0].toUpperCase() + text.slice(1)    
};

export // Affichage du loader  et du mainWrapper
    /* Fonctionne bien pas touche */
function loading(){
    askVille.style.display = 'none';
    loader.style.display = 'flex';
    setTimeout(() =>{
        mainWrapper.style.display = 'block';
        loader.style.display = 'none'

    }, 3000);

};
// Loading en cas d'erreur; Cette fonction fonctionne n'y touche pas
export function loadingError(){
    errorLoader.style.display = 'flex';
    btnRetry.addEventListener('click', ()=>{
        location.reload();
        askVille.style.display = 'none';
    }
    )
};

export let nameVille;

export function getDate(){
    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month =String(now.getMonth() +1).padStart(2, "0");
    let year = now.getFullYear();
    let hour = now.getHours()
    return `${day}/${month}/${year} à ${hour}h`;

}

export // Xa fonctionne
function setUpForm(form){
    form.addEventListener('submit', (event) =>{
        event.preventDefault();  
        apiConfig.getWeather(form);
        form.style.display = 'none';
    });
};


