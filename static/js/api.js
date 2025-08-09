import * as config from './variables.js';
import * as storageConfig from './storage.js'
// Variables liées a l'utilisation de l'api

 let basicUrl=   'https://api.openweathermap.org/data/2.5/weather';
 let apiKey=  "06e733cda551b27354299ab5d9e458fc";
 let researchOptions=  "&units=metric&lang=fr";

let villeName = "";

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
        config.loadingError();
        throw new Error('Ville non trouvée');
        
    }
    config.loading();
    let data = await response.json();
    villeName = data.name;
    // Récupérer le type de météo
    let meteoType = data.weather[0].main.toLowerCase();
    // Changer le background en fonction de la météo
    let infosMeteoWrapper = document.querySelector('.infos-meteo');
    infosMeteoWrapper.classList.remove("clear", "rain", "clouds", "snow", "thunderstorm");
    infosMeteoWrapper.classList.add(meteoType);
    
    let descriptionData = data.weather[0].description
    let iconData = data.weather[0].icon
    let temperatureData = Math.floor(data.main.temp);
    let minTemperatureData = Math.floor(data.main.temp_min);
    let maxTemperatureData = Math.ceil(data.main.temp_max);

    config.ville.textContent = villeName
    config.icone.src = `https://openweathermap.org/img/wn/${iconData}@2x.png`;//Afficher l'icone
    let descriptionTexte = config.capitalizeFirstLetter(descriptionData);
    config.description.textContent = descriptionTexte;//Afficher la description
    config.temperature.textContent = `${temperatureData}°` ; // Afficher la température
    if(minTemperatureData !== maxTemperatureData){
        config.minTemperature.textContent = `↓${minTemperatureData}°`;
        config.maxTemperature.textContent = `↑ ${maxTemperatureData}°`;
    }

    storageConfig.loadNoteDuJour(nameVille);
    let historiqueEntry = {
        ville: config.ville.textContent,
        temperature : config.temperature.textContent,
        icone: config.icone.src,
        description : config.description.textContent,
        note: "",
        date: config.getDate() ,
       modify: false
            };
    let historique = JSON.parse(localStorage.getItem('historique')) || [];
    historique.push(historiqueEntry);
    localStorage.setItem('historique', JSON.stringify(historique));
    
}


//
const apiConfig = {
    getWeather,
}


export default apiConfig;