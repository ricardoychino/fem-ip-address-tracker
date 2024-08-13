import { ref, toValue, watchEffect } from 'vue'
import axios from 'axios'
import type { Ref, MaybeRefOrGetter } from 'vue'
import type { GeolocationResponseType2 } from '@/types/GeolocationAPI'

const baseURL = `https://geo.ipify.org/api/v2/country`

interface InputParams {
  ipAddress?: string,
  domain?: string
}

export const useGeolocationAPI = (input: MaybeRefOrGetter<InputParams>): Ref<GeolocationResponseType2 | null> => {

  const apiKey = import.meta.env.VITE_IP_GEOLOCATION_DB

  const result = ref<GeolocationResponseType2 | null>(null)

  const fetch = async (input: InputParams) => {
    const resp = await axios.get(baseURL, { params: { ...input, apiKey } })

    result.value = resp.data
  }

  watchEffect(() => {
    fetch(toValue(input))
  })

  return result
}