// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import axios, { AxiosResponse } from 'axios'
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
    return (id: number) => state.cities.find((city) => city.id === id)
  },
}

export const mutations: MutationTree<Store.RootState> = {
  addCity(state, city: Store.City) {
    state.cities.push(city)
  },

  updateForecastToday(
    state,
    payload: {
      index: number
      forecastToday: Store.ForecastToday[]
      forecastFiveDay: Store.ForecastFiveDay[]
    }
  ) {
    state.cities[payload.index].forecastToday = payload.forecastToday
    state.cities[payload.index].forecastFiveDay = payload.forecastFiveDay
  },

  setCurrentCityIndex(state, index: number) {
    state.selectedCityId = index
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
    let response = {} as AxiosResponse<OpenWeatherAPI.WeatherResponse>
    if (payload.mode === 'city') {
      response = await axios.get<OpenWeatherAPI.WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
      )
    } else {
      response = await axios.get<OpenWeatherAPI.WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${payload.coordinates.latitude}&lon=${payload.coordinates.longitude}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
      )
    }

    const { data } = response
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
      forecastFiveDay: [],
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

    const today = dayjs()
    const forecastToday = data.list.filter(
      (item) =>
        dayjs.unix(item.dt).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
    )
    const forecastFiveDay = [] as Store.ForecastFiveDay[]

    for (let i = 1; i < 5; i++) {
      const date = today.add(i, 'day')
      const forecastSegments = data.list.filter(
        (item) =>
          dayjs.unix(item.dt).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
      )

      forecastFiveDay.push({
        day: date.format('YYYY-MM-DD'),
        week: date.format('dddd'),
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
      forecastFiveDay,
    })
  },
}
