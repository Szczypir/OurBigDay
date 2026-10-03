# Nasz wielki dzień

Responsywna strona ślubna w React + Vite, przygotowana jako statyczna aplikacja — bez serwera i bazy danych.

## Uruchomienie lokalne

Wymagany jest Node.js w wersji LTS (zawiera npm). W katalogu projektu uruchom:

- `npm install` — instalacja zależności
- `npm run dev` — serwer developerski Vite
- `npm run build` — produkcyjny build do katalogu `dist`
- `npm run preview` — podgląd zbudowanej wersji

## Personalizacja

Edytuj `src/config.js`, aby zmienić imiona, nazwiska, datę i godzinę, miejsce, kontakt, plan dnia, historię, dress code oraz informacje praktyczne. Zdjęcie tła można podmienić w regule `.hero-photo` w `src/styles.css`. Obecne zdjęcie i fonty pochodzą z zewnętrznych usług Unsplash i Google Fonts; można je zastąpić własnymi lokalnymi plikami.

Formularz RSVP wysyła odpowiedź przez EmailJS na oba adresy z `src/config.js`. Odpowiedzi nie są zapisywane w tej aplikacji; konfigurację wysyłki znajdziesz poniżej.

### Bezpośrednia wysyłka RSVP przez EmailJS

Formularz wysyła odpowiedzi bez otwierania aplikacji pocztowej. Wymaga konfiguracji EmailJS:

1. Utwórz usługę e-mail i szablon. W polu odbiorcy szablonu ustaw `{{to_email}}`; treść może korzystać ze zmiennych `{{from_name}}`, `{{attendance}}`, `{{guests}}` i `{{note}}`.
2. Dodaj domenę `https://am-wedding.com.pl` do dozwolonych domen w EmailJS.
3. Skopiuj `.env.example` do `.env.local` i uzupełnij Service ID, Template ID oraz Public Key z panelu EmailJS.
4. W GitHubie dodaj te same wartości jako sekrety repozytorium: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` i `VITE_EMAILJS_PUBLIC_KEY`. Workflow używa ich przy buildzie strony.

`to_email` zawiera oba adresy z `src/config.js`. Public Key EmailJS jest przeznaczony do użycia w przeglądarce; ogranicz jego użycie do domeny strony w ustawieniach EmailJS.

## Podstrony

- `/` — landing, odliczanie i zajawka historii
- `/szczegoly` — ceremonia, przyjęcie i mapa
- `/plan` — harmonogram
- `/praktycznie` — strój, nocleg, prezenty i kontakt
- `/rsvp` — potwierdzenie obecności przez e-mail
- `/historia` — oś czasu pary

## Publikacja na GitHub Pages

Ta strona jest przygotowana pod hosting statyczny. Najprościej zrobić to przez GitHub Actions.

### 1) Włóż projekt do repozytorium GitHub

- utwórz repozytorium na GitHub,
- wrzuć zawartość tego projektu do gałęzi `main`.

### 2) Ustaw Vite pod GitHub Pages

`vite.config.js` używa `/` jako bazy, ponieważ strona działa pod własną domeną `am-wedding.com.pl`. Build generuje także osobne pliki wejściowe podstron, dzięki czemu GitHub Pages może je serwować bez serwerowego fallbacku.

### 3) Dodaj workflow deploy

Utwórz plik `.github/workflows/deploy.yml` z treścią:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build app
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4) Włącz GitHub Pages

W repozytorium przejdź do:

- Settings
- Pages
- Source: GitHub Actions

Po pushu do `main` strona zostanie zbudowana i opublikowana.

### 5) Link do strony

Po wdrożeniu adres będzie wyglądał tak:

```text
https://twoja-nazwa-uzytkownika.github.io/nazwa-repozytorium/
```

### 6) Ważne o podstronach

Podstrony mają czyste adresy, np. `/szczegoly` i `/kontakt`. Build tworzy dla nich katalogi z `index.html`, więc bezpośrednie wejście i odświeżenie działają na GitHub Pages bez `#`.

### 7) Domena własna

Jeśli chcesz potem dodać własną domenę, można to zrobić w `Settings > Pages`. Domena jest płatna, ale hosting GitHub Pages jest darmowy.
