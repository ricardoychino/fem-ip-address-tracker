<script setup lang="ts">
import InputField from '@/components/InputField.vue'
import TrackerMap from '@/components/TrackerMap.vue'
import axios from 'axios'
import { useLeaflet } from '@/composables/useLeaflet'
import type { UseLeafletOptions } from '@/composables/useLeaflet'

const { render } = useLeaflet('map-wrapper', {
  pos: [-23.56383, -46.66199],
  zoom: 13
})

// axios.get(
//   `https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_IP_GEOLOCATION_DB}`
// )

// render({
//   pos: [resp.location.lat, resp.location.lng]
// })
</script>

<template>
  <main id="app-wrapper">
    <header id="app-header">
      <div class="container">
        <h1 class="app-title">IP Address Tracker</h1>

        <InputField value="" placeholder="Search for any IP address or domain" />
      </div>
    </header>

    <TrackerMap />
  </main>
</template>

<style lang="scss" scoped>
#app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#app-header {
  flex-grow: 1;
  padding: 15px 0;
  background-color: #4e56b7;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('@/assets/images/pattern-bg-mobile.png');

  @media screen and (min-width: $bp-large) {
    background-image: url('@/assets/images/pattern-bg-desktop.png');
  }

  h1.app-title {
    color: #fff;
    font-weight: 400;
    text-align: center;
    margin: 15px 0;
  }
}
</style>
