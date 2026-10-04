import { useEffect, useState } from 'react';
import { wedding } from '../config.js';

const date = new Date(wedding.date);
const formattedDate = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);

function Countdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, date.getTime() - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, date.getTime() - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const seconds = Math.floor(remaining / 1000);
  const values = [
    [Math.floor(seconds / 86400), 'dni'],
    [Math.floor((seconds % 86400) / 3600), 'godzin'],
    [Math.floor((seconds % 3600) / 60), 'minut'],
    [seconds % 60, 'sekund'],
  ];
  return <div className="countdown" aria-label="Odliczanie do ślubu">{values.map(([value, label]) => <div className="countdown-item" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div>;
}

export default function Home() {
  return <>
    <section className="hero"><div className="hero-photo" role="img" aria-label="Romantyczny ogród w ciepłym, wieczornym świetle"/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow light">Z radością zapraszamy na nasz ślub</p><h1>{wedding.couple.firstNameOne}<br/> & {wedding.couple.firstNameTwo}</h1><p className="hero-date">{wedding.weekday}, {wedding.dateLabel} <span>·</span> {wedding.ceremonyTime}</p><a className="button button-light" href={`${import.meta.env.BASE_URL}szczegoly`}>Poznaj szczegóły <span>↗</span></a></div><div className="hero-note"><span className="note-line"/>zapiszcie tę datę</div></section>
    <section className="intro section-wrap"><div className="section-kicker"><span>01</span> / ZAPROSZENIE</div><div className="intro-main"><p className="eyebrow">Najpiękniejsze chwile są jeszcze piękniejsze, gdy dzielimy je z Wami.</p><h2>Przed nami <em>nowy rozdział.</em><br/>Chcemy zacząć go razem z Wami.</h2><a className="text-link" href={`${import.meta.env.BASE_URL}rsvp`}>Będziecie z nami? <span>↗</span></a></div><div className="intro-side"><p>Po latach wspólnych rozmów, podróży i małych codziennych radości — mówimy sobie „tak”.</p><span className="signature">{wedding.couple.initials}</span></div></section>
    <section className="countdown-section"><div><p className="eyebrow">ODLICZAMY DO NASZEGO DNIA</p><h2>Jeszcze chwila…</h2></div><Countdown/><p className="countdown-date">{formattedDate} <span>·</span> {wedding.venue.name}</p></section>
    <section className="cta-band"><p className="eyebrow light"></p><h2>Wasze miejsce przy<br/>naszym <em>stole czeka.</em></h2><a className="button button-light" href={`${import.meta.env.BASE_URL}rsvp`}>Potwierdź obecność <span>↗</span></a></section>
  </>;
}