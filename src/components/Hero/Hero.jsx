import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaTwitter, FaGlobe } from 'react-icons/fa';
import MagneticButton from '../MagneticButton/MagneticButton';
import { API_BASE } from '../../config';
import './Hero.css';

const iconMap = {
    GitHub: FaGithub,
    LinkedIn: FaLinkedin,
    Instagram: FaInstagram,
    YouTube: FaYoutube,
    Twitter: FaTwitter
};

function Hero() {
    const fullText = "Aspiring Full Stack Developer building with React and Python.";
    const [displayedText, setDisplayedText] = useState('');
    const [socialLinks, setSocialLinks] = useState([]);
    const heroRef = useRef(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
        }, 35);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch(`${API_BASE}/social-links`)
            .then((res) => res.json())
            .then(setSocialLinks)
            .catch((err) => console.error(err));
    }, []);

    const handleMouseMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroRef.current.style.setProperty('--mx', `${x}%`);
        heroRef.current.style.setProperty('--my', `${y}%`);
    };

    return (
        <section className="hero" id="home" ref={heroRef} onMouseMove={handleMouseMove}>
            <div className="hero-spotlight"></div>
            <div className="hero-blob blob-1"></div>
            <div className="hero-blob blob-2"></div>

            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="hero-bracket">{'{ '}developer{' }'}</span>
                    <h1 className="hero-title">Hi, I'm Bhumika Rathod</h1>
                    <p className="hero-subtitle">
                        {displayedText}
                        <span className="cursor-blink">|</span>
                    </p>

                    <div className="hero-socials">
                        {socialLinks.map((link) => {
                            const Icon = iconMap[link.platform] || FaGlobe;
                            return (
                                <a href={link.url} target="_blank" rel="noreferrer" key={link.id}>
                                    <Icon />
                                </a>
                            );
                        })}
                    </div>

                    <div className="hero-buttons">
                        <MagneticButton href="#contact" className="hero-btn">Contact Me</MagneticButton>
                        <MagneticButton href="/resume.pdf" download className="hero-btn outline">Download CV</MagneticButton>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image-wrap"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img src="https://api.dicebear.com/7.x/initials/svg?seed=Bhumika Rathod&backgroundColor=16181D" alt="Bhumika Rathod" className="hero-img" />
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;