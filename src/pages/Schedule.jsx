import { wedding } from '../config.js';
import PageIntro from '../components/PageIntro.jsx';

export default function Schedule() {
  return <><PageIntro number="02" eyebrow="PLAN DNIA" title={<>Bez pośpiechu,<br/><em>z całego serca.</em></>} subtitle="Rozgośćcie się, celebrujcie i bawcie razem z nami."/><section className="schedule section-wrap">{wedding.schedule.map((item, index) => <article className="schedule-row" key={`${item.time}-${item.title}`}><span className="schedule-index">0{index + 1}</span><time>{item.time}</time><div><h2>{item.title}</h2><p>{item.detail}</p></div></article>)}</section><section className="schedule-note"><p>Plan imprezy weselnej jest 'płynny' i wszystko będzie zależało od przebiegu dnia.</p></section></>;
}