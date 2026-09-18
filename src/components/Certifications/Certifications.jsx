import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Certifications.css';

function Certifications() {
    const [certs, setCerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/certifications`)
            .then((res) => res.json())
            .then((data) => { setCerts(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    return (
        <section className="certifications" id="certifications">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// Certifications</span>
                <h2 className="section-title">Certifications</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={2} />
            ) : certs.length === 0 ? (
                <p>No certifications found.</p>
            ) : (
                <div className="cert-list">
                    {certs.map((cert, index) => (
                        <motion.div
                            className="cert-card"
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <FaCertificate className="cert-icon" />
                            <div>
                                <h3>{cert.title}</h3>
                                <p>{cert.issuer}</p>
                                {cert.link && (
                                    <a href={cert.link} target="_blank" rel="noreferrer">View Certificate →</a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Certifications;