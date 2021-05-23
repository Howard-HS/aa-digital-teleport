<template lang="pug">
#searchbar
  v-select(
    label='Select City',
    filled,
    :items='cities',
    v-model='selectedCity',
    @change='getWeatherData'
  )
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
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

    onMounted(() => getWeatherData('Kuala Lumpur'))

    async function getWeatherData(city: string) {
      await store.dispatch('getWeatherData', {
        mode: 'city',
        city: city || state.selectedCity,
      })
    }

    return { cities, ...toRefs(state), getWeatherData }
  },
})
</script>
