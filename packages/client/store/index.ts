import { MutationTree, ActionTree, GetterTree } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'

interface City {
  name: string
  humidity: number
  pressure: number
  timezone: number
  sunset: string
  sunrise: string
  temperatures: {
    now: number
    min: number
    max: number
    feel: number
  }
  wind: {
    speed: number
  }
  weather: {
    status: string
    description: string
    icon: string
  }
}

interface RootState {
  cities: City[]
  currentCity: City
}

declare namespace OpenWeatherAPI {
  interface Response {
    coord: {
      lon: number
      lat: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    base: string
    main: {
      temp: number
      // eslint-disable-next-line
      feels_like: number
      pressure: number
      humidity: number
      // eslint-disable-next-line
      temp_min: number
      // eslint-disable-next-line
      temp_max: number
      // eslint-disable-next-line
      sea_level: number
      // eslint-disable-next-line
      grnd_level: number
    }
    wind: {
      speed: number
      deg: number
      gust: number
    }
    clouds: {
      all: number
    }
    rain: {
      '1h': number
      '3h': number
    }
    snow: {
      '1h': number
      '3h': number
    }
    dt: number
    sys: {
      type: number
      id: number
      message: string
      country: string
      sunrise: number
      sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: number
    visibility: number
  }
}

export const state = () => {
  return {
    cities: [],
    currentCity: {
      name: '',
      humidity: 0,
      pressure: 0,
      timezone: 0,
      sunset: '',
      sunrise: '',
      temperatures: {
        now: 0,
        feel: 0,
        max: 0,
        min: 0,
      },
      wind: {
        speed: 0,
      },
      weather: {
        status: '',
        description: '',
        icon: '',
      },
    } as City,
  } as RootState
}

export const getters: GetterTree<RootState, {}> = {
  getCities(state) {
    return state.cities
  },
}

export const mutations: MutationTree<RootState> = {
  addCity(state, city: City) {
    state.cities.push({
      name: city.name,
      humidity: city.humidity,
      pressure: city.pressure,
      timezone: city.timezone,
      sunset: city.sunset,
      sunrise: city.sunrise,
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
    })
  },

  setCurrentCity(state, city: City) {
    state.currentCity = city
  },
}

export const actions: ActionTree<RootState, {}> = {
  async getWeatherData(context, city) {
    const { data } = await axios.get<OpenWeatherAPI.Response>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
    )

    const cityDetails: City = {
      name: data.name,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      timezone: data.timezone,
      sunset: dayjs.unix(data.sys.sunset).format('hh:mm A'),
      sunrise: dayjs.unix(data.sys.sunrise).format('hh:mm A'),
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
    }

    context.commit('addCity', cityDetails)
    context.commit('setCurrentCity', cityDetails)
  },

  async getWeatherDataByGeolocation(
    context,
    coordinates: { longitude: number; latitude: number }
  ) {
    const { data } = await axios.get<OpenWeatherAPI.Response>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${process.env.NUXT_ENV_OPEN_WEATHER_API_KEY}&units=metric`
    )

    const cityDetails: City = {
      name: data.name,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      timezone: data.timezone,
      sunset: dayjs.unix(data.sys.sunset).format('hh:mm A'),
      sunrise: dayjs.unix(data.sys.sunrise).format('hh:mm A'),
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
    }

    context.commit('addCity', cityDetails)
    context.commit('setCurrentCity', cityDetails)
  },
}
