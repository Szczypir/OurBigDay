import { useEffect, useState } from 'react';
import { wedding } from './config.js';

const nav = [
  ['#/szczegoly', 'Szczegóły'],
  ['#/plan', 'Plan dnia'],
  ['#/praktycznie', 'Praktycznie'],
];
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

function Header() {
  return <header className="topbar"><a className="brand" href="#/">{wedding.couple.initials}</a><nav aria-label="Główna nawigacja">{nav.map(([path, title]) => <a href={path} key={path}>{title}</a>)}</nav><a className="nav-rsvp" href="#/rsvp">Potwierdź obecność <span>↗</span></a></header>;
}

function Footer() {
  return <footer className="footer"><a className="brand" href="#/">{wedding.couple.initials}</a><p>Z miłością, {wedding.couple.firstNameOne} i {wedding.couple.firstNameTwo} · {wedding.dateLabel}</p><a href="#/rsvp">Dajcie nam znać, czy będziecie <span>↗</span></a></footer>;
}

function Home() {
  return <>
    <section className="hero"><div className="hero-photo" role="img" aria-label="Romantyczny ogród w ciepłym, wieczornym świetle"/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow light">Z radością zapraszamy na nasz ślub</p><h1>{wedding.couple.initials}</h1><p className="hero-date">{wedding.weekday}, {wedding.dateLabel} <span>·</span> {wedding.ceremonyTime}</p><a className="button button-light" href="#/szczegoly">Poznaj szczegóły <span>↗</span></a></div><div className="hero-note"><span className="note-line"/>{wedding.venue.address.split(',').at(-1).trim()}<br/>zapiszcie tę datę</div><div className="hero-index">01 — 04</div></section>
    <section className="intro section-wrap"><div className="section-kicker"><span>01</span> / ZAPROSZENIE</div><div className="intro-main"><p className="eyebrow">Najpiękniejsze chwile są jeszcze piękniejsze, gdy dzielimy je z Wami.</p><h2>Przed nami <em>nowy rozdział.</em><br/>Chcemy zacząć go razem z Wami.</h2><a className="text-link" href="#/rsvp">Będziecie z nami? <span>↗</span></a></div><div className="intro-side"><span className="tiny-flower">*</span><p>Po latach wspólnych rozmów, podróży i małych codziennych radości — mówimy sobie „tak”.</p><span className="signature">{wedding.couple.initials}</span></div></section>
    <section className="countdown-section"><div><p className="eyebrow">ODLICZAMY DO NASZEGO DNIA</p><h2>Jeszcze chwila…</h2></div><Countdown/><p className="countdown-date">{formattedDate} <span>·</span> {wedding.venue.address.split(',').at(-1).trim()}</p></section>
    <section className="cta-band"><p className="eyebrow light">{wedding.dateLabel.toUpperCase()} · {wedding.venue.address.split(',')[1]?.trim() || wedding.venue.name}</p><h2>Wasze miejsce przy<br/>naszym <em>stole czeka.</em></h2><a className="button button-light" href="#/rsvp">Potwierdź obecność <span>↗</span></a><span className="cta-spark">*</span></section>
  </>;
}

