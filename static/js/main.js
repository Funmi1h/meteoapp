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

function loadingError(){
    errorLoader.style.display = 'flex';
    btnRetry.addEventListener('click', ()=>{
        location.reload();
        askVille.style.display = 'none';
    }
    )
}




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
    console.log(cityName)

    // L'url dynamique
    let researchUrl = `${basicUrl}?q=${cityName}&appid=${apiKey}${researchOptions}`;
    console.log(researchUrl)
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


}


setUpForm(askVille);






// Avec cette fonction je peux ajouter de note mais le boutton pour le faire a u mauvais comportemnt
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