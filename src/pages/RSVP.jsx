import { useState } from 'react';
import { wedding } from '../config.js';
import PageIntro from '../components/PageIntro.jsx';

export default function RSVP() {
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Potwierdzenie obecności — ${data.get('name')}`);
    const body = encodeURIComponent(`Cześć!\n\n${data.get('name')} potwierdza: ${data.get('attendance')}.\nLiczba osób: ${data.get('guests')}\nDieta / wiadomość: ${data.get('note') || 'brak'}\n\nDo zobaczenia!`);
    window.location.href = `mailto:${wedding.rsvp.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  return <><PageIntro number="05" eyebrow="RSVP" title={<>Będzie nam<br/><em>bardzo miło.</em></>} subtitle={`Dajcie znać do ${wedding.rsvp.deadline}, czy będziecie świętować razem z nami.`}/><form className="rsvp-form" onSubmit={submit}><label>Wasze imię i nazwisko<input required name="name" placeholder="np. Anna Kowalska" autoComplete="name"/></label><label>Czy będziecie z nami?<select name="attendance"><option>Tak, z radością!</option><option>Niestety nie damy rady</option></select></label><label>Liczba osób<select name="guests"><option>1 osoba</option><option>2 osoby</option><option>3 osoby</option><option>4 osoby</option></select></label><label>Wiadomość lub potrzeby dietetyczne<textarea name="note" rows="3" placeholder="Napiszcie nam, jeśli mamy coś wiedzieć…"/></label><button className="button button-dark" type="submit">Wyślij odpowiedź <span>↗</span></button>{sent && <p className="form-message" role="status">Otwieramy program pocztowy z gotową wiadomością. Dziękujemy!</p>}<p className="form-note">Formularz przygotuje wiadomość e-mail do {wedding.rsvp.email}; nie zapisuje danych na stronie.</p></form></>;
}