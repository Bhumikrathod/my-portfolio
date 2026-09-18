import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });

        const handleOver = (e) => {
            if (e.target.closest('a, button, .pill, .project-card')) setIsHovering(true);
        };
        const handleOut = (e) => {
            if (e.target.closest('a, button, .pill, .project-card')) setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
        };
    }, []);

    return (
        <motion.div
            className="custom-cursor"
            animate={{
                x: position.x - 10,
                y: position.y - 10,
                scale: isHovering ? 2 : 1,
                backgroundColor: isHovering ? 'rgba(255,177,0,0.15)' : 'rgba(255,177,0,0)'
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
        />
    );
}

export default CustomCursor;