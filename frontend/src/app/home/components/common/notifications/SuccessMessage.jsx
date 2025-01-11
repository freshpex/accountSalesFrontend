export default function SuccessMessage({ message, extraClasses }) {
    return (
        <p className={`text-accent-400 ${extraClasses}`}>{message}</p>
    );
}
