import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useOffCanvas from "../../../../hooks/useOffCanvas";
import Navigation from "../../components/common/Navigation";
import OutlinedButton from "../../components/common/buttons/OutlinedButton";
import TextLogo from "../../components/common/logo/TextLogo";
import DynamicWidthSearchBar from "../../components/common/searchBar/DynamicWidthSearchBar";
import NormalSearchBar from "../../components/common/searchBar/NormalSearchBar";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const {
    hamburgerToggle,
    isMobileMenuVisible,
    setIsMobileMenuVisible,
    hamburgerRef,
    sidebarRef,
  } = useOffCanvas();

  return (
    <header
      aria-label="header"
      className="fixed top-0 left-0 z-10 | w-full | border-b border-solid border-neutral-400 | before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-neutral-100/80 before:backdrop-blur-3xl"
    >
      <div className="container tablet:px-10 laptop:px-20 | py-7">
        {/* navbar main elements */}
        <div className="max-[1360px]:relative | flex items-center justify-between">
          {/* logo */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TextLogo extraClasses="pr-10" />
          </motion.div>

          <div className="grow | flex items-center max-[899px]:hidden">
            {/* navigation for larger devices */}
            <Navigation
              ariaLabel="header navigation"
              navExtraClasses="pl-5 border-l border-solid border-neutral-400 | max-[899px]:hidden"
              ulExtraClasses="flex items-center gap-3"
            >
              {[
                ["Marketplace", "marketplace", -40],
                ["Resource", "resource", -80],
                ["About", "about"],
              ].map(([navItem, url, offset], index) => (
                <li key={index}>
                  <Link
                    activeClass="bg-primary text-neutral-100 hover:bg-primary/90"
                    to={url}
                    spy={true}
                    smooth={true}
                    offset={offset}
                    duration={500}
                    className="cursor-pointer font-medium px-5 py-2 rounded-full hover:bg-neutral-300 transition-all"
                  >
                    {navItem}
                  </Link>
                </li>
              ))}
            </Navigation>

            <div className="grow justify-end | flex items-center gap-5">
              {/* search field for larger device */}
              <div className="basis-[300px] hidden min-[1360px]:block">
                <NormalSearchBar />
              </div>

              {/* buttons */}
              {/* <Link to="/login"> */}
              <OutlinedButton
                type="button"
                extraClasses="px-10 py-4 font-semibold bg-neutral-100 leading-[100%]"
              >
                <Link to="/register">Sign Up</Link>
              </OutlinedButton>

              <OutlinedButton
                type="button"
                extraClasses="px-5 py-4 font-semibold bg-neutral-100 leading-[100%]"
              >
                <Link to="/login">Login</Link>
              </OutlinedButton>
              {/* </Link> */}
            </div>
          </div>

          {/* hamburger button for smaller devices */}
          <HamburgerButton
            hamburgerRef={hamburgerRef}
            hamburgerToggle={hamburgerToggle}
            isMobileMenuVisible={isMobileMenuVisible}
            buttonExtraClasses="min-[900px]:hidden"
          />

          {/* search field for smaller device */}
          <div className="block min-[1360px]:hidden max-[899px]:hidden | max-[1360px]:absolute -bottom-14 right-1/2 translate-x-1/2">
            <DynamicWidthSearchBar />
          </div>
        </div>
      </div>

      {/* MobileMenu for smaller devices */}
      <MobileMenu
        isMobileMenuVisible={isMobileMenuVisible}
        setIsMobileMenuVisible={setIsMobileMenuVisible}
        sidebarRef={sidebarRef}
        offCanvasExtraClasses="min-[900px]:hidden"
        offCanvasBackdropExtraClasses="min-[900px]:hidden"
      />
    </header>
  );
}
