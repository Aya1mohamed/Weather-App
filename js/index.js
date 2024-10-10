let searchInput = document.getElementById("search");

let dayName = document.getElementById("dayName");
let todayDayNum = document.getElementById("todayDayNum");
let todayDateMonth = document.getElementById("todayDateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayImg = document.getElementById("todayImg");
let todayConText = document.getElementById("todayConText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDir = document.getElementById("windDir");
let nextDay = document.getElementsByClassName("tom-day-name");
let nextDayImg = document.getElementsByClassName("tom-day-img");
let nextMaxTemp = document.getElementsByClassName("tom-max");
let nextMinTemp = document.getElementsByClassName("tom-min");
let nextText = document.getElementsByClassName("tom-text");
let date = new Date();

async function getWeatherData (cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1c8e95f88a894561ad8110003241010&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json();
    return weatherData;
}
searchInput.addEventListener("input" , function(){
    startApp(searchInput.value)

})
function displayToday(data){
    let todayDate = new Date();
    dayName.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday:"long"})
    todayDayNum.innerHTML = todayDate.getDate();
    todayDateMonth.innerHTML = todayDate.toLocaleDateString("en-us" , {month:"long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayImg.setAttribute("src", "https:" + data.current.condition.icon);
    todayConText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph +"km/h";
    windDir.innerHTML = data.current.wind_dir;


}

function displayNext(data){
    for (let i =0 ; i <2 ; i++){
        let nextDate = new Date(data.forecast.forecastday[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us" , {weekday:"long"})
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextDayImg[i].setAttribute("src", "https:" + data.forecast.forecastday[i+1].day.condition.icon)
        nextText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text

    }


}

async function startApp (city="cairo"){
    let weatherData = await getWeatherData(city);
    displayToday(weatherData)
    displayNext(weatherData)

}
startApp()

