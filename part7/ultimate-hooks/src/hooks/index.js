import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
    return response.data
  }

  useEffect(() => {
    getAll()
  }, [baseUrl])

  return [
    resources,
    { create }
  ]
}

export default useResource
