export default function Loading({handleBackButton}) {
    return (
        <div className="d-flex h-100 text-center justify-content-center flex-column">
            <svg style={{height: "40%"}} viewBox="0 0 100 100">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5"
                            floodColor="#009dff" />
                    </filter>
                </defs>
                <circle id="spinner" cx="50" cy="50" r="45" />
            </svg>
            <h1 className="mx-auto mt-2">Fetching...</h1>
            <button onClick={handleBackButton} className="mx-auto button">Back</button>
        </div>
    )
}