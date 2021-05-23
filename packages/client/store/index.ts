// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'

const OPENWEATHERAPI_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const axiosInstance = axios.create({
  method: 'GET',
  baseURL: OPENWEATHERAPI_BASE_URL,
  params: {
    appid: process.env.NUXT_ENV_OPEN_WEATHER_API_KEY!,
    units: 'metric',
  },
})

export const state = () => {
  return {
    cities: [],
    currentLocationCityId: 0,
    currentCity: {} as Store.City,
    isLoading: true,
  } as Store.RootState
}

export const getters: GetterTree<Store.RootState, {}> = {
  getCities(state) {
    return state.cities
  },

  getCurrentCity(state) {
    return (id: number) => state.cities.find((city) => city.id === id)
  },
}

export const mutations: MutationTree<Store.RootState> = {
  addCity(state, city: Store.City) {
    state.cities.push(city)
  },

  setCurrentCity(state, city: Store.City) {
    state.currentCity = city
  },

  setLoadingState(state, isLoading: boolean) {
    state.isLoading = isLoading
  },
}

export const actions: ActionTree<Store.RootState, {}> = {
  async getWeatherData(
    context,
    payload: {
      mode: 'geolocation' | 'city'
      coordinates: { longitude: number; latitude: number }
      city: string
    }
  ) {
    context.commit('setLoadingState', true)

    // Step 1: Get weather data
    let weatherResponse = {} as AxiosResponse<OpenWeatherAPI.WeatherResponse>

    if (payload.mode === 'city') {
      weatherResponse = await axiosInstance('/weather', {
        params: {
          city: payload.city,
        },
      })
    } else {
      weatherResponse = await axiosInstance('/weather', {
        params: {
          lat: payload.coordinates.latitude,
          lon: payload.coordinates.longitude,
        },
      })
    }

    const cityDetails: Store.City = {
      id: weatherResponse.data.id,
      name: weatherResponse.data.name,
      humidity: Math.round(weatherResponse.data.main.humidity),
      pressure: Math.round(weatherResponse.data.main.pressure),
      timezone: weatherResponse.data.timezone,
      sunset: dayjs.unix(weatherResponse.data.sys.sunset).format('hh:mm A'),
      sunrise: dayjs.unix(weatherResponse.data.sys.sunrise).format('hh:mm A'),
      visibility: Math.round(weatherResponse.data.visibility / 1000),
      rainProbability: 0,
      // temp_min and temp_max is optional, fallback to temp is parameter is not available
      // more info: https://openweathermap.org/current#min
      temperatures: {
        now: Math.round(weatherResponse.data.main.temp),
        feel: Math.round(weatherResponse.data.main.feels_like),
        max: Math.round(
          weatherResponse.data.main.temp_max || weatherResponse.data.main.temp
        ),
        min: Math.round(
          weatherResponse.data.main.temp_min || weatherResponse.data.main.temp
        ),
      },
      wind: {
        speed: Math.round(weatherResponse.data.wind.speed * 3.6),
      },
      // One or more weather condition is possible
      // Here we assume the first item in array is primary
      // More info: https://openweathermap.org/weather-conditions
      weather: {
        status: weatherResponse.data.weather[0].main,
        description: weatherResponse.data.weather[0].description,
        icon: weatherResponse.data.weather[0].icon,
      },
      forecastToday: [],
      forecastFiveDay: [],
    }

    // Step 2: Get forecast data

    // Use cityId from previous response
    const forecastResponse: AxiosResponse<OpenWeatherAPI.ForecastResponse> =
      await axiosInstance('/forecast', {
        params: {
          id: cityDetails.id,
        },
      })

    const today = dayjs()

    // Convert unix timestamp into standard YYYY-MM-DD date format
    // And compare both dates to filter out 3h forcasted data for TODAY
    const forecastToday = forecastResponse.data.list.filter(
      (item) =>
        dayjs.unix(item.dt).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
    )

    const forecastFiveDay = [] as Store.ForecastFiveDay[]

    // Use a for-loop to incrementally add 1 day from TODAY
    // Using the same method above to filter out 3h forcasted data that belongs in the same day
    for (let i = 1; i < 6; i++) {
      const date = today.add(i, 'day')
      const forecastSegments = forecastResponse.data.list.filter(
        (item) =>
          dayjs.unix(item.dt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
      )

      forecastFiveDay.push({
        day: date.format('YYYY-MM-DD'),
        week: date.format('dddd'),
        // The temperatures are calculated based on the average of the 3h segments returned from each loop
        temperatures: {
          now: Math.round(
            forecastSegments.reduce((acc, cur) => (acc += cur.main.temp), 0) /
              forecastSegments.length
          ),
          feel: Math.round(
            forecastSegments.reduce(
              (acc, cur) => (acc += cur.main.feels_like),
              0
            ) / forecastSegments.length
          ),
          max: Math.round(
            forecastSegments.reduce(
              (acc, cur) => (acc += cur.main.temp_max),
              0
            ) / forecastSegments.length
          ),
          min: Math.round(
            forecastSegments.reduce(
              (acc, cur) => (acc += cur.main.temp_min),
              0
            ) / forecastSegments.length
          ),
        },
        weather: forecastSegments.reduce((acc, cur) => {
          acc.push({
            timestamp: dayjs.unix(cur.dt).format('YYYY-MM-DD hh:mm:ss'),
            hour: dayjs.unix(cur.dt).format('hA'),
            description: cur.weather[0].description,
            icon: cur.weather[0].icon,
            status: cur.weather[0].main,
          })
          return acc
        }, [] as Store.ForecastToday[]),
      })
    }

    cityDetails.forecastToday = forecastToday.reduce((acc, cur) => {
      acc.push({
        timestamp: dayjs.unix(cur.dt).format('YYYY-MM-DD hh:mm:ss'),
        hour: dayjs.unix(cur.dt).format('hA'),
        description: cur.weather[0].description,
        icon: cur.weather[0].icon,
        status: cur.weather[0].main,
      })
      return acc
    }, [] as Store.ForecastToday[])

    // Calculate the rain probability based on the 3h segments returned TODAY
    cityDetails.rainProbability = Math.round(
      (forecastToday.reduce((acc, cur) => (acc += cur.pop), 0) /
        forecastToday.length) *
        100
    )

    cityDetails.forecastFiveDay = forecastFiveDay

    context.commit('setCurrentCity', cityDetails)
    context.commit('setLoadingState', false)
  },
}
