import { ref, onMounted, toValue } from 'vue'
import * as LeafLet from 'leaflet'
import type { MaybeRefOrGetter } from 'vue'
import type { Map, LatLngExpression } from 'leaflet'

export interface UseLeafletProps {
  render: (options: UseLeafletOptions) => void
  // setMarker: (lat: number, lng: number) => void
}

export interface UseLeafletOptions {
  pos: LatLngExpression,
  zoom?: number,
  marker?: LatLngExpression
}

const icon = LeafLet.icon({
  iconUrl: '/src/assets/images/icon-location.svg',
  iconAnchor: [23, 56]
})

export const useLeaflet = (elementId: MaybeRefOrGetter<string>, initialOptions: UseLeafletOptions): UseLeafletProps => {

  const mapInstance = ref<Map | null>(null)

  const render = (options?: UseLeafletOptions) => {

    if (!options) {
      options = initialOptions
    }

    mapInstance.value = LeafLet.map(toValue(elementId)).setView(options.pos, options?.zoom)

    LeafLet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance.value as Map)

    if (options?.marker) {
      setMarker(options.marker)
    } else {
      setMarker(options.pos)
    }
  }

  const setMarker = (pos: LatLngExpression) => {
    LeafLet.marker(pos, { icon })
      .addTo(mapInstance.value as Map)
      .openPopup()
  }

  onMounted(() => {
    render(initialOptions)
  })

  return { render }
}