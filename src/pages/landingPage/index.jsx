import "./LandingPage.css";
import Main from "./layouts/Main";
import PrimaryFooter from "./layouts/footer/PrimaryFooter";
import SecondaryFooter from "./layouts/footer/SecondaryFooter";
import Header from "./layouts/header/index";
import Banner from "./components/Banner";
import Cta from "./components/Cta";
import Featured from "./sections/featured";
import Hero from "./sections/hero";
import Marketplace from "./sections/marketplace";
import Resource from "./sections/resource";

function LandingPage() {
  return (
    <div>
      <Header />
      <Main>
        <Hero />
        <Banner />
        <Marketplace />
        <Featured />
        <Cta />
        <Resource />
      </Main>
      <PrimaryFooter />
      <SecondaryFooter />
    </div>
  );
}

export default LandingPage;
