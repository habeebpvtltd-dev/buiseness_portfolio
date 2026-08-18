import { useReveal } from '../hooks/useReveal';
import { education, achievements } from '../data/portfolio';
import './Education.css';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Education() {
  const titleRef = useReveal();

  return (
    <section className="section education" id="education">
      <div className="section-inner">
        <div ref={titleRef} className="reveal">
          <span className="section-eyebrow">Education</span>
          <h2 className="section-title">
            Academic <span className="accent">Background</span>
          </h2>
        </div>

        <div className="edu__layout">
          {/* Education timeline */}
          <div className="edu__timeline">
            {education.map((item, i) => (
              <EduCard key={item.degree} item={item} index={i} />
            ))}
          </div>

          {/* Achievements */}
          <Reveal delay={0.3} className="edu__achievements-wrap">
            <div className="edu__achievements">
              <h3 className="edu__ach-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Achievements
              </h3>
              <ul className="edu__ach-list">
                {achievements.map((a, i) => (
                  <li key={i} className="edu__ach-item">
                    <span className="edu__ach-bullet" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EduCard({ item, index }) {
  const ref = useReveal({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className="edu__card reveal g-card"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="edu__card-period mono-tag">{item.period}</div>
      <h3 className="edu__degree">{item.degree}</h3>
      <p className="edu__institution">{item.institution}</p>

      {/* Decorative icon */}
      <div className="edu__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>
    </div>
  );
}
