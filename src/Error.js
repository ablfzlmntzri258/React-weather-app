export default function Error({ handleBackButton }) {
    return (
        <div className="d-flex h-100 text-center justify-content-center flex-column">
            <p className="note">Something went wrong, Try again!</p>
            <button onClick={handleBackButton} className="mx-auto button">Back</button>
        </div>
    )
}