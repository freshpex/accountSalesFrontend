export default function OutlinedButton({ children, extraClasses, ...attributes }) {
    return (
        <button
            {...attributes}
            className={`block | border-2 border-solid border-primary rounded-full | hover:bg-primary text-primary hover:text-neutral-100 | active:scale-95 | transition-all | ${extraClasses}`}
        >
            {children}
        </button>
    );
}
