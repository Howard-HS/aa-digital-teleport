<template lang="pug">
#WeatherCard
  v-card(width='400px')
    v-row
      v-col
        v-card-title.text-capitalize {{ $store.state.currentCity.name }}
        v-card-subtitle.text-capitalize {{ $store.state.currentCity.weather.description }}
      v-col
        img(
          :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
        )
    v-row
      v-col 
        p.text-h3.text-center {{ Math.round($store.state.currentCity.temperatures.now) }} &#8451;
        .d-flex.justify-center
          p.text-subtitle-1.mr-2 H: {{ Math.round($store.state.currentCity.temperatures.min) }} &#8451;
          p.text-subtitle-1.ml-2 L: {{ Math.round($store.state.currentCity.temperatures.max) }} &#8451;
    v-card-text
      v-row
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 humidity
          p.text-subtitle-1 {{ Math.round($store.state.currentCity.humidity) }}%
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 pressure
          p.text-subtitle-1 {{ Math.round($store.state.currentCity.pressure) }} hPA
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 Wind Speed
          p.text-subtitle-1 {{ Math.round($store.state.currentCity.wind.speed) }} m/s
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 Feels Like
          p.text-subtitle-1 {{ Math.round($store.state.currentCity.temperatures.feel) }} &#8451;
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 Sunset
          p.text-subtitle-1 {{ $store.state.currentCity.sunset }}
        v-col(cols=12, sm=6)
          p.text-body-1.text-uppercase.font-weight-bold.mb-0 Sunrise
          p.text-subtitle-1 {{ $store.state.currentCity.sunrise }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
