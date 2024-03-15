import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SunAnimation from './components/SunAnimation';


const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getWeatherData, handleLocationError);
            } else {
                setError(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
                setLoading(false);
            }
        };

        const getWeatherData = (position) => {
            const { latitude, longitude } = position.coords;
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=3da62a8f0ff20ba967fb455d7a48a47a`
            )
                .then((res) => {
                    setWeatherData(res.data);
                    setLoading(false);
                    console.log(res.data);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        };

        const handleLocationError = (error) => {
            setError(new Error(`Erreur de géolocalisation: ${error.message}`));
            setLoading(false);
        };

        getLocation();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error.message}</div>;

    const getWeatherIcon = (weatherId) => {
        if (weatherId >= 200 && weatherId < 300) {
            return '⛈️'; // Orage
        } else if (weatherId >= 300 && weatherId < 400) {
            return '🌧️'; // Pluie
        } else if (weatherId >= 500 && weatherId < 600) {
            return '🌧️'; // Pluie
        } else if (weatherId >= 600 && weatherId < 700) {
            return '❄️'; // Neige
        } else if (weatherId === 800) {
            return '☀️'; // Ciel dégagé
        } else if (weatherId === 801 || weatherId === 802) {
            return '☁️'; // Quelques nuages
        } else if (weatherId === 803 || weatherId === 804) {
            return '☁️'; // Nuages épars
        } else {
            return ''; // Pas d'icône disponible
        }
    };

    return (
        <div className='weatherContainer'>
            {/*  éviter les erreurs si weatherData est nul ou non défini */}
            {weatherData && (
                <div>
                    {/* Ville, Pays */}
                    <h2>{weatherData.name},{weatherData.sys.country}</h2>
                    {/* Température*/}
                    <h1>{weatherData.main.temp.toFixed(1)}°</h1>
                    {/* Icon correspondant a l'état de la météo  */}
                    <span className='getWeatherIcon'>{getWeatherIcon(weatherData.weather[0].id)}</span>
                    {/* Description */}
                    <h3 className='weatherDescription'>{weatherData.weather[0].description}</h3>
                    <div className='sunAnimation'>
                        <SunAnimation sunrise={weatherData.sys.sunrise} sunset={weatherData.sys.sunset} />

                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
