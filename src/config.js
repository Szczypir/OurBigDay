// Edytuj wszystkie dane pary, datę, miejsca i kontakt właśnie tutaj.
import aykmImage from './assets/aykm.jpg';

export const wedding = {
  couple: {
    firstNameOne: 'Aleksandra',
    firstNameTwo: 'Michał',
    lastNameOne: 'Winiarska',
    lastNameTwo: 'Dembiński',
    display: 'Aleksandra & Michał',
    initials: 'A & M',
    phoneOne: '+48 509 135 217',
    phoneTwo: '+48 693 419 336',
    emailOne: 'ola.winiarska@wp.pl',
    emailTwo: 'mdembinski2000@gmail.com',
  },
  date: '2027-06-12T15:00:00+02:00',
  dateLabel: '12 czerwca 2027',
  weekday: 'sobota',
  ceremonyTime: '14:00',
  partyTime: '16:00',
  venue: {
    name: 'Spichlerz Galowice',
    where: 'spichlerzu',
    address: 'ul. Leśna 7, 55-020 Galowice',
    ceremony: 'Kościół pw. Narodzenia Najświętszej Marii Panny i św. Wolfganga w Borowie',
    ceremonyAddress: 'ul. Starowiejska 2, 57-160 Borów',
    party: 'Spichlerz Galowice',
    mapUrl: 'https://maps.app.goo.gl/DmfxhpRY4dML8nWY9',
  },
  rsvp: {
    email: 'mdembinski2000@gmail.com',
    deadline: '30 kwietnia 2027',
    phone: '+48 693 419 336',
  },
  lodging: {
    name: 'Spichlerz Galowice',
    address: 'Leśna 7, 55-020 Galowice',
    note: 'Dajcie nam znać, jeśli potrzebujecie noclegu — pomożemy znaleźć najlepszą opcję.',
  },
  schedule: [
    { time: '14:30', title: 'Ceremonia', detail: 'Msza święta w kościele w Borowie' },
    { time: '16:00', title: 'Przyjazd do spichlerza', detail: 'Zbieramy się w Spichlerzu Galowice' },
    { time: '04:00', title: 'Zakończenie zabawy', detail: 'Ostatnie tany i pożegnanie' },
  ],
  dressCode: 'Letnia elegancja. Prosimy, zostawcie kolory bieli dla Panny sMłodej.',
  giftNote: 'Największym prezentem będzie Wasza obecność. Jeśli jednak chcecie nas obdarować, ucieszy nas koperta.',
  faq: [
    { question: 'Gdzie zaparkować?', answer: 'Przy kościele parkujemy wzduż ulic staromiejsiej i konstytucji 3 maja, pod Spichlerzem korzystajcie z miejsc przy ulicach  Leśnej i Irysowej.' },
    { question: 'Jak dojechać na ceremonię i przyjęcie?', answer: 'Mapy obu miejsc znajdziecie w zakładce Szczegóły. W razie pytań zadzwońcie do nas (Michał powinien odebrać 😄).' },
    { question: 'Czy będzie nocleg?', answer: 'Jeśli potrzebujecie noclegu, dajcie nam znać. Pomożemy znaleźć najlepszą opcję w okolicy. Zaznaczcie to przy potwierdzaniu obecności.' },
    { question: 'Czy mogę ubrać się na biało/beżowo/ecru?', image: { src: aykmImage, alt: 'Ola w białej czapce i okularach przeciwsłonecznych' }, answer: 'Możesz, ale nie chciałbym być w twojej skórze... Żartujemy! Prosimy, zostawcie kolory bieli dla Panny Młodej.' },
    { question: 'Do kiedy potwierdzić obecność?', answer: 'Prosimy o odpowiedź do 30 kwietnia 2027 roku.' },
  ],
};
