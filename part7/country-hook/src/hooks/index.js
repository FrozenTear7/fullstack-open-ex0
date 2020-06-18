import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const { data } = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}`
        )

        setCountry({ data: data[0], found: true })
      } catch (error) {
        setCountry({ found: false })
        console.log(error)
      }
    }

    if (name) fetchCountryData()
  }, [name])

  return country
}
