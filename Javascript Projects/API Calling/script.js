document.addEventListener("DOMContentLoaded",()=>{
    let inputCity = document.getElementById("city-input");
    let buttonCheck = document.getElementById("check-weather");
    let information = document.getElementById("information");
    let cityName = document.getElementById("city-name");
    let temperatureDetail = document.getElementById("temperature-detail");
    let weatherDetail = document.getElementById("weather-detail");

    let errorDetail = document.getElementById("error-detail");

    buttonCheck.addEventListener("click",async()=>{
        let city = inputCity.value.trim();
        // console.log(city);

        let data = await fetchData(city);
        cityName.textContent = data.name;
        temperatureDetail.innerHTML = `Temperature : ${data.main.temp}`;
        weatherDetail.innerHTML = `Weather : ${data.weather[0].description}`;
        
        information.classList.remove("hidden");
        errorDetail.classList.add("hidden");
        
    });

    const API_KEY = "ce348333cc7558a2f0e70a9bb966be70";
    async function fetchData(city){
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

            let result = await fetch(url);
            
            if(!result.ok){
                throw new Error();
            }

            let data = await result.json();
            console.log(data);
            return data;
        }catch(error){
            showerror();
        }
    }

    function showerror(){
        errorDetail.classList.remove("hidden");
        information.classList.add("hidden")
    }
})

