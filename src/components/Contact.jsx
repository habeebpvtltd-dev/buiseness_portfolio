import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { contact } from '../data/portfolio';
import { useReveal } from '../hooks/useReveal';
import './Contact.css';

/* ── EmailJS config — values come from .env ── */
const EJ_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJ_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJ_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* Thin wrapper so every call site gets its own ref */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal({ threshold: 0.1 });
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const SOCIAL_LINKS = [
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    value: contact.email,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: contact.linkedin,
    value: 'linkedin.com/in/mohamed-imran-h',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: contact.github,
    value: 'github.com/imranpycode',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:${contact.phone}`,
    value: contact.phone,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82A16 16 0 0 0 16 16.91l1.14-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const titleRef   = useReveal();
  const formRef    = useRef(null);

  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    /* EmailJS send — template variables must match your EmailJS template */
    try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        {
          name:         form.name,       // {{name}} — used in body & From Name
          from_name:    form.name,       // {{from_name}} — used in subject line
          from_email:   form.email,      // {{from_email}}
          message:      form.message,    // {{message}}
          reply_to:     form.email,      // {{reply_to}}
        },
        EJ_KEY
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg('Something went wrong. Please email me directly at ' + contact.email);
      setStatus('error');
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-inner">
        <div ref={titleRef} className="reveal">
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title">
            Let's <span className="accent">Work Together</span>
          </h2>
        </div>

        <div className="contact__layout">
          {/* Left — info */}
          <Reveal delay={0.1} className="contact__info-wrap">
            <div className="contact__info">
              <p className="contact__intro">
                I'm currently open to full-time roles, internships, and freelance
                projects in AI/ML and full-stack development. Let's build something
                great together.
              </p>

              <div className="contact__links">
                {SOCIAL_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="contact__link"
                    data-hover
                  >
                    <span className="contact__link-icon">{link.icon}</span>
                    <div className="contact__link-body">
                      <span className="contact__link-label">{link.label}</span>
                      <span className="contact__link-value">{link.value}</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="contact__link-arrow">
                      <path d="M3 13L13 3M7 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.25} className="contact__form-outer">
            <div className="contact__form-wrap">

              {status === 'sent' ? (
                <div className="contact__success">
                  <div className="contact__success-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <circle cx="16" cy="16" r="15" stroke="var(--lime)" strokeWidth="1.5"/>
                      <path d="M9 16l5 5 9-9" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out — I'll get back to you shortly.</p>
                  <button className="btn btn-secondary" onClick={() => setStatus('idle')}>Send another</button>
                </div>
              ) : (
                <form ref={formRef} className="contact__form" onSubmit={handleSubmit} noValidate>
                  <div className="contact__field">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Mohamed Imran"
                      required
                      autoComplete="name"
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      disabled={status === 'sending'}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="contact__error" role="alert">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-primary contact__submit ${status === 'sending' ? 'contact__submit--sending' : ''}`}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="contact__spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact__footer">
        <div className="contact__footer-inner">
          <p className="contact__footer-text">
            Designed &amp; built by <span>Mohamed Imran H</span> · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </section>
  );
}
