import axios from "axios";
import type City from "../model/City";
import type WeatherResponse from "../model/WeatherResponse";

const apiWeather = axios.create({
    baseURL: 'https://api.weatherapi.com/v1'
})
const apiCity = axios.create({
    baseURL: 'https://data.gov.il/'
})

class WeatherService {
    async location(cityName: string): Promise<WeatherResponse> {
        const apiKey = "788a9579fb67425b888105221261204"

        const { data } = await apiWeather.get<WeatherResponse>(
            `/current.json?key=${apiKey}&q=${cityName}`
        )

        return data
    }
}

class CityService {
    async city(): Promise<City> {
        const { data } = await apiCity.get<City>(
            '/api/3/action/datastore_search?resource_id=8f714b6f-c35c-4b40-a0e7-547b675eee0e'
        )
        return data
    }
}

const weatherService = new WeatherService()
const cityService = new CityService()

export { weatherService }
export default cityService
