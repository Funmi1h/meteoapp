import * as config from './variables.js'


 function showHistorique(){
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    config.historiqueContainer.innerHTML ="";
    historique.forEach(entry =>{
        let card = document.createElement('div');
        card.classList.add('historique-carte');
        card.innerHTML = `
        <h3> ${entry.ville}</h3>
        <img src = "${entry.icone}" alt = "meteo">
        <p>${entry.temperature} - ${entry.description}</p>
        <p class="note">${entry.note}</p>
        <p class="date">${entry.date}</p>
        `;
        
        let btnDeleteCard = document.createElement('ion-icon');
        btnDeleteCard.setAttribute("name", "trash-outline");
        btnDeleteCard.classList.add('btn-delete-card')
        card.appendChild(btnDeleteCard);
        config.historiqueContainer.appendChild(card);
        btnDeleteCard.addEventListener('click', ()=>{
    deleteNoteFromHistorique(entry.ville, entry.date.split("à")[0]);
})

    });
    showBtnDeleteHistorique();

 

}

function deleteNoteFromHistorique(villeAsupprimer, dateASupprimer){
    console.log('Supprimer la carte')
    let historique = JSON.parse(localStorage.getItem('historique')) || [];
    historique = historique.filter( entry =>
      !(entry.ville === villeAsupprimer && entry.date.split("à")[0]=== dateASupprimer));
      localStorage.setItem('historique', JSON.stringify(historique));
      showHistorique()
}

//montrer le boutton deletehistorique
function showBtnDeleteHistorique() {
    const container = config.historiqueContainer;
    const btnDelete = config.btnDeleteHistorique;

    if (!container || !btnDelete) return; // sécurité si un élément est introuvable

    const contenuTexte = container.textContent.trim();
    const contenuHTML = container.innerHTML.trim();

    const estVide = contenuTexte === "L'historique est vide" || contenuHTML === "";

    if (estVide) {
        container.textContent = "L'historique est vide";
        btnDelete.style.display = "none";
    } else {
        btnDelete.style.display = "block";
    }
}


export function loadNoteDuJour(villeRecherchee){
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    let dateSansHeure = config.getDate().split("à")[0];
    let noteDuJour = historique.find(entry =>{
    let entryDataSansHeure = entry.date.split("à")[0];
    return entry.ville === villeRecherchee && entryDataSansHeure ===dateSansHeure
});
 if (noteDuJour) {
    let noteArea = document.getElementById('note-texte')
    noteArea.value = noteDuJour.note;
    config.noteTexte.textContent = noteDuJour.note;
    config.containerNote.style.display = 'flex';
    config.formAddNote.style.display = 'none';
    config.btnAddNote.style.display = 'none';
    document.querySelector('.note-date').textContent = noteDuJour.date;
    } else {
    // On a pas trouver d'entrée 
    config.noteTexte.textContent = "";
    config.containerNote.style.display = 'none';
    config.btnAddNote.style.display = 'block';
    showHistorique()
    }
};

export {showHistorique};
export {showBtnDeleteHistorique}