import { useEffect } from 'react';
import { wedding } from './config.js';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';
import Schedule from './pages/Schedule.jsx';
import FAQ from './pages/FAQ.jsx';
import RSVP from './pages/RSVP.jsx';
import Contact from './pages/Contact.jsx';

const nav = [
  ['/szczegoly', 'Szczegóły'],
  ['/plan', 'Plan dnia'],
  ['/faq', 'FAQ'],
  ['/kontakt', 'Kontakt'],
];
function Header() {
  return <header className="topbar"><a className="brand" href="/">{wedding.couple.initials}</a><nav aria-label="Główna nawigacja">{nav.map(([path, title]) => <a href={path} key={path}>{title}</a>)}</nav><a className="nav-rsvp" href="/rsvp">Potwierdź obecność <span>↗</span></a></header>;
}

function Footer() {
  return <footer className="footer"><a className="brand" href="/">{wedding.couple.initials}</a><p>Z miłością, {wedding.couple.firstNameOne} i {wedding.couple.firstNameTwo} · {wedding.dateLabel}</p><a href="/rsvp">Dajcie nam znać, czy będziecie <span>↗</span></a></footer>;
}

export default function App() {
  function getRoute() {
    return window.location.pathname.replace(/\/$/, '') || '/';
  }

  const path = getRoute();

  const pages = { '/': <Home/>, '/szczegoly': <Details/>, '/plan': <Schedule/>, '/faq': <FAQ/>, '/kontakt': <Contact/>, '/rsvp': <RSVP/> };
  const page = pages[path] || <Home/>;

  useEffect(() => {
    const titles = { '/': 'Nasza historia', '/szczegoly': 'Szczegóły', '/plan': 'Plan dnia', '/faq': 'FAQ', '/kontakt': 'Kontakt', '/rsvp': 'RSVP', '/historia': 'Nasza historia' };
    document.title = `${titles[path] || 'Nasza historia'} — ${wedding.couple.display}`;
  }, [path]);

  return <><Header/><main key={path}>{page}</main><Footer/></>;
}
