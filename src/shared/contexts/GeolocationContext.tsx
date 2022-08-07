import { createContext, useEffect, useState, ReactNode } from 'react'

type GeolocationContextProps = {
  error: string
  location: GeolocationCoordinates
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

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
      },
      (error) => {
        setError(error.message)
      }
    )
  }, [])

  return (
    <GeolocationContext.Provider value={{ error, location }}>
      {children}
    </GeolocationContext.Provider>
  )
}
