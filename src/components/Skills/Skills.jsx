import { motion } from 'framer-motion';
import './Skills.css';

const skillsList = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Flask', 'MySQL', 'Git'
];

function Skills() {
    return (
        <section className="skills" id="skills">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                My Skills
            </motion.h2>
            <div className="skills-grid">
                {skillsList.map((skill, index) => (
                    <motion.div
                        className="skill-card"
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.08 }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Skills;