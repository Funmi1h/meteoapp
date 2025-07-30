// Déclaration des variables 

let loader = document.querySelector('.loader');
let askVille = document.querySelector('.ask-ville');
let mainWrapper = document.querySelector('.main-wrapper');
let btnAskVille = document.getElementById('ask-ville-submit');
let ville = document.querySelector('.ville');
let prenomVille = document.querySelector('.ask-ville');
let divAddNote = document.querySelector('.add-note')
let btnAddNote = document.getElementById('btn-add-note');
let formAddNote = document.querySelector('.add-note-form');
let noteTexte  = document.querySelector('.paragraphe-note-texte');

// Affichage du loader  et du mainWrapper
    /* Fonctionne bien pas touche */

btnAskVille.addEventListener('click', () =>{
    askVille.style.display = 'none';
    loader.style.display = 'flex';
    setTimeout(() =>{
        mainWrapper.style.display = 'block';
        loader.style.display = 'none'

    }, 3000)
});


/*

function takeCity(form){
    form = new FormData(form);
    form.addEventListener('click', (event) =>{
        event.preventDefault();
        form.style.display = 'none';
        // Un setIntervel pour faire un chargement 

        // Afficher la ville en haut
        ville.textContent = form.get('ville');



    })
    
    // Logique pour récupérer la ville et trouver la météo grace a l'API

    // Logique pour mettre le nom en haut 
}
*/

function addNote(form){
    btnAddNote.style.display = 'block';
    form.style.display = 'flex';
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        let formData = new FormData(form);
        form.style.display = 'none'

        // On crée l'élement qui va contenir le texte de la note
        console.log('Le formulaire est soumis');
        noteTexte.textContent = formData.get('note-texte');



    })
}

btnAddNote.addEventListener('click', addNote(formAddNote))