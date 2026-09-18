import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Testimonials.css';

function Testimonials() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/testimonials`)
            .then((res) => res.json())
            .then((data) => { setItems(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    if (!loading && items.length === 0) return null;

    return (
        <section className="testimonials" id="testimonials">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// Feedback</span>
                <h2 className="section-title">What People Say</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={2} />
            ) : (
                <div className="testimonial-grid">
                    {items.map((item, index) => (
                        <motion.div
                            className="testimonial-card"
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <FaQuoteLeft className="quote-icon" />
                            <p className="testimonial-message">{item.message}</p>
                            <div className="testimonial-author">
                                <strong>{item.name}</strong>
                                {item.role && <span>{item.role}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Testimonials;