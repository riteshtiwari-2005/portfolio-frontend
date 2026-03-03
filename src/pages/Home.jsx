import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getSkills } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { useReveal } from '../hooks/useReveal';

const TECH_STACK = ['MongoDB', 'Express.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Docker'];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [typedIndex, setTypedIndex] = useState(0);
  const ref = useReveal();

  const roles = ['Full Stack Developer', 'MERN Specialist', 'UI/UX Enthusiast', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  useEffect(() => {
    getProjects({ featured: true }).then(({ data }) => setProjects(data.data?.slice(0, 3) || []));
    getSkills().then(({ data }) => setSkills(data.data || []));
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div ref={ref} className="noise">
      {/* HERO */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-ink to-ink opacity-80" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24">
          <div className="reveal mb-4">
            <span className="font-mono text-gold text-sm tracking-widest">// Hello, World</span>
          </div>
          <div className="reveal">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-tight">
              I Build<br />
              <span className="gradient-text">Digital</span><br />
              Experiences.
            </h1>
          </div>
          <div className="reveal">
            <p className="font-body text-xl text-cream text-opacity-60 mb-2">
              <span className="text-gold">&gt;</span> {displayed}
              <span className="animate-pulse text-gold">|</span>
            </p>
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <Link to="/projects" className="btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn-outline">
              Let's Talk
            </Link>
          </div>

          {/* Tech Stack */}
          <div className="reveal mt-20 flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="font-mono text-xs text-cream text-opacity-30 border border-white border-opacity-10 px-3 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-xs text-cream text-opacity-30">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="reveal mb-12">
          <span className="font-mono text-gold text-sm tracking-widest">// Selected Work</span>
          <h2 className="section-title mt-2">Featured Projects</h2>
          <div className="gold-line" />
        </div>

        {projects.length > 0 ? (
          <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="reveal text-center py-16">
            <p className="font-mono text-cream text-opacity-30 text-sm">
              // No projects yet. Add some from the admin panel.
            </p>
          </div>
        )}

        <div className="reveal mt-10 text-center">
          <Link to="/projects" className="btn-outline">
            View All Projects
          </Link>
        </div>
      </section>

      {/* SKILLS */}
      {Object.keys(groupedSkills).length > 0 && (
        <section className="bg-white bg-opacity-3 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="reveal mb-12">
              <span className="font-mono text-gold text-sm tracking-widest">// Capabilities</span>
              <h2 className="section-title mt-2">Skills & Tech</h2>
              <div className="gold-line" />
            </div>

            <div className="reveal grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="card">
                  <h3 className="font-mono text-gold text-sm uppercase tracking-widest mb-4 capitalize">{category}</h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex justify-between mb-1">
                          <span className="font-body text-sm text-cream text-opacity-80">{skill.name}</span>
                          <span className="font-mono text-xs text-gold">{skill.proficiency}%</span>
                        </div>
                        <div className="h-0.5 bg-white bg-opacity-10 rounded">
                          <div
                            className="h-full bg-gold rounded transition-all duration-1000"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="reveal">
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Have a project in mind?
          </h2>
          <p className="font-body text-cream text-opacity-50 mb-8 max-w-md mx-auto">
            I'm always open to discussing new opportunities and interesting ideas.
          </p>
          <Link to="/contact" className="btn-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
