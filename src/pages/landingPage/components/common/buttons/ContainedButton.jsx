export default function ContainedButton({ children, extraClasses, ...attributes }) {
    return (
        <button
            {...attributes}
            className={`block text-neutral-100 rounded-full bg-primary hover:bg-primary/90 | active:scale-95 | transition-all ${extraClasses}`}
        >
            {children}
        </button>
    );
}
