import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaYoutube, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import { API_BASE } from '../../config';
import './Videos.css';

// YouTube URL se video ID nikaalne ka function
function getYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function VideoCard({ video, index }) {
    const isYouTube = video.platform === 'YouTube';
    const youtubeId = isYouTube ? getYouTubeId(video.url) : null;

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
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <a href={video.url} target="_blank" rel="noreferrer" className="video-link-card">
                    <div className="video-placeholder">
                        {video.platform === 'Instagram' ? <FaInstagram /> : <FaPlay />}
                        <span>Watch on {video.platform}</span>
                    </div>
                </a>
            )}
            <div className="video-info">
                <h4>{video.title}</h4>
                <span className="video-platform">
                    {video.platform === 'YouTube' && <FaYoutube />}
                    {video.platform === 'Instagram' && <FaInstagram />}
                    {video.platform} <FaExternalLinkAlt className="ext-icon" />
                </span>
            </div>
        </motion.div>
    );
}

function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/videos`)
            .then((res) => res.json())
            .then((data) => { setVideos(data); setLoading(false); })
            .catch((err) => { console.error(err); setLoading(false); });
    }, []);

    if (!loading && videos.length === 0) return null;

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
                <h2 className="section-title">Videos</h2>
                <div className="section-underline"></div>
            </motion.div>

            {loading ? (
                <SkeletonCard count={2} />
            ) : (
                <div className="videos-grid">
                    {videos.map((video, index) => (
                        <VideoCard video={video} index={index} key={video.id} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Videos;