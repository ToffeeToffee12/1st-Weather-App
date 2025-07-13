const search = document.getElementById("searchBar");

const coordiantes = document.getElementById("coordinates")
const countryName = document.getElementById("country");
const cityName = document.getElementById("city")
const placeEmoji = document.getElementById("weatherEmoji");

const temperatureText = document.getElementById("temperature");
const humidityText = document.getElementById("humidity");
const pressureText = document.getElementById('pressure');

const apiKey = "Your API";

const mainWeather = document.getElementById('mainWeather');
const descWeather = document.getElementById('descWeather');
const dateToday = document.getElementById('date');
const emoji = document.getElementById('weatherEmoji')

const windSpeed = document.getElementById('windSpeed');
const windGust = document.getElementById('windGust');
const windDeg = document.getElementById('windDeg');

const celciousBtn = document.getElementById('celcious')
const fahrenheitBtn = document.getElementById('fahrenheit')

async function getWeatherInfo(city){
  try{
    const weatherapi = await fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
    if (!weatherapi.ok){
      console.log("Data cannot be fetched");
      search.style.backgroundColor = "maroon";
      search.value = "invalid Place ame"
      search.disabled = true;
      
       setTimeout(() => {
      search.placeholder = "Enter Place";
      search.disabled = false;
      search.style.backgroundColor = "var(--subColor2_2)";
      search.value = '';
  }, 1000);

    }
    else{
        const data = await weatherapi.json();
        console.log(data)
       
        /* Set main card Info */
       const {city: {name:city, country:country, coord:{lat:lat, lon:long }} } = data
       const dataToday = data.list[0]
        
       countryName.innerText = country;
       cityName.innerText = city;
       coordinates.innerText = `Coordinates: ${lat} ${long}` 

    console.log(dataToday)

       const {main: {temp:temp , humidity:humidity , pressure:pressure} } = dataToday; 
      //Humidity Pressure and Temperature
       humidityText.innerText = ` ${humidity} %` ;
       pressureText.innerText =` ${pressure} hPA`;
       temperatureText.innerText = `${temp}`;
      let fahrenheit = (parseInt(temp) * 9/5) + 32;
      let FisActive = false;
      fahrenheitBtn.addEventListener('click', ()=>{
        if (!FisActive){
        temperatureText.innerText = `${fahrenheit}`
        FisActive = true
        celciousBtn.style.color = "var(--subColor2_1)";
        fahrenheitBtn.style.color="var(--subColor2_3)"
        }
      })
       celciousBtn.addEventListener('click', ()=>{
        if(FisActive){
        temperatureText.innerText = `${temp}`
        celciousBtn.style.color = "var(--subColor2_3)";
         fahrenheitBtn.style.color="var(--subColor2_1)"
        FisActive = false;
        }
      })
      // Wind Info
      const {wind:{speed:speed, gust:gust,deg:deg}} = dataToday
      console.log(speed, gust, deg)
      windSpeed.innerText = `Wind Speed: ${speed} m/s`;
      windGust.innerText = `Gust Speed: ${gust} m/s`;
      windDeg.innerText = `Wind Direction ${deg}°`;
      // Description and Date
      const {dt_txt:date, weather:{0:{description:desc, main:main, icon:iconId}} } = dataToday
      console.log(date, desc, main, iconId)
      dateToday.innerText = `As of ${date}`;
      mainWeather.innerText = `${main}`;
      descWeather.innerText = `${desc}`;

      try{

        const iconResponse = await fetch(`https://openweathermap.org/img/wn/${iconId}@2x.png`)
        console.log(iconResponse.url)

        if(iconResponse.ok){

          emoji.src = iconResponse.url

        }
        else{
          console.log("image not available")
        }

      }
      catch{

        console.log("Image cannot be found")

      }



       
       



    }



  }
  catch(error){
    console.log(error);
  }
}

/*Is place available?*/ 


/*get info?*/

search.addEventListener("keydown",  (event)=>{
    if(event.key === "Enter"){
     getWeatherInfo(search.value)
     event.preventDefault();

    }
})
