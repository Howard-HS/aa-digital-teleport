<template lang="pug">
#searchbar
  input(v-model='selectedCity', disabled)
  svg(
    xmlns='http://www.w3.org/2000/svg',
    viewBox='0 0 24 24',
    fill='none',
    stroke='#000',
    stroke-width='2',
    stroke-linecap='round',
    stroke-linejoin='round'
  )
    polyline(points='6 9 12 15 18 9')
  select(v-model='selectedCity', @change='updateWeatherData')
    option(v-for='city in cities', :value='city') {{ city }}
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const state = reactive({
      selectedCity: 'Kuala Lumpur',
    })
    const cities = ref([
      'Kuala Lumpur',
      'Klang',
      'Ipoh',
      'Butterworth',
      'George Town',
      'Petaling Jaya',
      'Kuantan',
      'Shah Alam',
      'Johor Bahru',
      'Kota Bharu',
      'Melaka',
      'Kota Kinabalu',
      'Seremban',
      'Sandakan',
      'Sungai Petani',
      'Kuching',
      'Kuala Terengganu',
      'Alor Setar',
      'Putrajaya',
      'Kangar',
      'Labuan',
      'Pasir Mas',
      'Tumpat',
      'Ketereh',
      'Pulai Chondong',
      'Subang Jaya',
      'Miri',
      'Ampang',
      'Kluang',
      'Mersing',
      'Kajang',
      'Sepang',
    ])

    async function updateWeatherData() {
      await store.dispatch('getWeatherData', state.selectedCity)
    }

    return { cities, ...toRefs(state), updateWeatherData }
  },
})
</script>

<style lang="sass">
@import ~assets/_variables

#searchbar
  width: 420px
  position: relative
  margin: 20px auto

  input
    width: 100%
    height: 40px
    padding: 20px
    background: white
    border-radius: 50px

  svg
    position: absolute
    top: 50%
    right: 0
    width: 30px
    transform: translate(-50%, -50%) rotateZ(-90deg)

  select
    opacity: 0
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%

    &:hover
      cursor: pointer
</style>
