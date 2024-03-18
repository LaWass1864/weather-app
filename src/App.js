import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SunAnimation from './components/SunAnimation';
import 'animate.css';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        // Fonction pour déterminer s'il fait jour ou nuit en fonction de l'heure
        const determineTimeOfDay = () => {
            const currentHour = new Date().getHours();
            const isDayTime = currentHour >= 6 && currentHour < 18;
            setIsDay(isDayTime);

        };

        // Appeler la fonction pour déterminer l'heure au montage et mettre en place un intervalle pour mettre à jour l'état toutes les heures
        determineTimeOfDay();
        const interval = setInterval(determineTimeOfDay, 1000 * 60 * 60);

        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Vérifier si la géolocalisation est prise en charge par le navigateur
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getWeatherData, handleLocationError);
            } else {
                setError(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
                setLoading(false);
            }
        };

        // Aller chercher les données de l'API météo
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

    const isSunset = (sunsetTimestamp) => {
        const currentTime = new Date().getTime() / 1000; // Convertir en secondes
        return currentTime > sunsetTimestamp;
    };

    //  mettre un icon en fonction du temps
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

    // formattage de l'heure du lever et du coucher du soleil
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
        const hours = date.getHours().toString().padStart(2, '0'); // Obtenir l'heure en format 24h
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtenir les minutes
        return `${hours}:${minutes}`;
    };

    return (
        <div className={`App ${!loading && weatherData && isSunset(weatherData.sys.sunset) ? 'sunsetBackground' : ''}`}>
            <div className={`weatherContainer ${isDay ? 'day' : 'night'}`}>
                {loading ? (
                    <div>Chargement...</div>
                ) : error ? (
                    <div>Erreur: {error.message}</div>
                ) : weatherData ? (
                    <div>
                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <h1>{weatherData.main.temp.toFixed(1)}°</h1>
                        <span className='getWeatherIcon animate__animated animate__bounce'>{getWeatherIcon(weatherData.weather[0].id)}</span>
                        <h3 className='weatherDescription'>{weatherData.weather[0].description.toUpperCase()}</h3>
                        <SunAnimation sunrise={weatherData && weatherData.sys.sunrise} sunset={weatherData && weatherData.sys.sunset} />
                        <div className="hourContainer">
                            <em>{formatTime(weatherData.sys.sunrise)}</em>
                            <em>{formatTime(weatherData.sys.sunset.toFixed(1))}</em>
                        </div>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sunrise" width="26" height="26" viewBox="0 0 26 26" strokeWidth="1" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                                <path d="M3 21l18 0" />
                                <path d="M12 9v-6l3 3m-6 0l3 -3" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sunset" width="26" height="26" viewBox="0 0 26 26" strokeWidth="1" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                                <path d="M3 21l18 0" />
                                <path d="M12 3v6l3 -3m-6 0l3 3" />
                            </svg>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
