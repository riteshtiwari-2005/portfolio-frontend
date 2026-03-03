import { Link } from 'react-router-dom';
import { toDisplayImageUrl } from '../utils/imageUrl';

export default function ProjectCard({ project }) {
  const { _id, title, description, technologies, liveUrl, githubUrl, category, featured, imageUrl } = project;
  const thumbnailUrl = toDisplayImageUrl(imageUrl);

  return (
    <div className="card group relative overflow-hidden">
      {featured && (
        <span className="absolute top-4 right-4 text-xs font-mono text-gold border border-gold px-2 py-0.5">
          Featured
        </span>
      )}

      <div className="mb-4">
        <span className="text-xs font-mono text-gold uppercase tracking-widest">{category}</span>
      </div>

      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="w-full h-44 object-cover rounded mb-4"
        />
      )}

      <h3 className="font-display text-xl text-cream mb-3 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>

      <p className="font-body text-sm text-cream text-opacity-60 leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {technologies?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs font-mono bg-white bg-opacity-5 px-2 py-1 text-cream text-opacity-60">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs font-mono text-cream text-opacity-40">+{technologies.length - 4}</span>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <Link
          to={`/projects/${_id}`}
          className="text-xs font-mono tracking-wider text-gold hover:text-cream transition-colors border-b border-gold hover:border-cream pb-0.5"
        >
          View Details →
        </Link>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono tracking-wider text-cream text-opacity-50 hover:text-cream transition-colors border-b border-transparent hover:border-cream pb-0.5">
            GitHub
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono tracking-wider text-cream text-opacity-50 hover:text-cream transition-colors border-b border-transparent hover:border-cream pb-0.5">
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}
