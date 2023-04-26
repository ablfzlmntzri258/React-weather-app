import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from './Loading';
import Input from './Input';
import Error from './Error';
import Result from './Result';

function App() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);
  const [result, setResult] = useState({
    isReady: false,
    description: "",
    temp: "",
    humidity: "",
    wind: ""
  });

  useEffect(() => {
    if (loading) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=eb3e2db5cff5f470df5ca2d1ba062f70`)
        .then((result) => {
          if (result.ok)
            return result.json()
          console.log(result.statusText);
          setError(true)
          setLoading(false)
        })
        .then((result) => {
          if (result) {
            const tempInCelsius = Math.trunc(Number(result.main.temp) - 273);
            const windSpeedInKM = (Math.round(result.wind.speed * 3.6 * 100) / 100).toFixed(2)
            setResult({
              isReady: true,
              description: result.weather[0].description,
              temp: tempInCelsius,
              humidity: result.main.humidity,
              wind: windSpeedInKM

            })
            setLoading(false)
          }
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
          setError(true)
        })
    }
  }, [loading])

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleEnter(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      setLoading(true)
    }
  }

  function handleBackButton() {
    setError(false)
    setLoading(false)
    setResult({ ...result, isReady: false })
    setInput('')
  }

  return (
    <div className="d-flex h-100 w-100 pb-5">
      <div className="d-flex flex-column m-auto myCard p-4">
        {result.isReady ? <Result result={{ ...result, city: input }} handleBackButton={handleBackButton} /> :
          error ? <Error handleBackButton={handleBackButton} /> :
            loading ? <Loading /> : <Input input={input} handleInput={handleInput} handleEnter={handleEnter} handleBackButton={handleBackButton} />}
      </div>
    </div>
  );
}

export default App;
