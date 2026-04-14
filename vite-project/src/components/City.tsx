import cityService, { weatherService } from '../services/api'
import type WeatherResponse from "../model/WeatherResponse"
import './City.css'
import { useEffect, useState } from 'react'
import type Records from '../model/records'

export default function City() {
    const [cities, setCities] = useState<Records[]>([])
    const [selectedCity, setSelectedCity] = useState('')
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await cityService.city()
                setCities(data.result.records)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    const handleCityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const englishName = event.target.value
        setSelectedCity(englishName)

        if (englishName === '') {
            alert('no weather data here')
            return
        }

        try {
            const weather = await weatherService.location(englishName)
            setWeatherData(weather)

            
            const history = JSON.parse(localStorage.getItem('searchHistory') || '[]')
            const selectedCityData = cities.find(city => city.city_name_en.trim() === englishName)
            if (selectedCityData) {
                history.push({
                    timestamp: new Date().toISOString(),
                    cityNameEn: selectedCityData.city_name_en,
                    country: 'Israel'
                })
                localStorage.setItem('searchHistory', JSON.stringify(history))
            }
        } catch (e) {
            alert(e)
        }
    }

    const handleReset = () => {
        setSelectedCity('')
        setWeatherData(null)
    }

    return (
        <div className='City'>
            <h2>Cities of israel</h2>
            <select value={selectedCity} onChange={handleCityChange}>
                <option key="empty" value="">Pick a city</option>
                {cities.map((city, index) => (
                    <option key={`${city.city_name_en.trim()}-${index}`} value={city.city_name_en.trim()}>
                        {city.city_name_he}
                    </option>
                ))}
            </select>
            <button type="button" onClick={handleReset}>
                Reset Citys select
            </button>

          

            {weatherData && (
                <div className='weather-info'>
                    <h3>{cities.find(c => c.city_name_en === selectedCity)?.city_name_he}</h3>
                    <p>temp: {weatherData.current.temp_c}</p>
                    <p>condition: <img src={`https:${weatherData.current.condition.icon}`}
                     alt={weatherData.current.condition.text} /> 
                     {weatherData.current.condition.text}</p>
                    <p>humidity: {weatherData.current.humidity}</p>
                    <p>wind speed: {weatherData.current.wind_kph} </p>
                </div>
            )}
        </div>
    )
}