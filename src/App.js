import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from './Loading';
import Input from './Input';
import Error from './Error';
import Result from './Result';

function App() {
  const abortController = useRef(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    isFailed: false,
    status: 0,
    errorMessage: ""
  });
  const [result, setResult] = useState({
    isReady: false,
    description: "",
    temp: "",
    humidity: "",
    wind: ""
  });

  const boxShadowStyle = {boxShadow: result.isReady ? "0px 0px 30px 1px #009dff" : 
  error.isFailed ? "0px 0px 30px 1px rgb(255, 0, 0)" :
   "0px 0px 30px 1px rgb(0, 0, 0)"}

  useEffect(() => {
    abortController.current = new AbortController()
    if (loading) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=eb3e2db5cff5f470df5ca2d1ba062f70`,{ signal: abortController.current.signal })
        .then((result) => {
          if (result.ok)
            return result.json()
          else if(result.status === 404){
            setError({
              isFailed: true,
              status: 404,
              errorMessage: "City not found, check your spelling!"
            })
          }
          else {
            setError({
              isFailed: true,
              status: result.status,
              errorMessage: result.statusText
            })
          }
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
          if(e.name === "AbortError") return
          setLoading(false)
          setError({
            isFailed: true,
            status: 0,
            errorMessage: "Something went wrong, check your connection!"
          })
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

  function handleCancel() {
    setLoading(false)
    setError({...error, isFailed: false})
    abortController.current && abortController.current.abort()
  }

  return (
    <div className="d-flex h-100 w-100 pb-5">
      <div className="d-flex flex-column m-auto myCard p-4" style={boxShadowStyle}>
        {result.isReady ? <Result result={{ ...result, city: input }} handleBackButton={handleBackButton} /> :
          error.isFailed ? <Error handleBackButton={handleBackButton} errorMessage={error.errorMessage} status={error.status} /> :
            loading ? <Loading handleCancel={handleCancel} /> : <Input input={input} handleInput={handleInput} handleEnter={handleEnter} />}
      </div>
    </div>
  );
}

export default App;
