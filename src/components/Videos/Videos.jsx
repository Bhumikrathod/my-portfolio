import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaInstagram, FaFacebook, FaExternalLinkAlt } from 'react-icons/fa';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Videos.css';

function getYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

const platformIcons = {
    YouTube: FaYoutube,
    Instagram: FaInstagram,
    Facebook: FaFacebook
};

function MediaCard({ item, index }) {
    const isYouTube = item.platform === 'YouTube';
    const isImage = item.platform === 'Image';
    const youtubeId = isYouTube ? getYouTubeId(item.url) : null;
    const Icon = platformIcons[item.platform] || FaPlay;

    return (
        <motion.div
            className="video-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {isYouTube && youtubeId ? (
                <div className="video-embed">
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : isImage ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                    <img src={item.url} alt={item.title} className="video-image" />
                </a>
            ) : item.thumbnail_url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="video-link-card">
                    <div className="video-thumb-wrap">
                        <img src={item.thumbnail_url} alt={item.title} className="video-image" />
                        <div className="video-overlay">
                            <Icon />
                        </div>
                    </div>
                </a>
            ) : (
                <a href={item.url} target="_blank" rel="noreferrer" className="video-link-card">
                    <div className="video-placeholder">
                        <Icon />
                        <span>View on {item.platform}</span>
                    </div>
                </a>
            )}
            <div className="video-info">
                <h4>{item.title}</h4>
                <span className="video-platform">
                    <Icon /> {item.platform}
                    {item.platform !== 'YouTube' && item.platform !== 'Image' && <FaExternalLinkAlt className="ext-icon" />}
                </span>
            </div>
        </motion.div>
    );
}

function Videos() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/videos`)
            .then((res) => res.json())
            .then((data) => { setItems(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    if (!loading && items.length === 0) return null;

    return (
        <section className="videos-section" id="videos">
            <motion.div
                className="section-title-wrap"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <span className="section-eyebrow">// Media</span>
                <h2 className="section-title">Videos &amp; Media</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={2} />
            ) : (
                <div className="videos-grid">
                    {items.map((item, index) => (
                        <MediaCard item={item} index={index} key={item.id} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Videos;