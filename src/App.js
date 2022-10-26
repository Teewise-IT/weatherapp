import {useState} from 'react';
import './style.css';

function App() {
  let today = new Date()
  let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [input, setInput] = useState("")
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")
  const [dateToday, setDateToday] = useState(date)

  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "f5fc120b2fb43f3d6cffbfdb49d32d9e",
  }

  const iconURL = "https://openweathermap.org/img/w/";

  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const getWeatherData = (e) => {
    if(e.key === "Enter" && input === ""){
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if(e.key === "Enter" && input !== ""){
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
      .then((res) =>{
        if(!res.ok){
          throw Error("Failed to fetch Data")
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setInput("");
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
        setIsLoading(false);
      })
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="flex">
          <div className="wrapper">
            <div className="upper">
              <h1 className="header">Weather App</h1>
              <p className="date">{dateToday}</p>
              <input type="text" placeholder="Search city name" className="search" onChange={handleInput} value={input} onKeyPress={getWeatherData} />
            </div>

            {error ? (
              <p className={errorMsg !== "" ? "error" : ""}>{errorMsg}</p>
            ) : (
              <div className="lower">
              <h2 className="state">{weather.name}, {weather.sys.country}</h2>
              <div><img src={iconURL + weather.weather[0].icon + ".png"} alt={weather.weather[0].main} /></div>
              <p className="temp">Temp: {Math.round(weather.main.temp)} Deg</p>
              <p className="temp">Weather: {weather.weather[0].main}</p>
              <p className="temp">Temp Range: {Math.round(weather.main.temp_min)} Deg / {Math.round(weather.main.temp_max)} Deg</p>
            </div>
            )}
            {isLoading && <h3 className="error">Loading...</h3>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
