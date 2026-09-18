import PageIntro from '../../components/PageIntro/PageIntro';
import CustomCursor from '../../components/CustomCursor/CustomCursor';
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import TechTicker from '../../components/TechTicker/TechTicker';
import Stats from '../../components/Stats/Stats';
import About from '../../components/About/About';
import Experience from '../../components/Experience/Experience';
import Skills from '../../components/Skills/Skills';
import Certifications from '../../components/Certifications/Certifications';
import Projects from '../../components/Projects/Projects';
import Testimonials from '../../components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
import BackToTop from '../../components/BackToTop/BackToTop';

function Portfolio() {
    return (
        <div className="App">
            <PageIntro />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <Hero />
            <TechTicker />
            <Stats />
            <About />
            <Experience />
            <Skills />
            <Certifications />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
            <BackToTop />
        </div>
    );
}

export default Portfolio;