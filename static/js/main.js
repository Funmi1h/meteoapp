import * as config from './variables.js'
import apiConfig  from './api.js';
import  * as storageConfig from "./storage.js"


document.addEventListener('DOMContentLoaded', () =>{
    config.setTheme()

})

config.btnSearchCity.addEventListener('click', ()=>{
    config.askVille.style.display = 'flex';
    document.querySelector('.main-wrapper').style.display = 'none'

})

if (config.noteTexte.textContent === false){
    config.btnAddNote.style.display = 'none';
    config.containerNote.style.display = 'flex';
}


config.setUpForm(config.askVille);

// Ajouter une note c'est bon n'y touche plus
function addNote(form){
    config.containerNote.style.display = 'none'
    config.btnAddNote.style.display = 'none';
    form.style.display = 'flex';

    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        // Supprimer l'ancien message d'erreur si xa existe
        let existingError = form.querySelector('.note-error')
        if (existingError) existingError.remove();
        let formData = new FormData(form);
        let noteValue = formData.get('note-texte').trim()
        if (noteValue === ""){
            let spanEmptyNote = document.createElement('span');
            spanEmptyNote.classList.add('note-error');
            spanEmptyNote.textContent = "Veuillez écrire une note avant de l'enregistrer.";
            spanEmptyNote.style.color = 'white';
            config.formAddNote.appendChild(spanEmptyNote);
            return;            
        } 
        form.style.display = 'none';
        config.noteTexte.textContent = formData.get('note-texte');
        config.containerNote.style.display = 'flex';
        document.querySelector('.note-date').textContent = config.getDate();


        // Récupérer et mettre a jour la nouvelle note
        let historique = JSON.parse(localStorage.getItem('historique')) || [];

        // Créer l'entrée pour la nouvelle note
         let historiqueEntry = {
            ville: config.ville.textContent,
            temperature : config.temperature.textContent,
            icone: config.icone.src,
            description : config.description.textContent,
            note: noteValue,
            date: config.getDate() ,
            modify: false
        };

        let dateSansHeure = config.getDate().split("à")[0]; 

        // Supprimer les anciennes entrées du jour pour une mm ville
        historique = historique.filter(entry =>{
            let entryDateSansHeure = entry.date.split("à")[0]
            return !(entry.ville === config.nameVille && entryDateSansHeure === dateSansHeure)
    });
    // ajouter la nouvelle entrée
    historique.push(historiqueEntry);

    localStorage.setItem("historique", JSON.stringify(historique)); // Mise a jour du localStorage  
    storageConfig.showHistorique();
    })

}
config.btnAddNote.addEventListener('click', () =>addNote(config.formAddNote))

config.annulerFormAddNote.addEventListener('click', ()=>{
    config.formAddNote.style.display = 'none';
    config.btnAddNote.style.display = 'flex';
    loadNoteDuJour(nameVille)
})

storageConfig.showHistorique()


// event au click sur le btn historique
config.btnHistorique.addEventListener('click', ()=> {
    document.querySelector('.historique-and-close').style.display= 'block';
    config.historiqueContainer.style.display = 'flex';
    // Affichage du boutton pour fermer
})
config.closeBtn.addEventListener('click', ()=>{
    document.querySelector('.historique-and-close').style.display = 'none';
} )







// Pour supprimer la note c'est bon on n'y touche plus
function deleteNote(){
    let textarea  = document.querySelector('[name="note-texte"]');
    textarea.value = ""
    config.noteTexte.textContent = "";
    config.containerNote.style.display = 'none';
    config.btnAddNote.style.display = 'block';
}
document.querySelector('.btn-delete').addEventListener('click', ()=> deleteNote());

// Pour modifier la note c'est bon n'y touche plus
function modifyNote(){
    document.querySelector('.container-paragraphe-note').style.display = "none";
    config.formAddNote.style.display = 'flex';
    addNote(config.formAddNote);
}
document.querySelector('.btn-modifiy').addEventListener('click', ()=>modifyNote());

//Pour afficher plus d'options. N'y touche plus
config.moreOptionsBtn.addEventListener('click', ()=>{
    document.querySelector('.options-box').classList.toggle('show');
    moreOptionsBtn.classList.toggle('turn');
});

//Supprimer l'historique
config.btnDeleteHistorique.addEventListener('click', ()=>{

    config.historiqueContainer.innerHTML = "";
    config.historiqueContainer.textContent = "L'historique est vide"
    localStorage.removeItem("historique");
    storageConfig.showBtnDeleteHistorique()
})








document.getElementById("toggle-dark-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
