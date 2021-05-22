<template lang="pug">
#card
  .header
    .item
      h1.title {{ $store.state.currentCity.name }}
      h2.subtitle {{ $store.state.currentCity.weather.description }}
    .item
      img(
        :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
      )
  .temperatures
    .primary
      p.text {{ Math.round($store.state.currentCity.temperatures.now) }} &#8451;
    .secondary
      p.text H: {{ Math.round($store.state.currentCity.temperatures.min) }} &#8451;
      p.text L: {{ Math.round($store.state.currentCity.temperatures.max) }} &#8451;
  .seperator
  .details
    .item
      .subtitle-2 humidity
      p.text {{ Math.round($store.state.currentCity.humidity) }}%
    .item
      .subtitle-2 pressure
      p.text {{ Math.round($store.state.currentCity.pressure) }} hPA
    .item
      .subtitle-2 Wind Speed
      p.text {{ Math.round($store.state.currentCity.wind.speed) }} m/s
    .item
      .subtitle-2 Feels Like
      p.text {{ Math.round($store.state.currentCity.temperatures.feel) }} &#8451;
    .item
      .subtitle-2 Sunset
      p.text {{ $store.state.currentCity.sunset }}
    .item
      .subtitle-2 Sunrise
      p.text {{ $store.state.currentCity.sunrise }}
</template>

<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()

    onMounted(() => store.dispatch('getWeatherData', 'Kuala Lumpur'))
  },
})
</script>

<style lang="sass" scoped>
@import ~assets/_variables

#card
  display: flex
  flex-direction: column
  width: 400px
  height: 600px
  background: $grey-darken-3
  transition: all 0.2s ease-in-out
  padding: 20px
  box-shadow: 1px 1px 5px 2px rgba(255,255,255,0.75)

  .header
    display: flex
    justify-content: space-evenly
    align-items: center

  .temperatures
    .text
      letter-spacing: -0.01rem

    .primary
      text-align: center
      font-size: 5rem
      font-weight: 100
    .secondary
      display: flex
      justify-content: space-evenly
      align-items: center
      font-size: 1.3rem
      font-weight: 100
      width: 60%
      margin: 10px auto

  .seperator
    margin: 20px auto 10px
    width: 100%
    height: 1px
    background: $white

  .details
    display: flex
    flex-wrap: wrap

    .item
      flex: 1 1 50%
      margin: 5px auto
</style>
