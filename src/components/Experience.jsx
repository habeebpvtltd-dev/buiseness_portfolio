import { useReveal } from '../hooks/useReveal';
import { experience } from '../data/portfolio';
import './Experience.css';

const ICONS = {
  'Python / Flask':            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  'Logistic Regression':       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  'FastAPI / Express':         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  'Technical Reviews':         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

export default function Experience() {
  const titleRef = useReveal();

  return (
    <section className="section experience" id="experience">
      <div className="section-inner">
        <div ref={titleRef} className="reveal">
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title">
            What I've <span className="accent">Built</span>
          </h2>
        </div>

        <div className="exp__timeline">
          {experience.map((item, i) => (
            <ExperienceItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ item, index }) {
  const ref = useReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`exp__item reveal ${index % 2 === 0 ? 'reveal-delay-1' : 'reveal-delay-2'}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Timeline node */}
      <div className="exp__node">
        <div className="exp__node-icon">
          {ICONS[item.tech] ?? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4l3 3"/>
            </svg>
          )}
        </div>
        <div className="exp__node-line" />
      </div>

      {/* Card */}
      <div className="exp__card g-card">
        <div className="exp__card-top">
          <span className="exp__index mono-tag">0{index + 1}</span>
          <span className="exp__tech">{item.tech}</span>
        </div>
        <h3 className="exp__title">{item.title}</h3>
        <p className="exp__desc">{item.description}</p>

        {/* Decorative corner */}
        <div className="exp__card-corner" aria-hidden="true" />
      </div>
    </div>
  );
}
