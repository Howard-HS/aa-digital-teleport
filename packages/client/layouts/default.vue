<template lang="pug">
v-app
  v-navigation-drawer(app, clipped)
    v-list-item
      v-list-item-content
        v-list-item-title.title Dashboard
    v-divider
    v-list(nav)
      v-list-item(nuxt, to='/')
        v-list-item-content
          v-list-item-title My Location
      v-list-item(nuxt, to='/cities')
        v-list-item-content
          v-list-item-title My Cities
  v-app-bar(app, clipped-left)
    v-progress-linear(
      :active='$store.state.isLoading',
      :indeterminate='$store.state.isLoading',
      absolute,
      bottom
    )
    v-app-bar-nav-icon
    v-toolbar-title Weather Forecast
    v-spacer
    v-list
      v-list-item(@click='$vuetify.theme.dark = !$vuetify.theme.dark')
        v-list-item-content
          v-list-item-title {{ $vuetify.theme.dark ? "Light Mode" : "Dark Mode" }}
  v-main
    v-container(fluid)
      Nuxt
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
