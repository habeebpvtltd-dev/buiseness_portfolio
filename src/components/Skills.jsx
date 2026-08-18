import { useEffect, useRef } from 'react';
import { skills } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Skills.css';

/* Thin wrapper so every call site gets its own ref */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const TECH_STACK = [
  { name: 'Python',         icon: '🐍' },
  { name: 'JavaScript',     icon: '⚡' },
  { name: 'React',          icon: '⚛️'  },
  { name: 'Node.js',        icon: '🟢' },
  { name: 'FastAPI',        icon: '🚀' },
  { name: 'Flask',          icon: '🌶️'  },
  { name: 'MongoDB',        icon: '🍃' },
  { name: 'Scikit-Learn',   icon: '🤖' },
  { name: 'Pandas',         icon: '🐼' },
  { name: 'NumPy',          icon: '📐' },
  { name: 'SQL',            icon: '🗄️'  },
  { name: 'Git',            icon: '🔀' },
  { name: 'Flutter',        icon: '💙' },
  { name: 'Supabase',       icon: '⚡' },
  { name: 'Express.js',     icon: '🛤️'  },
  { name: 'Matplotlib',     icon: '📊' },
];

function SkillBar({ category, proficiency, tools, delay }) {
  const barRef    = useRef(null);
  const sectionRef = useReveal({ threshold: 0.3 });

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = proficiency + '%';
          }, delay);
          observer.unobserve(bar.closest('.skill-card'));
        }
      },
      { threshold: 0.5 }
    );

    const card = bar.closest('.skill-card');
    if (card) observer.observe(card);
    return () => observer.disconnect();
  }, [proficiency, delay]);

  return (
    <div className="skill-card stagger-child reveal" ref={sectionRef}>
      <div className="skill-card__header">
        <span className="skill-card__category">{category}</span>
        <span className="skill-card__pct mono-tag">{proficiency}%</span>
      </div>

      <div className="skill-card__bar-track" aria-label={`${category} proficiency: ${proficiency}%`}>
        <div
          ref={barRef}
          className="skill-card__bar-fill"
          style={{ width: '0%', transitionDelay: `${delay}ms` }}
          role="progressbar"
          aria-valuenow={proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="skill-card__tools">
        {tools.map(tool => (
          <span key={tool} className="skill-card__tool">{tool}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useReveal();

  return (
    <section className="section skills" id="skills">
      <div className="section-inner">
        <div ref={titleRef} className="reveal">
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">
            My <span className="accent">Tech Stack</span>
          </h2>
        </div>

        {/* Skill bars */}
        <div className="skills__grid">
          {skills.map((s, i) => (
            <SkillBar
              key={s.category}
              {...s}
              delay={i * 150}
            />
          ))}
        </div>

        {/* Tech cloud */}
        <Reveal delay={0.3} className="skills__cloud-outer">
          <div className="skills__cloud-wrap">
            <p className="skills__cloud-label">Technologies I work with</p>
            <div className="skills__cloud">
              {TECH_STACK.map((tech, i) => (
                <span
                  key={tech.name}
                  className="skills__tech-pill"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <span className="skills__tech-icon" aria-hidden="true">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
