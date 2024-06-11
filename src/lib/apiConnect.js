import axios from 'axios'

const BASE_URL = 'http://localhost:9000'

export const fetchAllWidgets = () => axios.get(`${BASE_URL}/v1/widgets`).then((response) => response.data)
export const deleteWidget = (name) => axios.delete(`${BASE_URL}/v1/widgets/${name}`).then((response) => response.data)
export const updateWidget = (data) => axios.put(`${BASE_URL}/v1/widgets`,data).then((response) => response.data)
export const getWidgetByName = (name) => axios.get(`${BASE_URL}/v1/widgets/${name}`).then((response) => response.data)
  