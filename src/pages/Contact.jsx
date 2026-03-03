import { useState } from 'react';
import { sendMessage } from '../services/api';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { data } = await sendMessage(form);
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.error || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white bg-opacity-5 border border-white border-opacity-10 text-cream font-body px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-300 placeholder-cream placeholder-opacity-20";

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-16">
          <span className="font-mono text-gold text-sm tracking-widest">// Get In Touch</span>
          <h1 className="section-title mt-2">Contact Me</h1>
          <div className="gold-line" />
          <p className="font-body text-cream text-opacity-50 max-w-xl">
            Have a project idea or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="reveal space-y-8">
            <div>
              <h3 className="font-mono text-gold text-sm tracking-widest uppercase mb-6">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-lg mt-1">@</span>
                  <div>
                    <p className="font-body text-xs text-cream text-opacity-40 uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:ritesht378@gmail.com" className="font-body text-cream hover:text-gold transition-colors">
ritesht378@gmail.com                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-lg mt-1">#</span>
                  <div>
                    <p className="font-body text-xs text-cream text-opacity-40 uppercase tracking-wider mb-1">GitHub</p>
                    <a href="https://github.com/riteshtiwari-2005" target="_blank" rel="noopener noreferrer"
                      className="font-body text-cream hover:text-gold transition-colors">
                      github.com/riteshtiwari-2005
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-gold text-lg mt-1">in</span>
                  <div>
                    <p className="font-body text-xs text-cream text-opacity-40 uppercase tracking-wider mb-1">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/ritesh-tiwari-871018275/" target="_blank" rel="noopener noreferrer"
                      className="font-body text-cream hover:text-gold transition-colors">
                      linkedin.com/in/ritesh-tiwari-871018275
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white border-opacity-10 pt-8">
              <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Response Time</p>
              <p className="font-body text-cream text-opacity-60 text-sm">
                I typically respond within 24–48 hours. For urgent matters, reach out directly via email.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={inputClass + ' resize-none'}
              />

              {status && (
                <div className={`font-body text-sm px-4 py-3 border ${
                  status.type === 'success'
                    ? 'border-green-500 bg-green-500 bg-opacity-10 text-green-400'
                    : 'border-rust bg-rust bg-opacity-10 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
