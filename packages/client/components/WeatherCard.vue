<template lang="pug">
#WeatherCard(v-if='Object.keys(city).length > 0 && !$store.state.isLoading')
  v-card
    v-row
      v-col
        v-card-title.text-capitalize {{ city.name }}
        v-card-subtitle.text-capitalize {{ today }}
      v-col.text-right(cols=2, v-if='$route.path !== "/"')
        v-btn(icon, v-if='$route.path === "/cities"')
          v-icon(large, color='success') mdi-plus
        v-btn(icon, v-if='$route.path === "/my-cities"')
          v-icon(large, color='error') mdi-delete-outline
    v-row
      v-col
        .d-flex.justify-center.align-center
          p.text-h3.text-center.ma-0 {{ Math.round(city.temperatures.now) }} &#8451;
          v-img.flex-grow-0(
            :src='`http://openweathermap.org/img/wn/${city.weather.icon}@4x.png`'
          )
        .d-flex.justify-center
          p.text-body-2.font-weight-light.text-capitalize {{ city.weather.description }}
        .d-flex.justify-center
          p.text-subtitle-1.mr-2 H: {{ Math.round(city.temperatures.min) }} &#8451;
          p.text-subtitle-1.ml-2 L: {{ Math.round(city.temperatures.max) }} &#8451;
    template(v-if='showDetails')
      v-divider
      v-row
        v-col
          v-card-text
            p.text-body-1.text-uppercase Today
            .intervals.d-flex.justify-start
              .d-flex.flex-column.align-center.mx-4(
                v-for='today in city.forecastToday'
              )
                .item.text-center
                  img(
                    :src='`http://openweathermap.org/img/wn/${today.icon}@2x.png`'
                  )
                  p.text-caption.font-weight-bold.text-uppercase.my-0 {{ today.hour }}
                  p.text-caption.font-weight-light.text-capitalize {{ today.description }}
      v-divider
      v-card-text
        v-row.align-center
          template(v-for='forecastWeek in city.forecastFiveDay')
            v-col(cols=4)
              p.text-body-1.text-uppercase.mb-0 {{ forecastWeek.week }}
            v-col(cols=4)
              span.text-caption ({{ forecastWeek.temperatures.min }} &#8451; / {{ forecastWeek.temperatures.max }} &#8451; )
            v-col(cols=4)
              .d-flex.align-center.justify-end
                span.text-caption.mx-1 {{ forecastWeek.weather[0].status }}
                v-img(
                  contain,
                  max-width='50',
                  :src='`http://openweathermap.org/img/wn/${forecastWeek.weather[0].icon}@2x.png`'
                ) 
      v-divider
      v-card-text
        v-row
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 humidity
            p.text-subtitle-1.mb-0 {{ city.humidity }}%
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 pressure
            p.text-subtitle-1.mb-0 {{ city.pressure }} hPA
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Wind Speed
            p.text-subtitle-1.mb-0 {{ city.wind.speed }} km/h
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Feels Like
            p.text-subtitle-1.mb-0 {{ city.temperatures.feel }} &#8451;
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Visibility
            p.text-subtitle-1.mb-0 {{ city.visibility }} km
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Chance of Rain
            p.text-subtitle-1.mb-0 {{ city.rainProbability }}%
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Sunset
            p.text-subtitle-1.mb-0 {{ city.sunset }}
          v-col(cols=12, sm=6)
            p.text-body-1.text-uppercase.font-weight-bold.mb-0 Sunrise
            p.text-subtitle-1.mb-0 {{ city.sunrise }}
    v-card-actions.justify-end
      v-btn(block, @click='showDetails = !showDetails') {{ showDetails ? "Hide" : "Show More" }}
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { defineComponent, reactive, toRefs, ref } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'

export default defineComponent({
  props: {
    city: {
      required: true,
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup() {
    const state = reactive({
      today: dayjs().format('dddd, DD MMM YYYY hh:mm A'),
    })
    const showDetails = ref(false)

    return { ...toRefs(state), showDetails }
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
