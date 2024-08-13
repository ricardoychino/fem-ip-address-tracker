<script setup lang="ts">
import InputField from '@/components/IPTrackerInput.vue'
import IPTrackerMap from '@/components/IPTrackerMap.vue'
</script>

<template>
  <main id="app-wrapper">
    <header id="app-header">
      <div class="container">
        <h1 class="app-title">IP Address Tracker</h1>

        <InputField placeholder="Search for any IP address or domain" />
      </div>
    </header>

    <IPTrackerMap />
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
