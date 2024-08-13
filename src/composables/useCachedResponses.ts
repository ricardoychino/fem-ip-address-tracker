import { ref, onUnmounted, watchEffect, toValue } from 'vue';
import type { MaybeRefOrGetter, Ref } from "vue";

export type UseCachedResponsesProps<T> = {
  add: (key: string, value: T) => void,
  has: (key: string) => boolean,
  get: (key: string) => T | undefined,
  getFirst: () => T | null,
  size: () => number,
  clear: () => void
}

export const useCachedResponses = <T>(key: string, initialValue?: MaybeRefOrGetter<Map<string, T>>): UseCachedResponsesProps<T> => {

  const map = ref<Map<string, T>>(new Map<string, T>(JSON.parse(localStorage.getItem(key) || '[]'))) as Ref<Map<string, T>>

  if (initialValue && initialValue instanceof Map) {
    for (const [key, value] of [...initialValue.entries()]) {
      map.value.set(key, value)
    }
  }

  const add = (key: string, value: MaybeRefOrGetter<T>) => {
    map.value.set(key, toValue(value))
  }
  const has = (key: string) => map.value.has(key)
  const get = (key: string) => map.value.get(key)
  const getFirst = () => [...map.value.values()][0] || null
  const size = () => map.value.size
  const clear = () => {
    map.value.clear()
  }

  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify([...map.value.entries()]))
  })

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === key) {
      if (event.newValue === '' || event.newValue === '{}') {
        map.value.clear()
      } else {
        map.value = new Map<string, T>(JSON.parse(event.newValue || '[]'))
      }
    }
  }

  window.addEventListener('storage', handleStorageEvent)

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageEvent)
  })

  return { add, has, get, getFirst, size, clear }
}