export default function HamburgerButton({ buttonExtraClasses, isMobileMenuVisible, hamburgerRef, hamburgerToggle }) {
    return (
        <button
            ref={hamburgerRef}
            aria-label="hamburger toggle button for mobile menu visibility"
            aria-expanded={isMobileMenuVisible}
            aria-controls="mobile-menu"
            className={`shrink-0 z-50 bg-transparent ${buttonExtraClasses}`}
            onClick={hamburgerToggle}
        >
            <svg
                className="fill-primary"
                viewBox="0 0 100 100"
                width="25"
                height="25"
            >
                {
                    [
                        {
                            x: 10,
                            y: isMobileMenuVisible ? 45 : 25,
                            rotate: isMobileMenuVisible ? 'rotate-45' : ''
                        },
                        {
                            x: 10,
                            y: 45,
                            opacity: isMobileMenuVisible ? 'opacity-0' : 'opacity-100'
                        },
                        {
                            x: 10,
                            y: isMobileMenuVisible ? 45 : 65,
                            rotate: isMobileMenuVisible ? '-rotate-45' : ''
                        }
                    ].map((rect, index) =>
                        <rect
                            key={index}
                            className={`origin-center transition-all delay-300 ${(index === 0 || index === 2) ? rect?.rotate : rect?.opacity} `}
                            width="80"
                            height="10"
                            x={rect?.x}
                            y={rect?.y}
                            rx="5">
                        </rect>
                    )
                }
            </svg>
        </button >
    );
}
