import { Link, animateScroll as scroll } from "react-scroll";

export default function TextLogo({ extraClasses }) {
    function scrollToTop() {
        scroll.scrollToTop();
    }

    return (
        <Link
            onClick={scrollToTop}
            to="/dashboard"
            className={`text-700 text-primary font-bold font-['Integral_CF',_sans-serif] | py-[10px] leading-tight | cursor-pointer ${extraClasses}`}
            style={{ textTransform: 'none' }}
        >
            ScottTech
        </Link>
    );
}
