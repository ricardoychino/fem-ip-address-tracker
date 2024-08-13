export interface QueryParams {
  ipAddress?: string,
  domain?: string
}

export type GeolocationResponseType1 = {
  ip: string,
  location: Location,
  domains: string[],
  as: {
      asn: number,
      name: string,
      route: string,
      domain: string,
      type: string
  },
  isp: string
}
export type GeolocationResponseType2 = Omit<GeolocationResponseType1, 'location'> & {
  location: FullLocation
}

type Location = {
  country: string,
  region: string,
  timezone: string
}

type FullLocation = Location & {
  lat: number,
  lng: number,
  // city: string,
  postalCode: string,
  geonameId: number
}