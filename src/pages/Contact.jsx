import { wedding } from '../config.js';
import PageIntro from '../components/PageIntro.jsx';

const contacts = [
  {
    label: '01 / ALEKSANDRA',
    name: `${wedding.couple.firstNameOne} ${wedding.couple.lastNameOne}`,
    phone: wedding.couple.phoneOne,
    email: wedding.couple.emailOne,
  },
  {
    label: '02 / MICHAŁ',
    name: `${wedding.couple.firstNameTwo} ${wedding.couple.lastNameTwo}`,
    phone: wedding.couple.phoneTwo,
    email: wedding.couple.emailTwo,
  },
];

export default function Contact() {
  return <><PageIntro number="04" eyebrow="KONTAKT" title={<>Jesteśmy<br/><em>do Waszej dyspozycji.</em></>} subtitle="Zadzwońcie lub napiszcie. Chętnie odpowiemy na Wasze pytania."/><section className="contact-grid practical-grid section-wrap">{contacts.map((contact) => <article key={contact.email}><span className="detail-number">{contact.label}</span><h2>{contact.name}</h2><div className="contact-links"><span>Telefon:</span>{' '}<a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a><br/><span>E-mail:</span>{' '}<a href={`mailto:${contact.email}`}>{contact.email}</a></div></article>)}</section></>;
}