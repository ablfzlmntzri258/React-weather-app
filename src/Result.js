export default function Result(props) {
    return (
        <div className="d-flex h-100 text-center justify-content-center flex-column pb-2">
            <p style={{ lineHeight: "50px" }} className="resultNote">City Name : {props.result.city.charAt(0).toUpperCase() + props.result.city.slice(1)}<br />
                Description : {props.result.description}<br />
                Temperatue : {props.result.temp} <span>&#8451;</span><br />
                Humidity : {props.result.humidity}%<br />
                Wind Speed : {props.result.wind} km/h
            </p>
            <button onClick={props.handleBackButton} className="mx-auto button">Back</button>
        </div>
    )
}



// const req = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=eb3e2db5cff5f470df5ca2d1ba062f70`)
// req.then((result) => {
//     if(result.ok)
//         return result.text()
// })
//     .then((result) => {
//         resultObject = JSON.parse(result)
//         const tempInCelsius = Math.trunc(Number(resultObject.main.temp) - 273);
//         const windSpeedInKM = (Math.round(resultObject.wind.speed * 3.6 * 100) / 100).toFixed(2)
//         document.querySelector(".result").innerHTML =
//             "City Name :  "+resultObject.name+"<br/>"+
//             "Description :  "+resultObject.weather[0].description+"<br/>"+
//             "Temperature :  "+tempInCelsius+" &#8451"+"<br/>"+
//             "Humidity :  "+resultObject.main.humidity+"%"+"<br/>"+
//             "Wind Speed :  "+windSpeedInKM+"km/h"+"<br/>"+
//             "Note : Information are received from <a href='https://openweathermap.org/current'>openweathermap.org</a>"