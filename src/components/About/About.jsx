import { motion } from 'framer-motion';
import './About.css';

function About() {
    return (
        <section className="about" id="about">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                About Me
            </motion.h2>
            <motion.p
                className="about-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Main ek passionate developer hoon jo React, JavaScript aur modern web
                technologies mein kaam karta hoon. Mujhe naye projects banana aur
                problem-solving pasand hai. Yahan apna intro likho.
            </motion.p>
        </section>
    );
}

export default About;