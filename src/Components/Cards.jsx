import React, { useEffect, useState } from 'react';
import sunny from '../Assets/sunny.png'
import rainy from '../Assets/rainy.png'
import snowy from '../Assets/snowy.png'
import windy from '../Assets/windy.png'
import img1 from '../Assets/location.png'

const Cards = () => {
    const [city, setCity] = useState('');
    const [time, settime] = useState('');
    const [forecast, setForecast] = useState([]);
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_KEY = process.env.REACT_APP_API_URL;
                const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
                let apiUrl = `${BASE_URL}?q=${city}&appid=${API_KEY}`;

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const forecastData = filterForecast(data.list, date);
                console.log(data)

                setForecast(forecastData);
                settime(data.city)
                setError(null);
            } catch (error) {
                setForecast([]);
                setError('Error fetching data. Please check the city and country.');
            }
        };

        if (city) {
            fetchData();
        }
    }, [city, date]);

    const filterForecast = (list, selectedDate) => {
        const filteredData = [];
        const processedDates = new Set();

        list.forEach((day) => {
            const date = new Date(day.dt * 1000).toDateString();
            if (!processedDates.has(date)) {
                filteredData.push(day);
                processedDates.add(date);
            }
        });
        const timestamp = new Date(selectedDate).getDate();
        let dateIndex = 0;
        filteredData.forEach((day, index) => {
            const dateObject = new Date(day.dt * 1000).getDate();
            if (timestamp == dateObject) {
                dateIndex = index
            }
        });

        return filteredData.slice(dateIndex, 5 + dateIndex);
    };
    const weatherConditionImages = {
        'Clouds': rainy,
        'Clear': sunny,
        'Snow': snowy,
        'Rain': rainy,
        'Drizzle': rainy,
        'Thunderstorm': windy,
        'Dust': windy,
        'Smoke': windy,
        'Mist': snowy,
        'Fog': windy,
        'Haze': rainy,

    };

    return (
        <div>
            <div className='outer'>
                <div className='forcast'>
                {time ? <>
                    <div className='details'>
                            <div className='city'>
                                <img src={img1} className="img1" />  {time.name},{time.country}
                            </div>
                            <div className='lat'>
                                {time.coord.lat} &{time.coord.lon}
                            </div>
                        </div>
                        </> : ""}
                    <div className="wrapper">
                        <div class="searchBar">
                            <input className="searchQueryInput" type="text" value={city} placeholder="Search"
                                onChange={(e) => setCity(e.target.value)} />
                            <svg className="searchQuerySubmit" style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </div>
                    </div>
                </div>
                {error && <p>{error}</p>}
                <div className="container">
                    <div className='card'>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className='input'
                        />
                        <p>High Temperature</p>
                        <p>Low Temperature</p>
                        <p>Humidity </p>
                        <p>Sunrise Time </p>
                        <p>Sunset Time </p>
                    </div>
                    {forecast.map((day, index) => (<>
                        <div key={index} className='weather-card'>
                            <h3 className='main'>{new Date(day.dt * 1000).toDateString()}</h3>
                            <div className='header'>
                                <img
                                    src={weatherConditionImages[day.weather[0].main]}
                                    alt={day.weather[0].description}
                                    className='img3'
                                />
                                <span >{day.weather[0].main}</span>
                            </div>
                            <p> {day.main.temp_max}</p>
                            <p> {day.main.temp_min}</p>
                            <p>
                                {/* Geo Coordinates: Lat {day.coord.lat}, Lon {day.coord.lon} */}
                            </p>
                            <p>{day.main.humidity}%</p>
                            <p> {new Date(time.sunrise * 1000).toLocaleTimeString()}</p>
                            <p> {new Date(time.sunset * 1000).toLocaleTimeString()}</p>
                        </div>
                    </>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Cards;
