import { useEffect, useRef, useState } from 'react';
import { profile, contact } from '../data/portfolio';
import './Hero.css';

/* ── Typewriter hook ── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ── Particle Canvas — constrained to text column ── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   raf;
    let   mouse  = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const N       = 60;
    const CONNECT = 110;
    const particles = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  Math.random() * 1.5 + 0.5,
    }));

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          p.vx += dx / d * 0.15;
          p.vy += dy / d * 0.15;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x  += p.vx; p.y  += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,58,237,0.45)';
        ctx.fill();
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.18 * (1 - d / CONNECT)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}

/* ── Hero ── */
export default function Hero() {
  const typed = useTypewriter([
    'trains models.',
    'ships products.',
    'builds APIs.',
    'solves problems.',
  ]);

  return (
    <section className="hero" id="hero">
      {/* Two-column split */}
      <div className="hero__layout">

        {/* ── LEFT: Text content + particle canvas behind it ── */}
        <div className="hero__text-col">
          <ParticleField />

          <div className="hero__inner">
            {/* Status badge */}
            <div className="hero__badge reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="hero__badge-dot" />
              <span>Available for opportunities</span>
            </div>

            {/* Name */}
            <h1 className="hero__name reveal" style={{ transitionDelay: '0.25s' }}>
              <span className="hero__name-first">Mohamed</span>
              <span className="hero__name-last">Imran <em>H</em></span>
            </h1>

            {/* Typewriter tagline */}
            <p className="hero__tagline reveal" style={{ transitionDelay: '0.4s' }}>
              <span className="hero__tagline-prefix">&lt;dev/&gt;</span>
              <span className="hero__typed">{typed}</span>
              <span className="hero__cursor" aria-hidden="true">|</span>
            </p>

            {/* Summary */}
            <p className="hero__summary reveal" style={{ transitionDelay: '0.55s' }}>
              {profile.summary}
            </p>

            {/* Strength tags */}
            <div className="hero__tags reveal" style={{ transitionDelay: '0.7s' }}>
              {profile.strengths.map(s => (
                <span key={s} className="hero__tag">{s}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero__actions reveal" style={{ transitionDelay: '0.85s' }}>
              <a href="#projects" className="btn btn-primary">
                View Projects
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
                </svg>
                GitHub
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .79 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Scroll hint */}
            <div className="hero__scroll reveal" style={{ transitionDelay: '1.1s' }} aria-hidden="true">
              <div className="hero__scroll-mouse">
                <div className="hero__scroll-wheel" />
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Profile Image ── */}
        <div className="hero__image-col">
          <div className="hero__image-wrapper">
            <img src="/portfolio_image.png" alt="Mohamed Imran H" className="hero__image" />
          </div>
        </div>

      </div>

      {/* Watermark stays behind layout, hidden on mobile */}
      <div className="hero__watermark" aria-hidden="true">MI</div>
    </section>
  );
}
