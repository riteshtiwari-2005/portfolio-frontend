import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white border-opacity-10 py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl text-cream">
          Portfolio<span className="text-gold">.</span>
        </p>
        <p className="font-body text-sm text-cream text-opacity-40">
          © {year} — Built with MERN Stack
        </p>
        <div className="flex gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="text-cream text-opacity-40 hover:text-gold transition-colors text-sm font-body">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="text-cream text-opacity-40 hover:text-gold transition-colors text-sm font-body">
            LinkedIn
          </a>
          <Link to="/contact"
            className="text-cream text-opacity-40 hover:text-gold transition-colors text-sm font-body">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
