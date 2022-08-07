import { Boutique, BoutiquesResponse } from '../../shared/types'
import { createContext, useEffect, useState } from 'react'
import { IHttp, Http} from '../../shared/lib/httpClient'
import APIClient from '../lib/apiClient'
import { useGeolocation } from '../hooks/'
import { useCallback } from 'react'

type BoutiquesContextProps = {
  boutiques: Boutique[]
  error: string
  userLocation: GeolocationCoordinates
}

type BoutiquesProviderProps = {
  children: React.ReactNode
}

const http: IHttp = Http();

export const BoutiquesContext = createContext({} as BoutiquesContextProps)

export const BoutiquesProvider = ({ children }: BoutiquesProviderProps) => {
  const { location, error: locationError } = useGeolocation()

  const [boutiques, setBoutiques] = useState<Boutique[]>([])
  const [error, setError] = useState('')

  const getBoutiques = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        const query = `boutiques?latitude=${latitude}&longitude=${longitude}`
        
        const { data: { boutiques } } = await APIClient.get<BoutiquesResponse>(
          query
        )

        setBoutiques(boutiques)
      } catch (error) {
          const message = error?.response?.data?.message || 'getBotiques:: Something went wrong'
          setError(message)
      }
    },
    []
  )

  useEffect(() => {
    if (locationError) {
      setError(locationError)
      return
    }

    const { latitude, longitude } = location
    if (!!latitude && !!longitude) {
      getBoutiques(latitude, longitude)
    }
  }, [location, getBoutiques, locationError])

  return (
    <BoutiquesContext.Provider
      value={{
        userLocation: location,
        boutiques,
      }}
    >
      {children}
    </BoutiquesContext.Provider>
  )
}
