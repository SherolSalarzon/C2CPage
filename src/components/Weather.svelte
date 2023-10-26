<script>
    import { onMount } from 'svelte';

    let temperature = '';
    let icon = '';

    function hasGeolocationPermission() {
        return new Promise((resolve) => {
            if (!navigator.permissions) {
                return resolve(false);
            }

            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                resolve(result.state === 'granted');
            });
        });
    }

    async function getLocation() {
        const hasPermission = await hasGeolocationPermission();

        if (hasPermission) {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        } else {
            return 'Winnipeg';
        }
    }

    async function getWeatherData(location) {
        // Openweather Api Key
        const apiKey = '';
        const lat = location.coords ? location.coords.latitude: ''; 
        const lon = location.coords ? location.coords.longitude: ''; 
        const weatherURL = location.coords ? 
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric` :
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        let response = await fetch(weatherURL);
        if (!response.ok) {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${apiKey}&units=metric`);
        }
        const data = await response.json();
        return data;
    }

    function updateWeatherUI(temp, icn) {
        temperature = Math.ceil(temp) + "°C";
        icon = `https://openweathermap.org/img/wn/${icn}@2x.png`;
        
        humidity = Math.ceil(hum)+"%";
        windspeed = Math.ceil(wind * 3.6) + " km/h";
    }


    async function weather() {
        try {
            let position = await getLocation();
            let data = await getWeatherData(position);
            const temperature = data.main.temp;
            const icon = data.weather[0].icon;
            updateWeatherUI(temperature, icon);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    onMount(async () => {
        await weather();
    });
</script>

<div id="weather" class="text-white self-center m-5">
    <img id="icon" src={icon} alt="Weather icon">
    <h1 id="temperature">
        {temperature}
    </h1>
</div>

<style>
    #weather {            
        text-align: center;
        background-color: #21229B;
        width: 150px;
        height: 150px;
        border-radius: 15px;
    }
    #temperature {
        font-size: 30px;
    }

    #icon {
        width: 100px;
        padding: 5px;
        margin-left: auto;
        margin-right: auto;
    }
</style>