import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
    return (
        <section className="hero" id="home">
            <motion.img
                src="/profile.jpg"
                alt="Profile"
                className="hero-img"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            />
            <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Hi, I'm Your Name
            </motion.h1>
            <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                Frontend Developer | React Enthusiast
            </motion.p>
            <motion.a
                href="#contact"
                className="hero-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
            >
                Contact Me
            </motion.a>
        </section>
    );
}

export default Hero;