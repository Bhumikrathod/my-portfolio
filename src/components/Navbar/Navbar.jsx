import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <motion.nav
            className={scrolled ? 'navbar scrolled' : 'navbar'}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="logo">MyPortfolio</h2>

            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span className={isOpen ? 'bar open' : 'bar'}></span>
                <span className={isOpen ? 'bar open' : 'bar'}></span>
                <span className={isOpen ? 'bar open' : 'bar'}></span>
            </div>

            <ul className={isOpen ? 'nav-links active' : 'nav-links'}>
                <li><a href="#home" onClick={closeMenu}>Home</a></li>
                <li><a href="#about" onClick={closeMenu}>About</a></li>
                <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
                <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
                <li><a href="#certifications" onClick={closeMenu}>Certs</a></li>
                <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                <li><ThemeToggle /></li>
            </ul>
        </motion.nav>
    );
}

export default Navbar;