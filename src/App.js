import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // demander la geolocalisation a l'utilisateur
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
                    console.log(res.data)

                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        };

        // gestion des erreurs lors de la récupération de la position géographique de l'utilisateur.
        const handleLocationError = (error) => {
            setError(new Error(`Erreur de géolocalisation: ${error.message}`));
            setLoading(false);
        };

        getLocation();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error.message}</div>;

    // Synchronisation du temps avec des icônes
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

    // formater l'heure du lever et du coucher du soleil

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };


    return (
        <div>
            {weatherData && (
                <div className='weatherContainer'>
                    <h2>{weatherData.name}</h2>
                    <div className="temperatureIcon">
                        <h3>{weatherData.main.temp.toFixed(1)}°</h3>
                        <p>{getWeatherIcon(weatherData.weather[0].id)}</p>
                    </div>
                    <em>{weatherData.weather[0].description}</em>
                    {/* lever et coucher du soleil */}
                    <em>Lever du soleil : {formatTime(weatherData.sys.sunrise)}</em>
                    <em>Coucher du soleil : {formatTime(weatherData.sys.sunset)}</em>

                </div>
            )}
        </div>
    );
};

export default App;