import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService from './services/countries.js'
import CountryDetails from './components/CountryDetails.jsx'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = (countryName) => {
    countryService.getByName(countryName)
      .then(countryData => {
        setSelectedCountry(countryData)
        fetchWeather(countryData.capitalInfo.latlng[0], countryData.capitalInfo.latlng[1])
      })
      .catch(error => console.error('Error fetching country:', error))
  }

  const fetchWeather = (latitude, longitude) => {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m`

    countryService.getWeather(weatherUrl)
      .then(weatherData => {
        setWeather(weatherData.current)
      })
      .catch(error => console.error('Error fetching weather:', error))
  }

  useEffect(() => {
    if (filter.trim() === '') {
      setCountries([])
      setSelectedCountry(null)
      setWeather(null)
      return
    }

    countryService.getAll()
      .then(returnedCountries => {
        const filteredCountries = returnedCountries.filter(country =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        )

        setCountries(filteredCountries)

        if (filteredCountries.length === 1) {
          handleShowCountry(filteredCountries[0].name.common)
        } else {
          setSelectedCountry(null)
          setWeather(null)
        }
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [filter])

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange} />

      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <CountryDetails country={selectedCountry} weather={weather} />
      ) : (
        <div>
          {countries.map(country => (
            <div key={country.cca3}>
              {country.name.common} 
              <button onClick={() => handleShowCountry(country.name.common)}>Show</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
