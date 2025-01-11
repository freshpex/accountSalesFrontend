import './App.css';
import Main from './components/layouts/Main';
import PrimaryFooter from './components/layouts/footer/PrimaryFooter';
import SecondaryFooter from './components/layouts/footer/SecondaryFooter';
import Header from './components/layouts/header/index';
import Banner from './containers/Banner';
import Cta from './containers/Cta';
import Featured from './containers/featured';
import Hero from './containers/hero';
import Marketplace from './containers/marketplace';
import Resource from './containers/resource';

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
};


export default LandingPage;