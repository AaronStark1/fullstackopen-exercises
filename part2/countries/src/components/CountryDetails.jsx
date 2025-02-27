const CountryDetails = ({ country, weather }) => (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150"
      />
  
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p><strong>Temperature:</strong> {weather.temperature_2m}°C</p>
          <p><strong>Wind Speed:</strong> {weather.windspeed_10m} m/s</p>
        </div>
      )}
    </div>
  )
export default CountryDetails  