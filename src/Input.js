export default function Input({ handleEnter, handleInput, input }) {
    return (
        <>
            <h1 className="mx-auto mt-4 title">Weather App</h1>
            <p className="mx-auto note mt-3">Enter your city name and get its current weather status!</p>
            <p className="mx-auto note">Note: If you're in iran, this app might not work without a VPN!</p>
            <p className="mx-auto note">Information are received from <a href='https://openweathermap.org/current'>openweathermap.org</a></p>
            <input tabIndex="0" value={input}
                onChange={handleInput} onKeyDown={handleEnter}
                className='myInput' type="text" placeholder="Type your city name and press enter!" />
        </>
    )
}