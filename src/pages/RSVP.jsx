import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { wedding } from '../config.js';
import PageIntro from '../components/PageIntro.jsx';

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function RSVP() {
  const [status, setStatus] = useState('idle');

  async function submit(event) {
    event.preventDefault();
    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      setStatus('not-configured');
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    setStatus('sending');

    try {
      await emailjs.send(emailServiceId, emailTemplateId, {
        to_email: [wedding.couple.emailOne, wedding.couple.emailTwo].join(', '),
        from_name: data.get('name'),
        attendance: data.get('attendance'),
        guests: data.get('guests'),
        note: data.get('note') || 'brak',
      }, { publicKey: emailPublicKey });
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }
  return <><PageIntro number="04" eyebrow="RSVP" title={<>Będzie nam<br/><em>bardzo miło.</em></>} subtitle={`Dajcie znać do ${wedding.rsvp.deadline}, czy będziecie świętować razem z nami.`}/><form className="rsvp-form" onSubmit={submit}><label>Wasze imię i nazwisko<input required name="name" placeholder="np. Anna Kowalska" autoComplete="name"/></label><label>Czy będziecie z nami?<select name="attendance"><option>Tak, z radością!</option><option>Niestety nie damy rady</option></select></label><label>Liczba osób<select name="guests"><option>1 osoba</option><option>2 osoby</option><option>3 osoby</option><option>4 osoby</option></select></label><label>Wiadomość lub potrzeby dietetyczne<textarea name="note" rows="3" placeholder="Napiszcie nam, jeśli mamy coś wiedzieć…"/></label><button className="button button-dark" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Wysyłanie…' : 'Wyślij odpowiedź'} <span>↗</span></button>{status === 'sent' && <p className="form-message" role="status">Odpowiedź została wysłana do Aleksandry i Michała. Dziękujemy!</p>}{status === 'error' && <p className="form-message" role="alert">Nie udało się wysłać odpowiedzi. Spróbuj ponownie za chwilę.</p>}{status === 'not-configured' && <p className="form-message" role="alert">Wysyłka nie jest jeszcze skonfigurowana. Spróbuj ponownie później.</p>}<p className="form-note">Odpowiedź trafi na adresy {wedding.couple.emailOne} i {wedding.couple.emailTwo}.</p></form></>;
}