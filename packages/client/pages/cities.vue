<template lang="pug">
#cities
  SearchBar
  WeatherCard(:city='$store.state.currentCity')
</template>

<script lang="ts">
// Temporary fix to silent eslint warning
/* eslint-disable no-undef */
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
