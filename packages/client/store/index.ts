// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'

export const state = () => {
  return {
    cities: [],
    selectedCityId: 0,
  } as Store.RootState
}

export const getters: GetterTree<Store.RootState, {}> = {
  getCities(state) {
    return state.cities
  },

  getCurrentCity(state) {
    return state.cities[0]
  },
}

export const mutations: MutationTree<Store.RootState> = {
  addCity(state, city: Store.City) {
    state.cities.push({
      id: city.id,
      name: city.name,
      humidity: city.humidity,
      pressure: city.pressure,
      timezone: city.timezone,
      sunset: city.sunset,
      sunrise: city.sunrise,
      visibility: city.visibility,
      rainProbability: city.rainProbability,
      temperatures: {
        now: city.temperatures.now,
        min: city.temperatures.min,
        max: city.temperatures.max,
        feel: city.temperatures.feel,
      },
      wind: {
        speed: city.wind.speed,
      },
      weather: {
        status: city.weather.status,
        description: city.weather.description,
        icon: city.weather.icon,
      },
      forecastToday: [],
    })
  },

  updateForecastToday(state, payload: { index: number; forecastToday: any }) {
    state.cities[payload.index].forecastToday = payload.forecastToday
  },

  setCurrentCityIndex(state, index: number) {
    state.selectedCityId = index
  },
}

export const actions: ActionTree<Store.RootState, {}> = {
  async getWeatherData(context, city) {
    const { data } = await axios.get<OpenWeatherAPI.WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
    )

    const cityDetails: Store.City = {
      id: data.id,
      name: data.name,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      timezone: data.timezone,
      sunset: dayjs.unix(data.sys.sunset).format('hh:mm A'),
      sunrise: dayjs.unix(data.sys.sunrise).format('hh:mm A'),
      visibility: data.visibility,
      rainProbability: 0,
      temperatures: {
        now: data.main.temp,
        feel: data.main.feels_like,
        max: data.main.temp_max,
        min: data.main.temp_min,
      },
      wind: {
        speed: data.wind.speed,
      },
      weather: {
        status: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      forecastToday: [],
    }

    context.commit('addCity', cityDetails)
  },

  async getWeatherDataByGeolocation(
    context,
    coordinates: { longitude: number; latitude: number }
  ) {
    const { data } = await axios.get<OpenWeatherAPI.WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
    )

    const cityDetails: Store.City = {
      id: data.id,
      name: data.name,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      timezone: data.timezone,
      sunset: dayjs.unix(data.sys.sunset).format('hh:mm A'),
      sunrise: dayjs.unix(data.sys.sunrise).format('hh:mm A'),
      visibility: data.visibility,
      rainProbability: 0,
      temperatures: {
        now: data.main.temp,
        feel: data.main.feels_like,
        max: data.main.temp_max,
        min: data.main.temp_min,
      },
      wind: {
        speed: data.wind.speed,
      },
      weather: {
        status: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      forecastToday: [],
    }

    context.commit('addCity', cityDetails)
  },

  async getWeatherForecast(
    context,
    coordinates: { longitude: number; latitude: number }
  ) {
    const { data } = await axios.get<OpenWeatherAPI.ForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
    )

    // Push today data into weather card
    const todayDate = dayjs().format('YYYY-MM-DD')
    const forecastToday = data.list.filter(
      (item) => dayjs.unix(item.dt).format('YYYY-MM-DD') === todayDate
    )

    const index = context.state.cities.findIndex(
      (city) => city.id === data.city.id
    )

    context.commit('updateForecastToday', {
      index,
      forecastToday: forecastToday.reduce((acc, cur) => {
        acc.push({
          timestamp: cur.dt_txt,
          hour: dayjs.unix(cur.dt).format('hA'),
          description: cur.weather[0].description,
          icon: cur.weather[0].icon,
          status: cur.weather[0].main,
        })
        return acc
      }, [] as Store.ForecastToday[]),
    })
  },
}
