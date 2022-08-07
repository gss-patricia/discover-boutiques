import axios from 'axios'
import { config } from '../../../../config/default'

const APIClient = axios.create({
  baseURL: config.publicRuntimeConfig.endpoints.basePath ,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export default APIClient