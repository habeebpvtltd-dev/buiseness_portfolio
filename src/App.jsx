import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

export default function App() {
  /* ── Custom Cursor ── */
  useEffect(() => {
    const ring = document.getElementById('cursor-ring');
    const dot  = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let raf;
    let rx = 0, ry = 0;
    let tx = 0, ty = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.left = tx + 'px';
      dot.style.top  = ty + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      rx = lerp(rx, tx, 0.12);
      ry = lerp(ry, ty, 0.12);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => ring.classList.add('hovered');
    const rmHover  = () => ring.classList.remove('hovered');
    const addClick = () => ring.classList.add('clicking');
    const rmClick  = () => ring.classList.remove('clicking');

    const targets = document.querySelectorAll('a, button, [data-hover]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', rmHover);
    });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', addClick);
    document.addEventListener('mouseup',   rmClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', addClick);
      document.removeEventListener('mouseup',   rmClick);
    };
  }, []);

  /* ── Scroll Progress ── */
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Global UI chrome */}
      <div id="scroll-progress" aria-hidden="true" />
      <div id="cursor-ring"   aria-hidden="true" />
      <div id="cursor-dot"    aria-hidden="true" />

      {/* Floating ambient orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
