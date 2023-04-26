export default function Result(props) {
    return (
        <div className="d-flex h-100 text-center justify-content-center flex-column pb-2 fade-in fade-out">
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


