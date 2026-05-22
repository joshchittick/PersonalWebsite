// Variant: Swiss Grid v2 — focused single-direction with Iceland photo integrated.

const { useState: useStateSwissV2, useEffect: useEffectSwissV2 } = React;

function ResumeModal({ onClose }) {
  const [email, setEmail] = useStateSwissV2("");
  const [status, setStatus] = useStateSwissV2("idle"); // idle | submitting | done | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mpqnpbpa", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
        setTimeout(() => {
          window.open("assets/josh-chittick-resume.pdf", "_blank");
          onClose();
        }, 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <button className="resume-modal__close" onClick={onClose} aria-label="Close">✕</button>
        <div className="resume-modal__eyebrow">Resume</div>
        <h2 className="resume-modal__title">Drop your email<br/>and I'll share it.</h2>
        <p className="resume-modal__sub">No newsletters. Just a PDF.</p>
        {status === "done" ? (
          <p className="resume-modal__success">Opening now →</p>
        ) : (
          <form className="resume-modal__form" onSubmit={handleSubmit}>
            <input
              className="resume-modal__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <button className="resume-modal__submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "View Resume →"}
            </button>
            {status === "error" && <p className="resume-modal__error">Something went wrong. Try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

function VariantSwissV2() {
  const D = window.SITE_DATA;
  const [activeSection, setActiveSection] = useStateSwissV2("home");
  const [showResumeModal, setShowResumeModal] = useStateSwissV2(false);
  const sections = ["home", "about", "now", "running", "projects", "experience", "contact"];

  useEffectSwissV2(() => {
    const root = document.querySelector(".swiss-root");
    if (!root) return;
    const handler = () => {
      const scrollPos = root.scrollTop + 140;
      let current = "home";
      for (const id of sections) {
        const el = root.querySelector(`#sw-${id}`);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    root.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => root.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const root = document.querySelector(".swiss-root");
    const el = root?.querySelector(`#sw-${id}`);
    if (el && root) root.scrollTo({ top: el.offsetTop - 0, behavior: "smooth" });
  };

  return (
    <div className="swiss-root">
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}
      <SwissNavV2 active={activeSection} onNav={scrollTo} />

      {/* HERO — split: type left, Iceland photo right */}
      <section id="sw-home" className="sw-section sw-hero-v2">
        <div className="sw-hero-v2__grid">
          <div className="sw-hero-v2__type">
            <h1 className="sw-h1">
              Josh<br/>Chittick
            </h1>
            <p className="sw-lead sw-hero-v2__lead">
              Senior Product Manager at <strong>Built Technologies</strong>, leading Construction Financials for lenders, owners, and GCs. UC Berkeley engineer. Reformed construction-disputes consultant.
            </p>
            <div className="sw-hero-v2__stats">
              <div className="sw-stat"><div className="sw-stat__k">Currently</div><div className="sw-stat__v">Sr. PM, Built</div></div>
              <div className="sw-stat"><div className="sw-stat__k">Located</div><div className="sw-stat__v"><LiveClock /></div></div>
              <div className="sw-stat"><div className="sw-stat__k">School</div><div className="sw-stat__v">UC Berkeley</div></div>
              <div className="sw-stat"><div className="sw-stat__k">Open to</div><div className="sw-stat__v">A good chat</div></div>
            </div>
          </div>
          <figure className="sw-hero-v2__photo">
            <div className="sw-hero-v2__photo-frame">
              <img src="assets/background.jpg" alt="Skógafoss, Iceland — taken on a recent trip" />
              <div className="sw-hero-v2__photo-num">№ 01</div>
            </div>
            <figcaption className="sw-hero-v2__cap">
              <span className="sw-cap-k">Plate I</span>
              <span className="sw-cap-v">Skógafoss, Iceland, 63.5°N.</span>
            </figcaption>
          </figure>
        </div>

        <div className="sw-marquee" aria-hidden="true">
          <div className="sw-marquee__track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="sw-marquee__item">
                Product Management <span className="sw-marquee__dot">●</span> New York City <span className="sw-marquee__dot">●</span> Civil Engineer turned PM <span className="sw-marquee__dot">●</span> Currently shipping <span className="sw-marquee__dot">●</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="sw-about" className="sw-section">
        <SwissSectionHead num="02" title="About" />
        <div className="sw-about-grid">
          <div className="sw-about-img">
            <img src="assets/headshot.jpg" alt="Josh Chittick" style={{ width: 280, height: 280, objectFit: "cover", objectPosition: "center top", border: "1px solid var(--swiss-rule)", display: "block" }} />
          </div>
          <div className="sw-about-body">
            <p className="sw-body-lg">{D.about.long}</p>
            <p className="sw-body">{D.about.long2}</p>
          </div>
          <div className="sw-about-facts">
            {D.about.facts.map(([k, v]) => (
              <div key={k} className="sw-fact">
                <span className="sw-fact__k">{k}</span>
                <span className="sw-fact__rule"></span>
                <span className="sw-fact__v">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOW */}
      <section id="sw-now" className="sw-section sw-section--alt">
        <SwissSectionHead num="03" title="Now" right={`Updated ${D.now.updated}`} />
        <NowPanel />
      </section>

      {/* CINEMATIC BREAK — Iceland photo full-bleed with overlaid pull-quote */}
      <section className="sw-cinematic" aria-hidden="false">
        <img className="sw-cinematic__img" src="assets/background.jpg" alt=""/>
        <div className="sw-cinematic__overlay">
          <div className="sw-cinematic__inner">
            <div className="sw-eyebrow sw-cinematic__eyebrow">Interlude · Plate II</div>
            <p className="sw-cinematic__quote">
              Skógafoss, Iceland. July 2025.
            </p>
            <div className="sw-cinematic__meta">
              <span>63°31′45″N · 19°30′40″W</span>
              <span>Skógafoss, IS</span>
              <span>July 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING MAP */}
      <section id="sw-running" className="sw-section">
        <SwissSectionHead num="04" title="Running, NYC" right="Click a route" />
        <NYCRunningMap />
      </section>

      {/* PROJECTS */}
      <section id="sw-projects" className="sw-section">
        <SwissSectionHead num="05" title="Projects" />
        <div className="sw-projects">
          {D.projects.map((p, i) => (
            <div key={i} className="sw-project">
              <div className="sw-project__num">{String(i + 1).padStart(2, "0")}</div>
              <div className="sw-project__head">
                <h3 className="sw-project__title">{p.title}</h3>
                <div className="sw-project__meta">{p.role} · {p.year}</div>
              </div>
              <p className="sw-project__blurb">{p.blurb}</p>
              <div className="sw-project__tags">
                {p.tags.map((t) => <span key={t} className="sw-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="sw-experience" className="sw-section sw-section--alt">
        <SwissSectionHead num="06" title="Experience" />
        <div className="sw-exp-resume-row">
          <button className="sw-resume-btn" onClick={() => setShowResumeModal(true)}>
            View Resume ↗
          </button>
        </div>
        <div className="sw-exp">
          {D.experience.map((e, i) => (
            <div key={i} className="sw-exp__row">
              <div className="sw-exp__yr">{e.years}</div>
              <div className="sw-exp__role">{e.role}</div>
              <div className="sw-exp__co">{e.co}</div>
              <div className="sw-exp__where">{e.where}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="sw-contact" className="sw-section sw-contact-section">
        <SwissSectionHead num="07" title="Contact" />
        <div className="sw-contact-grid">
          <div className="sw-contact-cta">
            <h2 className="sw-h2">Let's talk.</h2>
            <p className="sw-body">PM roles, books, running routes, or anything else. Open inbox.</p>
          </div>
          <div className="sw-contact-list">
            <a href={`mailto:${D.contact.email}`} className="sw-contact-row">
              <span className="sw-contact-row__k">Email →</span>
              <span className="sw-contact-row__v">{D.contact.email}</span>
            </a>
            <a href={`tel:${D.contact.phone.replace(/\D/g, "")}`} className="sw-contact-row">
              <span className="sw-contact-row__k">Phone →</span>
              <span className="sw-contact-row__v">{D.contact.phone}</span>
            </a>
            <a href={D.contact.linkedin} target="_blank" rel="noopener noreferrer" className="sw-contact-row">
              <span className="sw-contact-row__k">LinkedIn →</span>
              <span className="sw-contact-row__v">/in/joshchittick</span>
            </a>
          </div>
        </div>
        <div className="sw-foot">
          <span>© {new Date().getFullYear()} Josh Chittick</span>
          <span>Made in NYC</span>
          <span>Set in Inter & JetBrains Mono</span>
        </div>
      </section>
    </div>
  );
}

function SwissNavV2({ active, onNav }) {
  const items = [
    ["home", "Home"],
    ["about", "About"],
    ["now", "Now"],
    ["running", "Running"],
    ["projects", "Projects"],
    ["experience", "Experience"],
    ["contact", "Contact"],
  ];
  return (
    <nav className="sw-nav">
      <div className="sw-nav__brand">JC<span className="sw-nav__dot">.</span></div>
      <ul className="sw-nav__list">
        {items.map(([id, label]) => (
          <li key={id}>
            <button onClick={() => onNav(id)} className={`sw-nav__link ${active === id ? "is-active" : ""}`}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="sw-nav__time"><LiveClock /></div>
    </nav>
  );
}

function SwissSectionHead({ num, title, right }) {
  return (
    <header className="sw-sec-head">
      <span className="sw-sec-head__num">{num}</span>
      <span className="sw-sec-head__title">{title}</span>
      <span className="sw-sec-head__rule"></span>
      {right && <span className="sw-sec-head__right">{right}</span>}
    </header>
  );
}

window.VariantSwissV2 = VariantSwissV2;
