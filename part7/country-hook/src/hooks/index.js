import axios from "axios"
import { useEffect, useState } from "react"

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!name) {
            setCountry(null)
            setLoading(false)
            return
        }

        const fetchCountry = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                
                setCountry({ found: true, data: response.data})
            } catch (err) {
                setCountry({ found: false })
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCountry()
    }, [name])
    return { country, loading, error}
}

export default useCountry