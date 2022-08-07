import { GeolocationContext } from '../contexts/'
import { useContext } from 'react'

export const useGeolocation = () =>   useContext(GeolocationContext)
