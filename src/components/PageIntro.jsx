export default function PageIntro({ number, eyebrow, title, subtitle }) {
  return <section className="page-intro"><p className="section-kicker"><span>{number}</span> / {eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></section>;
}