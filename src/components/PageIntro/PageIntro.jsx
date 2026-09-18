import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageIntro.css';

function PageIntro() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="page-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="intro-bracket"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {'{'}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            &nbsp;Bhumika Rathod&nbsp;
                        </motion.span>
                        {'}'}
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default PageIntro;