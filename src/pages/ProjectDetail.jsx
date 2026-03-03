import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(id)
      .then(({ data }) => setProject(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-mono text-gold animate-pulse">Loading...</div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-cream text-opacity-50 mb-4">// Project not found</p>
        <Link to="/projects" className="btn-outline">← Back to Projects</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/projects" className="font-mono text-sm text-cream text-opacity-50 hover:text-gold transition-colors mb-8 inline-block">
          ← Back to Projects
        </Link>

        {project.featured && (
          <span className="font-mono text-xs text-gold border border-gold px-2 py-0.5 mb-4 inline-block">
            Featured
          </span>
        )}

        <div className="mb-4">
          <span className="font-mono text-gold text-sm uppercase tracking-widest">{project.category}</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-cream mb-6">
          {project.title}
        </h1>

        <p className="font-body text-xl text-cream text-opacity-60 mb-8 leading-relaxed">
          {project.description}
        </p>

        {project.longDescription && (
          <div className="prose mb-8">
            <p className="font-body text-cream text-opacity-60 leading-relaxed whitespace-pre-wrap">
              {project.longDescription}
            </p>
          </div>
        )}

        {project.technologies?.length > 0 && (
          <div className="mb-10">
            <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech} className="font-mono text-sm bg-white bg-opacity-5 border border-white border-opacity-10 px-3 py-1.5 text-cream">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-8 border-t border-white border-opacity-10">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
