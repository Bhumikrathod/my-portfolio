import { motion } from 'framer-motion';
import './About.css';

function About() {
    return (
        <section className="about" id="about">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// About</span>
                <h2 className="section-title">About Me</h2>
                <div className="section-underline"></div>
            </motion.div>
            <motion.p className="about-text">
                Main ek motivated MCA graduate hoon jiski strong foundation hai full stack
                web development mein — Python, JavaScript, React.js, HTML5, CSS3 aur SQL
                ke saath. Mujhe responsive web applications design aur develop karna pasand
                hai, best practices follow karte hue. Frontend, backend, REST APIs aur
                database management mein hands-on experience hai academic projects aur
                internship ke through. Ek entry-level Software Developer role dhoondh rahi
                hoon jahan main apni skills apply kar sakoon aur ek software engineer ke
                roop mein grow kar sakoon.
            </motion.p>
        </section>
    );
}

export default About;