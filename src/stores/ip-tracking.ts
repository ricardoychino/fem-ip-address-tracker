import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useGeolocationAPI } from '@/composables/useGeoIocationAPI'
import { useCachedResponses } from '@/composables/useCachedResponses'
import { isValidDomain, isValidIP } from '@/utils/validators'

import type { QueryParams, GeolocationResponseType2 } from '@/types/GeolocationAPI'
import type { LatLngExpression } from 'leaflet'

export const useIPTracking = defineStore('tracking', () => {

  const currentData = ref<GeolocationResponseType2 | null>(null)

  // Helpers
  const cachedMap = useCachedResponses<GeolocationResponseType2>('cachemap')
  const { response, load } = useGeolocationAPI()

  const ipAddress = computed(() => currentData.value?.ip || '-')
  const location = computed(() => currentData.value ? `${currentData.value.location.region} ${currentData.value.location.country}` : '-')
  const timezone = computed(() => currentData.value ? `UTC ${currentData.value.location.timezone}` : '-')
  const isp = computed(() => currentData.value?.isp || '-')
  const position = computed<LatLngExpression>(() => currentData.value ? [currentData.value.location.lat, currentData.value.location.lng] : [0, 0])

  if (currentData.value === null) {
    if (cachedMap.size() > 0) {
      currentData.value = cachedMap.getFirst()
    } else {
      (async () => {
        await load({})

        if (response.value) {
          currentData.value = response.value
          cachedMap.add(response.value.ip, response.value)
          if (response.value.as.domain) {
            cachedMap.add(response.value.as.domain, response.value)
          }
        }
      })()
    }
  }

  const search = (str: string): void => {
    if (cachedMap.has(str)) {
      currentData.value = cachedMap.get(str) as GeolocationResponseType2
    } else {
      const queries: QueryParams = {}

      if (isValidIP(str)) {
        queries.ipAddress = str
      }
      else if (isValidDomain(str)) {
        queries.domain = str
      }

      (async () => {
        await load(queries)

        if (response.value) {
          currentData.value = response.value
          cachedMap.add(response.value.ip, response.value)
          if (response.value.as.domain) {
            cachedMap.add(response.value.as.domain, response.value)
          }
        }
      })()

    }
  }


  return { search, ipAddress, location, timezone, isp, position }
})
