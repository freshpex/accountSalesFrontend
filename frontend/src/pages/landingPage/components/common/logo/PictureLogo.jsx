import { Link, animateScroll as scroll } from "react-scroll";
import Picture from "../Picture";

export default function PictureLogo() {
    function scrollToTop() {
        scroll.scrollToTop();
    }

    return (
        <Link
            onClick={scrollToTop}
            to="home"
            className="cursor-pointer"
        >
            <span className="sr-only">ScottTech</span>
            <Picture
                src="/dashboard"
                alt="ScottTech logo"
                extraClasses=""
            />
        </Link>
    );
}
