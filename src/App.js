import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SunAnimation from './components/SunAnimation';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
        const hours = date.getHours().toString().padStart(2, '0'); // Obtenir l'heure en format 24h
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtenir les minutes
        return `${hours}:${minutes}`;
    };

    return (
        <div className='weatherContainer'>
            {loading ? (
                <div>Chargement...</div>
            ) : error ? (
                <div>Erreur: {error.message}</div>
            ) : weatherData ? (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <h1>{weatherData.main.temp.toFixed(1)}°</h1>
                    <span className='getWeatherIcon'>{getWeatherIcon(weatherData.weather[0].id)}</span>
                    <h3 className='weatherDescription'>{weatherData.weather[0].description}</h3>
                    <div className='sunAnimation'>
                        <SunAnimation sunrise={weatherData.sys.sunrise} sunset={weatherData.sys.sunset} />
                    </div>
                    <div className='hoursContainer'>
                        <div className="sunrise-time">
                            {formatTime(weatherData.sys.sunrise)}
                        </div>
                        <div className="sunset-time">
                            {formatTime(weatherData.sys.sunset)}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default App;
