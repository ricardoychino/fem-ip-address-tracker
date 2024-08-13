import { ref } from 'vue'
import axios from 'axios'
import type { Ref } from 'vue'
import type { QueryParams, GeolocationResponseType2 } from '@/types/GeolocationAPI'

const baseURL = `https://geo.ipify.org/api/v2/country,city`

interface useGeolocationAPIProps {
  response: Ref<GeolocationResponseType2 | null>,
  load: (input?: QueryParams) => void
}

export const useGeolocationAPI = (): useGeolocationAPIProps => {

  const apiKey = import.meta.env.VITE_IP_GEOLOCATION_DB
  const response = ref<GeolocationResponseType2 | null>(null)

  const load = async (input?: QueryParams) => {
    const resp = await axios.get(baseURL, { params: { ...input, apiKey } })

    response.value = resp.data
  }

  return { response, load }
}