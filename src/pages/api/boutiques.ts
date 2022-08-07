import { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config/default'
import { IHttp, Http} from '../../shared/lib/httpClient/'
import { Boutique, BoutiquesResponse } from '../../shared/types'
import getDistanceFromLatLonInKm from '../../shared/lib/harvesine'

const http: IHttp = Http();
const API_URL = config.publicRuntimeConfig.endpoints.API;
const BOUTIQUES_LIMIT = 5

type ErrorMessage = {
  message: string
}

type ClosestBoutiquesProps = {
  boutiques: Boutique[]
  latitude: string
  longitude: string
}

const parseToClosestBoutiques = ({ boutiques, latitude, longitude }: ClosestBoutiquesProps): Boutique[] => {
  const boutiquesDistanceFixed = boutiques.map(boutique => ({
    ...boutique,
    distance: getDistanceFromLatLonInKm({
      initialLatitude: parseInt(latitude),
      initialLongitude: parseInt(longitude),
      finalLatitude: boutique.location.lat,
      finalLongitude: boutique.location.lon
    })
  }))

  const closestBoutiques = boutiquesDistanceFixed
    .sort(
      (a, b) =>
        a.distance - b.distance
    )
    .slice(0, BOUTIQUES_LIMIT)

    return closestBoutiques;
}

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<BoutiquesResponse | ErrorMessage>
) => {
  const { query } = request

  const longitude = query.longitude as string
  const latitude = query.latitude as string

  if (!longitude || !latitude) {
    return response
      .status(400)
      .json({ message: 'latitude and longitude are required!' })
  }

  try {
    const boutiques: Boutique[] = await http.get(API_URL)

    const closestBoutiques = parseToClosestBoutiques({boutiques, latitude, longitude})

    return response.status(200).json({ boutiques: closestBoutiques })
  } catch (error) {
      const message = error?.response?.data?.message || 'boutiquesApi:: Unable to find the boutiques'

    return response.status(500).json({ message })
  }
}

export default handler
