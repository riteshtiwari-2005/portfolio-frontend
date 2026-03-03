import { useReveal } from '../hooks/useReveal';
import { Link } from 'react-router-dom';

const TIMELINE = [
 
  { year: '2026', title: 'Computer Science Degree', company: 'University', desc: 'Graduated with honors, specializing in web technologies.' },
];

export default function About() {
  const ref = useReveal();

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-16">
          <span className="font-mono text-gold text-sm tracking-widest">// About Me</span>
          <h1 className="section-title mt-2">The Story</h1>
          <div className="gold-line" />
        </div>

        {/* Bio */}
        <div className="reveal grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="font-body text-cream text-opacity-70 leading-relaxed mb-4">
              I'm a full-stack developer passionate about building elegant, performant web applications.
              With the MERN stack as my foundation, I craft solutions that are both technically sound
              and delightful to use.
            </p>
            <p className="font-body text-cream text-opacity-70 leading-relaxed mb-4">
              I believe great software is born from the intersection of clean code and thoughtful design.
              Every project is an opportunity to solve real problems in creative ways.
            </p>
            <p className="font-body text-cream text-opacity-70 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source,
              or brewing the perfect cup of coffee.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card">
              <p className="font-mono text-gold text-xs tracking-widest mb-1">LOCATION</p>
              <p className="font-body text-cream">Vadodara, India</p>
            </div>
            <div className="card">
              <p className="font-mono text-gold text-xs tracking-widest mb-1">EXPERIENCE</p>
              <p className="font-body text-cream">Fresher</p>
            </div>
            <div className="card">
              <p className="font-mono text-gold text-xs tracking-widest mb-1">SPECIALIZATION</p>
              <p className="font-body text-cream">MERN Stack</p>
            </div>
            <div className="card">
              <p className="font-mono text-gold text-xs tracking-widest mb-1">AVAILABILITY</p>
              <p className="font-body text-cream">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                Open to opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="reveal mb-16">
          <h2 className="font-display text-3xl text-cream mb-8">Experience</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white bg-opacity-10" />
            <div className="space-y-10 pl-8">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-9 top-1 w-3 h-3 rounded-full border border-gold bg-ink" />
                  <p className="font-mono text-gold text-xs tracking-widest mb-1">{item.year}</p>
                  <h3 className="font-display text-lg text-cream">{item.title}</h3>
                  <p className="font-body text-sm text-cream text-opacity-50 mb-2">{item.company}</p>
                  <p className="font-body text-sm text-cream text-opacity-60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
       <div className="reveal flex flex-wrap gap-4">
  <Link to="/contact" className="btn-primary">
    Get In Touch
  </Link>

  <a
    href="https://drive.google.com/uc?export=download&id=1UwkC5WvhIvpE4qnJ1j52t6ClDFi_U4fT"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline"
  >
    Download Resume
  </a>
</div>
      </div>


    </div>
  );
}
