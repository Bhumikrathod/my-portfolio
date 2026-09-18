import { useState } from 'react';
import MagneticButton from '../MagneticButton/MagneticButton';
import { API_BASE } from '../../config';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="section-title-wrap">
                <span className="section-eyebrow">// Get In Touch</span>
                <h2 className="section-title">Contact Me</h2>
                <div className="section-underline"></div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                <MagneticButton type="submit" className="submit-btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </MagneticButton>

                {status === 'success' && <p className="status-msg success">Message sent successfully!</p>}
                {status === 'error' && <p className="status-msg error">Something went wrong. Try again.</p>}
            </form>
        </section>
    );
}

export default Contact;