import { useEffect, useState } from 'react';
import { wedding } from './config.js';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx';
import Schedule from './pages/Schedule.jsx';
import FAQ from './pages/FAQ.jsx';
import RSVP from './pages/RSVP.jsx';
import Contact from './pages/Contact.jsx';

const nav = [
  ['/', 'Strona główna'],
  ['/szczegoly', 'Szczegóły'],
  ['/plan', 'Plan dnia'],
  ['/faq', 'FAQ'],
  ['/kontakt', 'Kontakt'],
  ['/rsvp', 'Potwierdź obecność'],
];
const baseUrl = import.meta.env.BASE_URL;

function routeHref(path) {
  return `${baseUrl}${path.replace(/^\//, '')}`;
}

function Header({ activePath }) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 24) {
        setIsHidden(false);
      } else if (Math.abs(currentScrollY - previousScrollY) > 3) {
        setIsHidden(currentScrollY > previousScrollY);
      }
      previousScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className={`topbar${isHidden ? ' topbar-hidden' : ''}`}><a className="brand" href={routeHref('/')}>{wedding.couple.initials}</a><nav aria-label="Główna nawigacja">{nav.map(([path, title]) => <a href={routeHref(path)} key={path} aria-current={path === activePath ? 'page' : undefined}>{title}</a>)}</nav></header>;
}

function Footer() {
  return <footer className="footer"><a className="brand" href={routeHref('/')}>{wedding.couple.initials}</a><p>Z miłością, {wedding.couple.firstNameOne} i {wedding.couple.firstNameTwo} · {wedding.dateLabel}</p><a href={routeHref('/rsvp')}>Dajcie nam znać, czy będziecie <span>↗</span></a></footer>;
}

export default function App() {
  function getRoute() {
    const pathname = window.location.pathname.startsWith(baseUrl)
      ? `/${window.location.pathname.slice(baseUrl.length)}`
      : window.location.pathname;
    return pathname.replace(/\/$/, '') || '/';
  }

  const path = getRoute();

  const pages = { '/': <Home/>, '/szczegoly': <Details/>, '/plan': <Schedule/>, '/faq': <FAQ/>, '/kontakt': <Contact/>, '/rsvp': <RSVP/> };
  const page = pages[path] || <Home/>;

  useEffect(() => {
    const titles = { '/': 'Nasza historia', '/szczegoly': 'Szczegóły', '/plan': 'Plan dnia', '/faq': 'FAQ', '/kontakt': 'Kontakt', '/rsvp': 'RSVP', '/historia': 'Nasza historia' };
    document.title = `${titles[path] || 'Nasza historia'} — ${wedding.couple.display}`;
  }, [path]);

  return <><Header activePath={path}/><main key={path}>{page}</main><Footer/></>;
}
