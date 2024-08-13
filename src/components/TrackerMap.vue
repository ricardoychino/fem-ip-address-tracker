<script setup lang="ts">
import { useIPTracking } from '@/stores/ip-tracking'
import { useLeaflet } from '@/composables/useLeaflet'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const store = useIPTracking()

const { ipAddress, location, timezone, isp, position } = storeToRefs(store)

const { render } = useLeaflet('map-wrapper', {
  pos: position.value,
  zoom: 13
})

watch(
  () => position.value,
  (newValue) => {
    console.log(newValue)
    render({ pos: newValue })
  },
  { deep: true }
)
</script>

<template>
  <div id="map">
    <div class="container">
      <div class="infos">
        <div class="info-item">
          <h4>IP Address</h4>
          <span>{{ ipAddress }}</span>
        </div>
        <div class="info-item">
          <h4>Location</h4>
          <span>{{ location }}</span>
        </div>
        <div class="info-item">
          <h4>Timezone</h4>
          <span>{{ timezone }}</span>
        </div>
        <div class="info-item">
          <h4>ISP</h4>
          <span>{{ isp }}</span>
        </div>
      </div>
    </div>

    <div id="map-wrapper"></div>
  </div>
</template>

<style lang="scss" scoped>
#map {
  flex-grow: 1;
  height: 60vh;
  width: 100%;

  .infos {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 15px;
    padding: 15px;
    position: absolute;
    left: 15px;
    right: 15px;
    z-index: 1000;
    top: -7.5vh;
    box-shadow: 0 1px 15px -5px #{$very-dark-gray}b3;

    .info-item {
      padding: 7.5px;
      text-align: center;
      font-size: 18px;
      font-weight: 500;

      h4 {
        color: #{$dark-gray}99;
        font-size: 0.5em;
        font-weight: 700;
        line-height: 2;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      @media screen and (min-width: $bp-medium) {
        font-size: 20px;
        text-align: left;
        flex-grow: 1;
        flex-basis: 25%;
        padding: 0 20px;

        &:not(:first-of-type) {
          border-left: 1px solid #{$dark-gray}33;
        }
      }
    }

    @media screen and (min-width: $bp-medium) {
      padding: 25px 0;
      flex-direction: row;
    }
  }

  #map-wrapper {
    height: 100%;
    width: 100%;
  }
}
</style>
