<template lang="pug">
#WeatherCard
  v-card(width='400px')
    v-row
      v-col
        v-card-title.text-capitalize {{ $store.state.currentCity.name }}
        v-card-subtitle.text-capitalize {{ today }}
    v-row
      v-col 
        p.text-h3.text-center {{ Math.round($store.state.currentCity.temperatures.now) }} &#8451;
        .d-flex.justify-center
          p.text-subtitle-1.mr-2 H: {{ Math.round($store.state.currentCity.temperatures.min) }} &#8451;
          p.text-subtitle-1.ml-2 L: {{ Math.round($store.state.currentCity.temperatures.max) }} &#8451;
    v-divider
    v-row
      v-col
        v-card-text
          p.text-body-1.text-uppercase Today
          .intervals.d-flex.justify-start
            .d-flex.flex-column
              .item.text-center
                img(
                  :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
                )
                p.text-caption.font-weight-bold.text-uppercase.my-0 Now
                p.text-body-2.font-weight-light.text-capitalize {{ $store.state.currentCity.weather.description }}
            .d-flex.flex-column
              .item.text-center
                img(
                  :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
                )
                p.text-caption.font-weight-bold.text-uppercase.my-0 3PM
                p.text-body-2.font-weight-light.text-capitalize {{ $store.state.currentCity.weather.description }}
            .d-flex.flex-column
              .item.text-center
                img(
                  :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
                )
                p.text-caption.font-weight-bold.text-uppercase.my-0 6PM
                p.text-body-2.font-weight-light.text-capitalize {{ $store.state.currentCity.weather.description }}
            .d-flex.flex-column
              .item.text-center
                img(
                  :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
                )
                p.text-caption.font-weight-bold.text-uppercase.my-0 9PM
                p.text-body-2.font-weight-light.text-capitalize {{ $store.state.currentCity.weather.description }}
            .d-flex.flex-column
              .item.text-center
                img(
                  :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
                )
                p.text-caption.font-weight-bold.text-uppercase.my-0 12AM
                p.text-body-2.font-weight-light.text-capitalize {{ $store.state.currentCity.weather.description }}
    v-divider
    v-row
      v-col
        v-card-text
          .d-flex.justify-space-between.align-center
            p.text-body-1.text-uppercase.mb-0 Sunday
            .d-flex.align-center
              span.text-caption (20 &#8451; / 20 &#8451; )
              v-img(
                contain,
                max-width='50',
                :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
              )
              span.text-caption Light Rain
          .d-flex.justify-space-between.align-center
            p.text-body-1.text-uppercase.mb-0 Sunday
            .d-flex.align-center
              span.text-caption (20 &#8451; / 20 &#8451; )
              v-img(
                contain,
                max-width='50',
                :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
              )
              span.text-caption Light Rain
          .d-flex.justify-space-between.align-center
            p.text-body-1.text-uppercase.mb-0 Sunday
            .d-flex.align-center
              span.text-caption (20 &#8451; / 20 &#8451; )
              v-img(
                contain,
                max-width='50',
                :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
              )
              span.text-caption Light Rain
          .d-flex.justify-space-between.align-center
            p.text-body-1.text-uppercase.mb-0 Sunday
            .d-flex.align-center
              span.text-caption (20 &#8451; / 20 &#8451; )
              v-img(
                contain,
                max-width='50',
                :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
              )
              span.text-caption Light Rain
          .d-flex.justify-space-between.align-center
            p.text-body-1.text-uppercase.mb-0 Sunday
            .d-flex.align-center
              span.text-caption (20 &#8451; / 20 &#8451; )
              v-img(
                contain,
                max-width='50',
                :src='`http://openweathermap.org/img/wn/${$store.state.currentCity.weather.icon}@2x.png`'
              )
              span.text-caption Light Rain
    v-divider
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
import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

export default defineComponent({
  setup() {
    const state = reactive({
      today: dayjs().format('dddd, DD MMM YYYY hh:mm A'),
    })

    return { ...toRefs(state) }
  },
})
</script>

<style lang="sass" scoped>
.intervals
  width: inherit
  overflow-x: auto

::-webkit-scrollbar
  background: transparent
  height: 3px

::-webkit-scrollbar-track
  background: transparent

::-webkit-scrollbar-thumb
  background: white
  margin: 0
  padding: 0
  border-radius: 30px
</style>
