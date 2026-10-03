import { wedding } from '../config.js';
import PageIntro from '../components/PageIntro.jsx';

export default function FAQ() {
  return <><PageIntro number="03" eyebrow="FAQ" title={<>Dobrze wiedzieć,<br/><em>zanim się spotkamy.</em></>} subtitle="Najważniejsze informacje w jednym miejscu."/><section className="faq-list section-wrap">{wedding.faq.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<span>+</span></summary><div className="faq-answer">{item.image && <img src={item.image.src} alt={item.image.alt} className="smallPhoto" />}<p>{item.answer}</p></div></details>)}</section></>;
} 