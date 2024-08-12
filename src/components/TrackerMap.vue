<template>
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
