import { motion } from 'framer-motion';
import './Projects.css';

const projectsList = [
    { title: 'Project One', description: 'Short description of project one.', link: '#' },
    { title: 'Project Two', description: 'Short description of project two.', link: '#' },
    { title: 'Project Three', description: 'Short description of project three.', link: '#' }
];

function Projects() {
    return (
        <section className="projects" id="projects">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                My Projects
            </motion.h2>
            <div className="projects-grid">
                {projectsList.map((project, index) => (
                    <motion.div
                        className="project-card"
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        whileHover={{ y: -8 }}
                    >
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <a href={project.link} target="_blank" rel="noreferrer">
                            View Project
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Projects;