export default function TextButton({ children, extraClasses, ...attributes }) {
    return (
        <button
            {...attributes}
            className={`block | active:scale-95 | transition-all | ${extraClasses}`}
        >
            {children}
        </button>
    );
}
