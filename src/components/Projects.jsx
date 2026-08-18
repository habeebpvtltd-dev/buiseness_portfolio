import { useRef } from 'react';
import { projects } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Projects.css';

function ProjectCard({ project, index }) {
  const cardRef = useReveal({ threshold: 0.15 });
  const innerRef = useRef(null);

  /* ── 3D Tilt ── */
  const onMouseMove = (e) => {
    const el   = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`;
    /* Glow follows mouse */
    const glow = el.querySelector('.proj-card__glow');
    if (glow) {
      glow.style.left = `${(x + 0.5) * 100}%`;
      glow.style.top  = `${(y + 0.5) * 100}%`;
    }
  };

  const onMouseLeave = () => {
    if (innerRef.current)
      innerRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const isLive = !!project.link;

  return (
    <div
      ref={cardRef}
      className="reveal proj-card-wrap"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        ref={innerRef}
        className="proj-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-hover
      >
        {/* Glowing radial follow */}
        <div className="proj-card__glow" aria-hidden="true" />

        {/* Shimmer border */}
        <div className="proj-card__shimmer" aria-hidden="true" />

        {/* Header */}
        <div className="proj-card__header">
          <div className="proj-card__num mono-tag">P{String(index + 1).padStart(2, '0')}</div>
          {isLive && (
            <span className="proj-card__live">
              <span />Live
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="proj-card__name">{project.name}</h3>
        <p className="proj-card__subtitle">{project.subtitle}</p>

        {/* Description */}
        <p className="proj-card__desc">{project.description}</p>

        {/* Metrics */}
        <div className="proj-card__metrics">
          {project.metrics.map(m => (
            <span key={m} className="proj-card__metric">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {m}
            </span>
          ))}
        </div>

        {/* Stack */}
        <div className="proj-card__stack">
          {project.stack.map(t => (
            <span key={t} className="proj-card__tech">{t}</span>
          ))}
        </div>

        {/* Link */}
        <div className="proj-card__footer">
          {isLive ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card__link btn btn-primary"
            >
              View Live
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 11.5l9-9M6 2.5h5.5v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <span className="proj-card__no-link">Private / Research</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const titleRef = useReveal();

  return (
    <section className="section projects" id="projects">
      <div className="section-inner">
        <div ref={titleRef} className="reveal">
          <span className="section-eyebrow">Projects</span>
          <h2 className="section-title">
            Things I've <span className="accent">Shipped</span>
          </h2>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
