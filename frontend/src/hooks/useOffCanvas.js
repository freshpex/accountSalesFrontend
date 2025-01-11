import { useEffect, useRef, useState } from "react";

export default function useOffCanvas() {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const hamburgerRef = useRef(null);
    const sidebarRef = useRef(null);

    function hamburgerToggle() {
        setIsMobileMenuVisible(!isMobileMenuVisible);

        // for static offcanvas backdrop
        // document.body.classList.toggle('max-[900px]:overflow-hidden');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !hamburgerRef.current.contains(event.target)
            ) {
                setIsMobileMenuVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

    }, []);

    return {
        isMobileMenuVisible,
        setIsMobileMenuVisible,
        hamburgerToggle,
        hamburgerRef,
        sidebarRef
    };
}