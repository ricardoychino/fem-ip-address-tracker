<script setup lang="ts">
import { map } from 'leaflet'
import { onMounted } from 'vue'

onMounted(() => {
  const asd = map('map-wrapper', {
    center: [51.505, -0.09],
    zoom: 13
  })
})
</script>

<template>
  <main>
    <header>
      <h1>IP Address Tracker</h1>
      <input type="text" placeholder="Search for any IP address or domain" />
    </header>

    <div id="map">
      <div class="infos">
        <div class="info-item">
          <h4>IP Address</h4>
          <span>192.212.174.101</span>
        </div>
        <div class="info-item">
          <h4>Location</h4>
          <span>Brooklyn, NY 10001</span>
        </div>
        <div class="info-item">
          <h4>Timezone</h4>
          <span>UTC -05:00</span>
        </div>
        <div class="info-item">
          <h4>ISP</h4>
          <span>SpaceX Starlink</span>
        </div>
      </div>

      <div id="map-wrapper"></div>
    </div>
  </main>
</template>

<style scoped></style>
