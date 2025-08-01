// Déclaration des variables 

let loader = document.querySelector('.loader');
let askVille = document.querySelector('.ask-ville');
let mainWrapper = document.querySelector('.main-wrapper');
let btnAskVille = document.getElementById('ask-ville-submit');
let ville = document.querySelector('.ville');
let icone = document.querySelector('.icone');
let temperature = document.querySelector('.temperature');
let minTemperature = document.querySelector('.min-temperature');
let maxTemperature = document.querySelector('.max-temperature')
let description = document.querySelector('.description');
let prenomVille = document.querySelector('.ask-ville');
let divAddNote = document.querySelector('.add-note')
let btnAddNote = document.getElementById('btn-add-note');
let formAddNote = document.querySelector('.add-note-form');
let noteTexte  = document.querySelector('.paragraphe-note-texte');
let containerNote = document.querySelector('.container-paragraphe-note')

let btnRetry = document.querySelector('.retry');
let errorLoader = document.querySelector('.loader-error')
// Variables liées a l'utilisation de l'api
let basicUrl = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey = "6ed894d9cf622e893a90258dafb5819b";
let researchOptions = "&units=metric&lang=fr";


// Affichage du loader  et du mainWrapper
    /* Fonctionne bien pas touche */
function loading(){
    askVille.style.display = 'none';
    loader.style.display = 'flex';
    setTimeout(() =>{
        mainWrapper.style.display = 'block';
        loader.style.display = 'none'

    }, 3000);

}
// Loading en cas d'erreur; Cette fonction fonctionne n'y touche pas
function loadingError(){
    errorLoader.style.display = 'flex';
    btnRetry.addEventListener('click', ()=>{
        location.reload();
        askVille.style.display = 'none';
    }
    )
}



// Xa fonctionne
function setUpForm(form){
    form.addEventListener('submit', (event) =>{
        event.preventDefault();  
        getWeather(form);
        form.style.display = 'none';
    });
}

function capitalizeFirstLetter(text){
   return text[0].toUpperCase() + text.slice(1)    
}


async function getWeather(form) {  
    let formData = new FormData(form);  
    let cityName = formData.get('ville'); // Récupérer le nom de la ville 
    cityName=  encodeURIComponent(cityName); // Lorsque la ville a des caracteres spéciaux
    console.log(cityName);

    // L'url dynamique
    let researchUrl = `${basicUrl}?q=${cityName}&appid=${apiKey}${researchOptions}`;
    console.log(researchUrl);
    // Appel a l'API avec fetch
    let response = await fetch(researchUrl);
    if(response.ok === false){
        // Logique pour montrer au user que la ville n'est pas trouvée
        loadingError();
        throw new Error('Ville non trouvée');
        
    }
    loading();
    let data = await response.json();
    let nameVille = data.name;
    let descriptionData = data.weather[0].description
    let iconData = data.weather[0].icon
    let temperatureData = Math.floor(data.main.temp);
    let minTemperatureData = Math.floor(data.main.temp_min);
    let maxTemperatureData = Math.ceil(data.main.temp_max);

    ville.textContent = nameVille
    icone.src = `https://openweathermap.org/img/wn/${iconData}@2x.png`;//Afficher l'icone
    let descriptionTexte = capitalizeFirstLetter(descriptionData);
    description.textContent = descriptionTexte;//Afficher la description
    temperature.textContent = `${temperatureData}°` ; // Afficher la température
    if(minTemperatureData !== maxTemperatureData){
        minTemperature.textContent = `↓${minTemperatureData}°`;
        maxTemperature.textContent = `↑ ${maxTemperatureData}°`;
    }


    // Afficher la note si elle existe déja 
    afficherNoteSiExistante(nameVille, getDate())


}

function afficherNoteSiExistante(ville, date) {
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    let entry = historique.find(e => e.ville === ville && e.date === date);

    if (entry) {
        noteTexte.textContent = entry.note;
        document.querySelector('.note-date').textContent = entry.date;
        containerNote.style.display = 'flex';
        btnAddNote.style.display = 'none';
    } else {
        noteTexte.textContent = "";
        containerNote.style.display = 'none';
        btnAddNote.style.display = 'block';
    }
}


setUpForm(askVille);




// Ajouter une note c'est bon n'y touche plus
function addNote(form){
    containerNote.style.display = 'none'
    btnAddNote.style.display = 'none';
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
            formAddNote.appendChild(spanEmptyNote);
            return   ;            
        } 
        form.style.display = 'none';
        noteTexte.textContent = formData.get('note-texte');
        containerNote.style.display = 'flex';
        document.querySelector('.note-date').textContent = getDate();


        // Récupérer et mettre a jour la nouvelle note
        let historique = JSON.parse(localStorage.getItem('historique')) || [];

        // Créer l'entrée pour la nouvelle note
         let historiqueEntry = {
            ville: ville.textContent,
            temperature : temperature.textContent,
            icone: icone.src,
            description : description.textContent,
            note: noteValue,
            date: getDate() 
        };

        let dateSansHeure = getDate().split(" à")[0]; // exemple : "01/08/2025"

        // Supprimer les anciennes entrées du jour pour une mm ville
        historique = historique.filter(entry =>{
            let entryDateSansHeure = entry.date.split(" à")[0]
            return !(entry.ville === nameVille && entryDateSansHeure === dateSansHeure)
    });
    // ajouter la nouvelle entrée
    historique.push(historiqueEntry);

    localStorage.setItem("historique", JSON.stringify(historique)); // Mise a jour du localStorage  
    })

}
btnAddNote.addEventListener('click', () =>addNote(formAddNote))

function getDate(){
    let now = new Date();
    let day = String(now.getDate()).padStart(2, "0");
    let month =String(now.getMonth() +1).padStart(2, "0");
    let year = now.getFullYear();
    let hour = now.getHours()
    return `${day}/${month}/${year} à ${hour}h`;

}


let historiqueContainer = document.querySelector('.historique-container');

function showHistorique(){
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    historiqueContainer.innerHTML = "";
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
        historiqueContainer.appendChild(card);
    });
}
window.addEventListener('load', showHistorique);
document.getElementById('btn-historique').addEventListener('click', ()=> {
    historiqueContainer.style.display = 'flex';
})
// Pour supprimer la note c'est bon on n'y touche plus
function deleteNote(){
    let textarea  = document.querySelector('[name="note-texte"]');
    textarea.value = ""
    noteTexte.textContent = "";
    containerNote.style.display = 'none';
    btnAddNote.style.display = 'block';
}
document.querySelector('.btn-delete').addEventListener('click', ()=> deleteNote());

// Pour modifier la note c'est bon n'y touche plus
function modifyNote(){
    document.querySelector('.container-paragraphe-note').style.display = "none"
    formAddNote.style.display = 'flex'
    addNote(form)
}
document.querySelector('.btn-modifiy').addEventListener('click', ()=>modifyNote())

//Pour afficher plusd'options. N'y touche plus
let moreOptionsBtn =document.querySelector('.dropdown');
moreOptionsBtn.addEventListener('click', ()=>{
    document.querySelector('.options-box').classList.toggle('show');
    moreOptionsBtn.classList.toggle('turn');
});

