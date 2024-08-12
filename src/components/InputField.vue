<script setup lang="ts">
import { ref } from 'vue'
import type { InputHTMLAttributes } from 'vue'

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  value: string
}
const props = defineProps<Props>()
defineEmits<{
  submit: [value: string]
}>()

const internal = ref<string>(props.value)
</script>

<template>
  <form class="ip-input" @submit.prevent="$emit('submit', internal)">
    <input type="text" v-bind="$attrs" v-model.lazy="internal" />
    <button type="submit">
      <img src="@/assets/images/icon-arrow.svg" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
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
</style>
