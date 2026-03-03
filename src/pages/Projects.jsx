import { useState, useEffect } from "react";
import { getProjects } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { useReveal } from "../hooks/useReveal";
import { toDisplayImageUrl } from "../utils/imageUrl";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useReveal();
  console.log(projects)
  useEffect(() => {
    setLoading(true);

    // Fetch all projects (no category filter)
    getProjects()
      .then(({ data }) => setProjects(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
function shortdesc(desc)
{
 if(desc.length>100)
 {
  return desc.substring(0,400)+"..."
 }
  else
  {
    return desc
  }
}  return (
  <div ref={ref} className="min-h-screen pt-32 pb-24">
    <div className="max-w-6xl mx-auto px-6">
      
      {/* Header */}
      <div className="reveal mb-12">
        <span className="font-mono text-gold text-sm tracking-widest">
          // My Work
        </span>
        <h1 className="section-title mt-2">All Projects</h1>
        <div className="gold-line" />
        <p className="font-body text-cream text-opacity-50 max-w-xl">
          A collection of things I've built — from full-stack web apps to APIs
          and beyond.
        </p>
      </div>

      {/* Static Projects Grid */}
      <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
     {/* Static Project */}
{projects.map((project) => {
  const thumbnailUrl = toDisplayImageUrl(project.imageUrl);

  return (
    <div
      key={project._id}
      className="card p-6 bg-white bg-opacity-5 rounded-lg"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={`${project.title} thumbnail`}
          className="w-full h-44 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-gold mb-2">
        {project.title}
      </h3>

      <p className="text-cream text-opacity-70 text-sm mb-4">
        {shortdesc(project.description)}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 border border-gold text-gold rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gold hover:underline"
        >
          Live Demo
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gold hover:underline"
        >
          GitHub
        </a>
      </div>
    </div>
  );
})}

        

      </div>
    </div>
  </div>
);
}