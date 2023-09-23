let submit = document.querySelector(".submit");
let cityInput = document.querySelector(".cityInput");
let cityName = document.querySelector(".cityName");
let cityStatus = document.querySelector(".status");
let statusImg = document.querySelector(".imgStatus");
let temperature = document.querySelector(".temperature");
let feels = document.querySelector(".feels");
let humidity = document.querySelector(".humidity");
const slider = document.getElementById('slider');

let celcius = false;
let temperatureC = 0;
let feelsC = 0;
let temperatureF= 0;
let feelsF = 0;

async function getWeatherData(cityName){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=c265d926cb1d49f1a7c175354232109&q=${cityName}&aqi=no`,{mode: 'cors'})
    let weatherJson = await response.json();
    
    let nameHolder = weatherJson.location.name;
    let statusHolder = weatherJson.current.condition.text;
    let humidityHolder = weatherJson.current.humidity;

    temperatureC = weatherJson.current.temp_c
    feelsC = weatherJson.current.feelslike_c;                                                                         

    temperatureF = weatherJson.current.temp_f;
    feelsF = weatherJson.current.feelslike_f;
    if(celcius!==true){
        let temperatureHolder = weatherJson.current.temp_f;
        let feelsHolder = weatherJson.current.feelslike_f;

        build(nameHolder,statusHolder,temperatureHolder,feelsHolder,humidityHolder);
    }
    else{
        let temperatureHolder = weatherJson.current.temp_c;
        let feelsHolder = weatherJson.current.feelslike_c;

        build(nameHolder,statusHolder,temperatureHolder,feelsHolder,humidityHolder);
    }
};

getWeatherData("toronto");

submit.addEventListener("click", ()=>{
    getWeatherData(cityInput.value);
})

const build = (a,b,c,d,e) =>{
    cityName.innerHTML = a;
    cityStatus.innerHTML = b;
    humidity.innerHTML = e + "%";
    if(celcius){
        temperature.innerHTML = c + "&#8451;";
        feels.innerHTML = d + "&#8451;";
    }
    else{
        temperature.innerHTML = c + "&#8457;";
        feels.innerHTML = d + "&#8457;";
    }   
}


slider.addEventListener('input', function () {
    if (slider.value === '0') {
        sliderValue.textContent = 'Option 1';
    } else if (slider.value === '1') {
        sliderValue.textContent = 'Option 2';
    }
});

slider.addEventListener('click', function () {
    if (slider.value === '0') {
        slider.value = '1';
        temperature.innerHTML = temperatureF + "&#8457";
        feels.innerHTML = feelsF + "&#8457;";
        console.log(celcius, temperatureF, feelsF);

    } else if (slider.value === '1') {
        temperature.innerHTML = temperatureC + "&#8451;";
        feels.innerHTML = feelsC + "&#8451;";
        slider.value = '0';
    }
});