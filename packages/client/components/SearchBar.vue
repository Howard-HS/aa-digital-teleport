<template lang="pug">
#searchbar
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
      'Johor Bharu',
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
      'Kampung Lemai',
      'Pulai Chondong',
    ])

    async function updateWeatherData() {
      await store.dispatch('getWeatherData', state.selectedCity)
    }

    return { cities, ...toRefs(state), updateWeatherData }
  },
})
</script>

<style lang="sass">
</style>
