import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Projects.css';

function TiltCard({ project, index }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientY - rect.top - rect.height / 2) / 10;
        const y = (e.clientX - rect.left - rect.width / 2) / -10;
        setTilt({ x, y });
    };

    const resetTilt = () => setTilt({ x: 0, y: 0 });

    return (
        <motion.div
            className="project-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease'
            }}
        >
            {project.image_link ? (
                <div className="project-image" style={{ backgroundImage: `url(${project.image_link})` }}></div>
            ) : (
                <div className="project-banner">{'</>'}</div>
            )}
            <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noreferrer">View Project →</a>
            </div>
        </motion.div>
    );
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/projects`)
            .then((res) => res.json())
            .then((data) => { setProjects(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    return (
        <section className="projects" id="projects">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// Work</span>
                <h2 className="section-title">My Projects</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={3} />
            ) : projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <TiltCard project={project} index={index} key={project.id} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;