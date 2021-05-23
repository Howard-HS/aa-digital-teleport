<template lang="pug">
v-app
  v-navigation-drawer(app, clipped, v-model='drawer')
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
          v-list-item-title Cities
      v-list-item(nuxt, to='/my-cities')
        v-list-item-content
          v-list-item-title My Saved Cities
    template(v-slot:append)
      .pa-2
        v-btn(block, @click='$vuetify.theme.dark = !$vuetify.theme.dark') {{ $vuetify.theme.dark ? "Light Mode" : "Dark Mode" }}

  v-app-bar(app, clipped-left)
    v-progress-linear(
      :active='$store.state.isLoading',
      :indeterminate='$store.state.isLoading',
      absolute,
      bottom
    )
    v-app-bar-nav-icon(@click='drawer = !drawer')
    v-toolbar-title Weather Forecast
  v-main
    v-container(fluid)
      Nuxt
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const drawer = ref(true)

    return { drawer }
  },
})
</script>
