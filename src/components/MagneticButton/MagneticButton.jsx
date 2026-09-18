import { useRef } from 'react';
import { motion } from 'framer-motion';

function MagneticButton({ children, className, href, download, onClick, type, disabled }) {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
        ref.current.style.transform = 'translate(0px, 0px)';
    };

    const Tag = href ? motion.a : motion.button;

    return (
        <Tag
            ref={ref}
            href={href}
            download={download}
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
        >
            {children}
        </Tag>
    );
}

export default MagneticButton;