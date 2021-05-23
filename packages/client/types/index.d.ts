declare namespace Store {
  interface ForecastToday {
    status: string
    description: string
    icon: string
    timestamp: string
    hour: string
  }

  interface ForecastFiveDay {
    day: string
    week: string
    temperatures: {
      now: number
      min: number
      max: number
      feel: number
    }
    weather: ForecastToday[]
  }
  interface City {
    id: number
    name: string
    humidity: number
    pressure: number
    timezone: number
    sunset: string
    sunrise: string
    visibility: number
    rainProbability: number
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
    forecastToday: ForecastToday[]
    forecastFiveDay: ForecastFiveDay[]
  }

  interface RootState {
    cities: City[]
    selectedCityId: number
  }
}

declare namespace OpenWeatherAPI {
  interface WeatherResponse {
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

  interface ForecastResponse {
    cod?: string
    message?: string
    cnt: number
    list: {
      dt: number
      // eslint-disable-next-line
      dt_txt: string
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
        // eslint-disable-next-line
        temp_kf?: number
      }
      weather: {
        id: number
        main: string
        description: string
        icon: string
      }[]
      clouds: {
        all: number
      }
      wind: {
        speed: number
        deg: number
        gust: number
      }
      visibility: number
      pop: number
      sys: {
        pod: 'n' | 'd'
      }
      rain: {
        '3h': number
      }
      snow: {
        '3h': number
      }
    }[]
    city: {
      id: number
      name: string
      coord: {
        lat: number
        lon: number
      }
      country: string
      timezone: number
    }
  }
}
