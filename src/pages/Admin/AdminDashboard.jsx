export const API_BASE = 'https://portfolio-backend-gyug.onrender.com/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const API = API_BASE;

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Admin-Token': localStorage.getItem('adminToken')
    };
}

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-tabs">
                {['projects', 'skills', 'experience', 'certifications', 'testimonials', 'social', 'videos', 'messages'].map((tab) => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="admin-content">
                {activeTab === 'projects' && <ProjectsManager />}
                {activeTab === 'skills' && <SkillsManager />}
                {activeTab === 'experience' && <ExperienceManager />}
                {activeTab === 'certifications' && <CertificationsManager />}
                {activeTab === 'messages' && <MessagesManager />}
                {activeTab === 'testimonials' && <TestimonialsManager />}
                {activeTab === 'social' && <SocialLinksManager />}
                {activeTab === 'videos' && <VideosManager />}
            </div>
        </div>
    );
}

function ProjectsManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', link: '', image_link: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/projects`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/projects/${editId}` : `${API}/projects`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ title: '', description: '', link: '', image_link: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ title: item.title, description: item.description, link: item.link, image_link: item.image_link || '' });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                <input placeholder="Link" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                <input placeholder="Image URL (optional)" value={form.image_link} onChange={e => setForm({ ...form, image_link: e.target.value })} />
                <button type="submit">{editId ? 'Update' : 'Add'} Project</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', link: '', image_link: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.title}</strong><p>{item.description}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SkillsManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ category: '', name: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/skills`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/skills/${editId}` : `${API}/skills`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ category: '', name: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ category: item.category, name: item.name });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/skills/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Category (e.g. Frontend)" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
                <input placeholder="Skill Name (e.g. React.js)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <button type="submit">{editId ? 'Update' : 'Add'} Skill</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ category: '', name: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.name}</strong><p>{item.category}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExperienceManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ role: '', company: '', duration: '', pointsText: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/experience`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            role: form.role,
            company: form.company,
            duration: form.duration,
            points: form.pointsText.split('\n').filter(p => p.trim() !== '')
        };
        const url = editId ? `${API}/experience/${editId}` : `${API}/experience`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(payload) });
        setForm({ role: '', company: '', duration: '', pointsText: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ role: item.role, company: item.company, duration: item.duration, pointsText: item.points.join('\n') });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/experience/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
                <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
                <input placeholder="Duration" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
                <textarea placeholder="Points (ek line mein ek point)" rows="4" value={form.pointsText} onChange={e => setForm({ ...form, pointsText: e.target.value })} />
                <button type="submit">{editId ? 'Update' : 'Add'} Experience</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ role: '', company: '', duration: '', pointsText: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.role}</strong><p>{item.company} — {item.duration}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CertificationsManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: '', issuer: '', link: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/certifications`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/certifications/${editId}` : `${API}/certifications`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ title: '', issuer: '', link: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ title: item.title, issuer: item.issuer, link: item.link });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/certifications/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Certification Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <input placeholder="Issuer" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} required />
                <input placeholder="Link (optional)" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
                <button type="submit">{editId ? 'Update' : 'Add'} Certification</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', issuer: '', link: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.title}</strong><p>{item.issuer}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MessagesManager() {
    const [items, setItems] = useState([]);

    const load = () => fetch(`${API}/messages`, { headers: getHeaders() }).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleDelete = async (id) => {
        await fetch(`${API}/messages/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <div className="admin-list">
                {items.length === 0 && <p>Koi message nahi hai.</p>}
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div>
                            <strong>{item.name}</strong> ({item.email})
                            <p>{item.message}</p>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestimonialsManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', role: '', message: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/testimonials`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/testimonials/${editId}` : `${API}/testimonials`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ name: '', role: '', message: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ name: item.name, role: item.role, message: item.message });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/testimonials/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="Role (e.g. Mentor, Professor)" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                <textarea placeholder="Testimonial message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                <button type="submit">{editId ? 'Update' : 'Add'} Testimonial</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', role: '', message: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.name}</strong><p>{item.message}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SocialLinksManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ platform: '', url: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/social-links`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/social-links/${editId}` : `${API}/social-links`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ platform: '', url: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ platform: item.platform, url: item.url });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/social-links/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} required style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #E0E3E5' }}>
                    <option value="">Select Platform</option>
                    <option value="GitHub">GitHub</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Twitter">Twitter</option>
                </select>
                <input placeholder="Profile URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required />
                <button type="submit">{editId ? 'Update' : 'Add'} Link</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ platform: '', url: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.platform}</strong><p>{item.url}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function VideosManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: '', platform: '', url: '' });
    const [editId, setEditId] = useState(null);

    const load = () => fetch(`${API}/videos`).then(r => r.json()).then(setItems);
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `${API}/videos/${editId}` : `${API}/videos`;
        const method = editId ? 'PUT' : 'POST';
        await fetch(url, { method, headers: getHeaders(), body: JSON.stringify(form) });
        setForm({ title: '', platform: '', url: '' });
        setEditId(null);
        load();
    };

    const handleEdit = (item) => {
        setForm({ title: item.title, platform: item.platform, url: item.url });
        setEditId(item.id);
    };

    const handleDelete = async (id) => {
        await fetch(`${API}/videos/${id}`, { method: 'DELETE', headers: getHeaders() });
        load();
    };

    return (
        <div className="manager">
            <form className="admin-form" onSubmit={handleSubmit}>
                <input placeholder="Video Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} required style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #E0E3E5' }}>
                    <option value="">Select Platform</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Other">Other</option>
                </select>
                <input placeholder="Video URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required />
                <button type="submit">{editId ? 'Update' : 'Add'} Video</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', platform: '', url: '' }); }}>Cancel</button>}
            </form>

            <div className="admin-list">
                {items.map(item => (
                    <div className="admin-list-item" key={item.id}>
                        <div><strong>{item.title}</strong><p>{item.platform} — {item.url}</p></div>
                        <div className="item-actions">
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;