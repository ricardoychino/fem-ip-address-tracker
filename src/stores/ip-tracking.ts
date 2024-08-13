import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useGeolocationAPI } from '@/composables/useGeoIocationAPI'
import { useCachedResponses } from '@/composables/useCachedResponses'
import { isValidDomain, isValidIP } from '@/utils/validators'

import type { QueryParams, GeolocationResponseType2 } from '@/types/GeolocationAPI'
import type { LatLngExpression } from 'leaflet'

const errorMessages: Record<string, string> = {
  'invalid_ip_or_domain': 'Please insert a valid domain or IP'
}

export const useIPTracking = defineStore('tracking', () => {

  // States
  const currentData = ref<GeolocationResponseType2 | null>(null)
  const trackError = ref<string | null>(null)

  // Helpers
  const cachedMap = useCachedResponses<GeolocationResponseType2>('cachemap')
  const { response, doFetch } = useGeolocationAPI()

  // Getters
  const ipAddress = computed(() => currentData.value?.ip || '-')
  const location = computed(() => currentData.value ? `${currentData.value.location.region} ${currentData.value.location.country}` : '-')
  const timezone = computed(() => currentData.value ? `UTC ${currentData.value.location.timezone}` : '-')
  const isp = computed(() => currentData.value?.isp || '-')
  const position = computed<LatLngExpression>(() => currentData.value ? [currentData.value.location.lat, currentData.value.location.lng] : [0, 0])

  // Actions
  const search = (str: string): void => {
    try {
      if (cachedMap.has(str)) {
        currentData.value = cachedMap.get(str) as GeolocationResponseType2
      } else {
        const queries: QueryParams = {}

        if (isValidIP(str)) {
          queries.ipAddress = str
        }
        else if (isValidDomain(str)) {
          queries.domain = str
        } else {
          // If the inital currentData is already set, return nothing to avoid wasting API credits
          if (currentData.value !== null) throw new Error('invalid_ip_or_domain')
        }

        (async () => {
          await doFetch(queries)

          updateValues()
        })()
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        trackError.value = errorMessages[err.message]
      }
    }
  }

  const resetTrackError = () => {
    trackError.value = null
  }

  // Internal method
  const updateValues = () => {
    if (response.value) {
      currentData.value = response.value
      cachedMap.add(response.value.ip, response.value)
      if (response.value.as.domain) {
        cachedMap.add(response.value.as.domain, response.value)
      }
    }
  }

  // Initialize
  if (currentData.value === null) {
    if (cachedMap.size() > 0) {
      currentData.value = cachedMap.getFirst()
    } else {
      (async () => {
        await doFetch({})

        updateValues()
      })()
    }
  }

  return { search, trackError, resetTrackError, ipAddress, location, timezone, isp, position }
})
