<script setup lang="ts">
import axios from 'axios'
import { useLeaflet } from '@/composables/useLeaflet'

const { render } = useLeaflet('map-wrapper', {
  pos: [51.5, -0.09],
  zoom: 13,
  marker: { pos: [51.5, -0.09] }
})

// axios.get(
//   `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IP_GEOLOCATION_DB}`
// )
const resp = {
  ip: '179.87.129.121',
  location: {
    country: 'BR',
    region: 'S\u00e3o Paulo',
    city: 'Cerqueira C\u00e9sar',
    lat: -23.56383,
    lng: -46.66199,
    postalCode: '',
    timezone: '-03:00',
    geonameId: 12377009
  },
  as: {
    asn: 26599,
    name: 'TELEF\ufffdNICA BRASIL S.A',
    route: '179.84.0.0\/14',
    domain: 'http:\/\/www.telefonica.com.br',
    type: ''
  },
  isp: 'TELEF\u00d4NICA BRASIL AS26599'
}
</script>

<template>
  <main id="app-wrapper">
    <header id="app-header">
      <div class="container">
        <h1 class="app-title">IP Address Tracker</h1>

        <form class="ip-input">
          <input type="text" placeholder="Search for any IP address or domain" />
          <button type="submit">
            <img src="@/assets/images/icon-arrow.svg" />
          </button>
        </form>
      </div>
    </header>

    <div id="map">
      <div class="container">
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
      </div>

      <div id="map-wrapper"></div>
    </div>
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

.ip-input {
  display: flex;
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  border-radius: 15px;

  input {
    flex-grow: 1;
    border: none;
    padding: 15px;
    outline: none;

    &::placeholder {
      color: $dark-gray;
      opacity: 0.5;
    }
  }
  button {
    display: flex;
    padding: 15px;
    background-color: $very-dark-gray;
    border: 0px solid transparent;
    cursor: pointer;
    transition: all 0.3s linear;

    &:hover {
      opacity: 0.8;
    }

    @media screen and (min-width: $bp-medium) {
      padding: 20px;
    }
  }

  @media screen and (min-width: $bp-medium) {
    margin: 0 auto;
    width: 600px;
  }
}

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
