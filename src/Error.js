export default function Error({ handleBackButton, errorMessage, status }) {
    return (
        <div className="d-flex h-100 text-center justify-content-center flex-column fade-in">
            <p className="note">{errorMessage}{status ? <><br/>Status Code: {status}</> : <></>}</p>
            <button onClick={handleBackButton} className="mx-auto button">Back</button>
        </div>
    )
}