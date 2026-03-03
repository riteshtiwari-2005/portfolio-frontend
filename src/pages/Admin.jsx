import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProjects, deleteProject, createProject, getMessages, getSkills, createSkill, deleteSkill } from '../services/api';

const TABS = ['projects', 'messages', 'skills'];

export default function Admin() {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // New project form state
  const [newProject, setNewProject] = useState({
    title: '', description: '', technologies: '', category: 'web', imageUrl: '', liveUrl: '', githubUrl: '', featured: false
  });

  const [newSkill, setNewSkill] = useState({
    name: '', category: 'frontend', proficiency: 80
  });

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'projects') {
        const { data } = await getProjects();
        setProjects(data.data || []);
      } else if (tab === 'messages') {
        const { data } = await getMessages();
        setMessages(data.data || []);
      } else if (tab === 'skills') {
        const { data } = await getSkills();
        setSkills(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login(loginForm);
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Login failed');
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProject,
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
      };
      await createProject(payload);
      setNewProject({ title: '', description: '', technologies: '', category: 'web', imageUrl: '', liveUrl: '', githubUrl: '', featured: false });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    fetchData();
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await createSkill({ ...newSkill, proficiency: Number(newSkill.proficiency) });
      setNewSkill({ name: '', category: 'frontend', proficiency: 80 });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating skill');
    }
  };

  const inputClass = "bg-white bg-opacity-5 border border-white border-opacity-10 text-cream font-body px-3 py-2 focus:outline-none focus:border-gold transition-colors w-full";

  // Login Page
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl text-cream mb-2">Admin Login</h1>
          <p className="font-mono text-gold text-xs tracking-widest mb-8">// Restricted Access</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={loginForm.username}
              onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
              className={inputClass} required />
            <input type="password" placeholder="Password" value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
              className={inputClass} required />
            {loginError && <p className="text-red-400 text-sm font-body">{loginError}</p>}
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <span className="font-mono text-gold text-sm tracking-widest">// Admin Panel</span>
          <h1 className="font-display text-4xl text-cream mt-2">Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white border-opacity-10">
          {TABS.map(t => (
            <button key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                tab === t ? 'text-gold border-gold' : 'text-cream text-opacity-40 border-transparent hover:text-cream'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 font-mono text-gold animate-pulse">Loading...</div>
        ) : (
          <>
            {/* PROJECTS TAB */}
            {tab === 'projects' && (
              <div className="space-y-8">
                {/* Add Form */}
                <div className="card">
                  <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-6">Add New Project</h3>
                  <form onSubmit={handleAddProject} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Title *" value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                        className={inputClass} required />
                      <select value={newProject.category}
                        onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                        className={inputClass + ' bg-ink'}>
                        {['web', 'mobile', 'fullstack', 'api', 'other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <textarea placeholder="Description *" rows={3} value={newProject.description}
                      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                      className={inputClass + ' resize-none'} required />
                    <input placeholder="Technologies (comma separated)" value={newProject.technologies}
                      onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                      className={inputClass} />
                    <input placeholder="Thumbnail Image URL" value={newProject.imageUrl}
                      onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })}
                      className={inputClass} />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Live URL" value={newProject.liveUrl}
                        onChange={e => setNewProject({ ...newProject, liveUrl: e.target.value })}
                        className={inputClass} />
                      <input placeholder="GitHub URL" value={newProject.githubUrl}
                        onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className={inputClass} />
                    </div>
                    <label className="flex items-center gap-2 font-body text-sm text-cream text-opacity-60 cursor-pointer">
                      <input type="checkbox" checked={newProject.featured}
                        onChange={e => setNewProject({ ...newProject, featured: e.target.checked })} />
                      Featured project
                    </label>
                    <button type="submit" className="btn-primary">Add Project</button>
                  </form>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  <h3 className="font-mono text-gold text-sm uppercase tracking-widest">{projects.length} Projects</h3>
                  {projects.map(p => (
                    <div key={p._id} className="card flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-body text-cream font-medium">{p.title}</h4>
                        <p className="font-mono text-xs text-cream text-opacity-40">{p.category} · {p.technologies?.join(', ')}</p>
                      </div>
                      <button onClick={() => handleDeleteProject(p._id)}
                        className="font-mono text-xs text-rust hover:text-cream transition-colors border border-rust border-opacity-50 px-3 py-1 hover:border-cream flex-shrink-0">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {tab === 'messages' && (
              <div className="space-y-4">
                <h3 className="font-mono text-gold text-sm uppercase tracking-widest">{messages.length} Messages</h3>
                {messages.length === 0 && (
                  <p className="font-mono text-cream text-opacity-30 text-sm">// No messages yet.</p>
                )}
                {messages.map(msg => (
                  <div key={msg._id} className={`card ${!msg.read ? 'border-gold border-opacity-30' : ''}`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="font-body text-cream font-medium">{msg.name}</span>
                        <span className="font-mono text-xs text-cream text-opacity-40 ml-2">{msg.email}</span>
                      </div>
                      {!msg.read && <span className="font-mono text-xs text-gold border border-gold px-2">Unread</span>}
                    </div>
                    <p className="font-body text-sm text-gold mb-2">{msg.subject}</p>
                    <p className="font-body text-sm text-cream text-opacity-60 leading-relaxed">{msg.message}</p>
                    <p className="font-mono text-xs text-cream text-opacity-30 mt-3">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* SKILLS TAB */}
            {tab === 'skills' && (
              <div className="space-y-8">
                <div className="card">
                  <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-6">Add New Skill</h3>
                  <form onSubmit={handleAddSkill} className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <input placeholder="Skill name *" value={newSkill.name}
                        onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                        className={inputClass} required />
                      <select value={newSkill.category}
                        onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                        className={inputClass + ' bg-ink'}>
                        {['frontend', 'backend', 'database', 'devops', 'tools', 'other'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <input type="number" min="1" max="100" placeholder="Proficiency %" value={newSkill.proficiency}
                        onChange={e => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                        className={inputClass} required />
                    </div>
                    <button type="submit" className="btn-primary">Add Skill</button>
                  </form>
                </div>

                <div className="space-y-3">
                  {skills.map(s => (
                    <div key={s._id} className="card flex items-center justify-between gap-4">
                      <div>
                        <span className="font-body text-cream">{s.name}</span>
                        <span className="font-mono text-xs text-cream text-opacity-40 ml-2">{s.category} · {s.proficiency}%</span>
                      </div>
                      <button onClick={() => deleteSkill(s._id).then(fetchData)}
                        className="font-mono text-xs text-rust hover:text-cream transition-colors border border-rust border-opacity-50 px-3 py-1">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
