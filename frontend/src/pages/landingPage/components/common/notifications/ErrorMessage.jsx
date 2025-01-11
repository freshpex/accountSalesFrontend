export default function ErrorMessage({ message, extraClasses }) {
    return (
        <p className={`text-accent-900 ${extraClasses}`}>{message}</p>
    );
}
