export default function Navigation({ children, navExtraClasses, ulExtraClasses, ariaLabel }) {
    return (
        <nav
            aria-label={ariaLabel}
            className={navExtraClasses}
        >
            <ul className={ulExtraClasses}>
                {children}
            </ul>
        </nav>
    );
}
