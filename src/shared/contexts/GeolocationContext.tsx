import { createContext, useEffect, useState, ReactNode } from 'react'

type GeolocationContextProps = {
  error: string
  location: GeolocationCoordinates
  loading: boolean
}

export const GeolocationContext = createContext(
  {} as GeolocationContextProps
)

type GeolocationProviderProps = {
  children: ReactNode
}

export const GeolocationProvider = ({ children }: GeolocationProviderProps) => {
  const [location, setLocation] = useState({} as GeolocationCoordinates)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        setLoading(false)
      }
    )
  }, [])

  return (
    <GeolocationContext.Provider value={{ error, location, loading }}>
      {children}
    </GeolocationContext.Provider>
  )
}
