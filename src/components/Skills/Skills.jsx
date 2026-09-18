import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Skills.css';

function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/skills`)
            .then((res) => res.json())
            .then((data) => { setSkills(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {});

    const skillGroups = Object.keys(grouped).map((category) => ({
        category,
        items: grouped[category]
    }));

    return (
        <section className="skills" id="skills">
            <div className="section-title-wrap">
                <span className="section-eyebrow">// Skills</span>
                <h2 className="section-title">My Skills</h2>
                <div className="section-underline"></div>
            </div>

            {loading ? (
                <SkeletonCard count={3} />
            ) : skillGroups.length === 0 ? (
                <p>No skills found.</p>
            ) : (
                <div className="skills-groups">
                    {skillGroups.map((group, gIndex) => (
                        <motion.div
                            className="skill-group"
                            key={gIndex}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: gIndex * 0.1 }}
                        >
                            <h4>{group.category}</h4>
                            <div className="pill-row">
                                {group.items.map((skill, i) => (
                                    <motion.span
                                        className="pill"
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Skills;