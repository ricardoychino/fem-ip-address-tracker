<script setup lang="ts">
import { ref } from 'vue'
import type { InputHTMLAttributes } from 'vue'

import { useIPTracking } from '@/stores/ip-tracking'
import { storeToRefs } from 'pinia'

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  value?: string
}
const props = withDefaults(defineProps<Props>(), {
  value: ''
})
defineEmits<{
  (e: 'submitted', value: string): void
}>()

const internal = ref<string>(props.value)

const store = useIPTracking()
const { search } = store
const { trackError } = storeToRefs(store)
</script>

<template>
  <form
    class="ip-input"
    :class="{ warn: trackError !== null }"
    @submit.prevent="() => search(internal)"
  >
    <input type="text" v-bind="$attrs" v-model="internal" />
    <button type="submit">
      <img src="@/assets/images/icon-arrow.svg" />
    </button>

    <Transition name="slide-up">
      <span class="error-label" v-show="trackError !== null">{{ trackError }}</span>
    </Transition>
  </form>
</template>

<style lang="scss" scoped>
.ip-input {
  $radius: 15px;

  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: $radius;
  width: 100%;
  position: relative;

  input {
    flex-grow: 1;
    border: none;
    padding: 15px;
    outline: none;
    font-size: 16px;
    border-radius: $radius 0 0 $radius;

    &::placeholder {
      color: $dark-gray;
      opacity: 0.5;
    }
    @media screen and (min-width: $bp-medium) {
      font-size: 18px;
    }
  }
  button {
    display: flex;
    padding: 15px;
    background-color: $very-dark-gray;
    border: 0px solid transparent;
    border-radius: 0 $radius $radius 0;
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

  .error-label {
    position: absolute;
    justify-self: center;
    top: 90%;
    color: $error-color;
    border: 1px solid lighten($error-color, 15);
    background-color: lighten($error-color, 25);
    font-size: 12px;
    padding: 5px 15px;
    border-radius: $radius;
    max-width: 80%;
    text-align: center;
  }
}

.slide-up {
  @mixin end-state {
    opacity: 1;
    transform: none;
  }
  @mixin start-state {
    opacity: 0;
    transform: translateY(10px);
  }
  @mixin transition {
    transition: all 0.2s linear;
  }

  &-leave {
    &-to {
      @include start-state;
    }
    &-active {
      transition: all 0s;
    }
    &-from {
      @include end-state;
    }
  }
  &-enter {
    &-to {
      @include end-state;
    }
    &-active {
      @include transition;
    }
    &-from {
      @include start-state;
    }
  }
}
</style>
