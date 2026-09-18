import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaTwitter, FaGlobe } from 'react-icons/fa';
import { API_BASE } from '../../config';
import './Footer.css';

const iconMap = {
    GitHub: FaGithub,
    LinkedIn: FaLinkedin,
    Instagram: FaInstagram,
    YouTube: FaYoutube,
    Twitter: FaTwitter
};

function Footer() {
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE}/social-links`)
            .then((res) => res.json())
            .then(setSocialLinks)
            .catch((err) => console.error(err));
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>Bhumika Rathod</h3>
                    <p>Aspiring Full Stack Developer</p>
                </div>

                <div className="footer-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer-socials">
                    {socialLinks.map((link) => {
                        const Icon = iconMap[link.platform] || FaGlobe;
                        return (
                            <a href={link.url} target="_blank" rel="noreferrer" key={link.id}>
                                <Icon />
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Bhumika Rathod. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;