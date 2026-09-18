import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Stats.css';

function Counter({ target, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1200;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

function Stats() {
    const stats = [
        { label: 'Technologies', value: 13, suffix: '+' },
        { label: 'Projects Built', value: 2, suffix: '' },
        { label: 'Internship', value: 1, suffix: '' },
        { label: 'MCA Graduate', value: 2026, suffix: '' }
    ];

    return (
        <div className="stats">
            {stats.map((stat, i) => (
                <motion.div
                    className="stat-item"
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <h3><Counter target={stat.value} suffix={stat.suffix} /></h3>
                    <p>{stat.label}</p>
                </motion.div>
            ))}
        </div>
    );
}

export default Stats;