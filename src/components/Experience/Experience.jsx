import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Experience.css';

function Experience() {
    const [experienceList, setExperienceList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/experience`)
            .then((res) => res.json())
            .then((data) => { setExperienceList(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    return (
        <section className="experience" id="experience">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// Experience</span>
                <h2 className="section-title">Experience</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={2} />
            ) : experienceList.length === 0 ? (
                <p>No experience found.</p>
            ) : (
                <div className="experience-list">
                    {experienceList.map((exp, index) => (
                        <motion.div
                            className="experience-card"
                            key={exp.id}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                            <span className="duration">{exp.duration}</span>
                            <ul>
                                {exp.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Experience;