function PageIntro({ number, eyebrow, title, subtitle }) {
  return <section className="page-intro"><p className="section-kicker"><span>{number}</span> / {eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></section>;
}

function Details() {
  return <><PageIntro number="01" eyebrow="SZCZEGÓŁY" title={<>Ważne chwile,<br/><em>piękne miejsce.</em></>} subtitle="Wszystko, co warto wiedzieć o naszym wspólnym dniu."/><section className="details-grid section-wrap"><article className="detail-card"><span className="detail-number">01 / CEREMONIA</span><span className="detail-icon">*</span><h2>Powiedzmy<br/>sobie „tak”.</h2><p>{wedding.venue.ceremony}<br/>{wedding.venue.name}<br/>{wedding.venue.address}</p><strong>od {wedding.partyTime}</strong></article><article className="detail-card detail-dark"><span className="detail-number">02 / PRZYJĘCIE</span><span className="detail-icon">*</span><h2>Świętujmy<br/>do rana.</h2><p>{wedding.venue.party}<br/>{wedding.venue.name}<br/>{wedding.venue.address}</p><strong>od 17:00</strong></article></section><section className="map-callout"><div><p className="eyebrow">JAK DOJECHAĆ?</p><h2>Widzimy się<br/><em>w {wedding.venue.where}</em></h2><p>{wedding.venue.name}<br/>{wedding.venue.address}</p></div><a className="button button-dark" href={wedding.venue.mapUrl} target="_blank" rel="noreferrer">Otwórz mapę <span>↗</span></a><span className="map-deco">52°<br/>N 20° E</span></section></>;
}

function Schedule() {
  return <><PageIntro number="02" eyebrow="PLAN DNIA" title={<>Bez pośpiechu,<br/><em>z całego serca.</em></>} subtitle="Rozgośćcie się, celebrujcie i bawcie razem z nami."/><section className="schedule section-wrap">{wedding.schedule.map((item, index) => <article className="schedule-row" key={`${item.time}-${item.title}`}><span className="schedule-index">0{index + 1}</span><time>{item.time}</time><div><h2>{item.title}</h2><p>{item.detail}</p></div><span className="schedule-spark">*</span></article>)}</section><section className="schedule-note"><span>*</span><p>Plan może delikatnie się zmienić — najważniejsze, żebyśmy byli razem.</p></section></>;
}

function Practical() {
  return <><PageIntro number="03" eyebrow="PRAKTYCZNIE" title={<>Małe podpowiedzi<br/><em>na wielki dzień.</em></>} subtitle="Kilka informacji, dzięki którym będziecie mogli skupić się na świętowaniu."/><section className="practical-grid section-wrap"><article><span className="detail-number">01 / UBIÓR</span><h2>Letnia elegancja</h2><p>{wedding.dressCode}</p></article><article><span className="detail-number">02 / NOCLEG</span><h2>{wedding.lodging.name}</h2><p>{wedding.lodging.note}<br/>{wedding.lodging.address}</p></article><article><span className="detail-number">03 / PREZENTY</span><h2>Wasza obecność</h2><p>{wedding.giftNote}</p></article><article><span className="detail-number">04 / PYTANIA</span><h2>Jesteśmy dla Was</h2><p>{wedding.couple.firstNameOne}: {wedding.couple.phoneOne}<br/>{wedding.couple.firstNameTwo}: {wedding.couple.phoneTwo}<br/></p></article></section><section className="rsvp-strip"><div><p className="eyebrow light">PROSIMY O ODPOWIEDŹ DO {wedding.rsvp.deadline.toUpperCase()}</p><h2>Liczymy na Was!</h2></div><a className="button button-light" href="/rsvp">Potwierdź obecność <span>↗</span></a></section></>;
}

function RSVP() {
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Potwierdzenie obecności — ${data.get('name')}`);
    const body = encodeURIComponent(`Cześć!\n\n${data.get('name')} potwierdza: ${data.get('attendance')}.\nLiczba osób: ${data.get('guests')}\nDieta / wiadomość: ${data.get('note') || 'brak'}\n\nDo zobaczenia!`);
    window.location.href = `mailto:${wedding.rsvp.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <><PageIntro number="04" eyebrow="RSVP" title={<>Będzie nam<br/><em>bardzo miło.</em></>} subtitle={`Dajcie znać do ${wedding.rsvp.deadline}, czy będziecie świętować razem z nami.`}/><form className="rsvp-form" onSubmit={submit}><label>Wasze imię i nazwisko<input required name="name" placeholder="np. Anna Kowalska" autoComplete="name"/></label><label>Czy będziecie z nami?<select name="attendance"><option>Tak, z radością!</option><option>Niestety nie damy rady</option></select></label><label>Liczba osób<select name="guests"><option>1 osoba</option><option>2 osoby</option><option>3 osoby</option><option>4 osoby</option></select></label><label>Wiadomość lub potrzeby dietetyczne<textarea name="note" rows="3" placeholder="Napiszcie nam, jeśli mamy coś wiedzieć…"/></label><button className="button button-dark" type="submit">Wyślij odpowiedź <span>↗</span></button>{sent && <p className="form-message" role="status">Otwieramy program pocztowy z gotową wiadomością. Dziękujemy!</p>}<p className="form-note">Formularz przygotuje wiadomość e-mail do {wedding.rsvp.email}; nie zapisuje danych na stronie.</p></form></>;
}

export default function App() {
  function getRoute() {
    const hashRoute = window.location.hash.replace(/^#/, '') || '/';
    const pathRoute = window.location.pathname.replace(/\/$/, '') || '/';
    return hashRoute.startsWith('/') ? hashRoute : pathRoute;
  }

  const [path, setPath] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setPath(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const pages = { '/': <Home/>, '/szczegoly': <Details/>, '/plan': <Schedule/>, '/praktycznie': <Practical/>, '/rsvp': <RSVP/> };
  const page = pages[path] || <Home/>;

  useEffect(() => {
    const titles = { '/': 'Nasza historia', '/szczegoly': 'Szczegóły', '/plan': 'Plan dnia', '/praktycznie': 'Praktycznie', '/rsvp': 'RSVP', '/historia': 'Nasza historia' };
    document.title = `${titles[path] || 'Nasza historia'} — ${wedding.couple.display}`;
  }, [path]);

  return <><Header/><main key={path}>{page}</main><Footer/></>;
}
