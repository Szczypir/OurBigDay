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

Formularz RSVP nie wysyła ani nie przechowuje danych na serwerze. Przygotowuje wiadomość w domyślnym programie pocztowym gościa — adres e-mail zmień w `src/config.js`. Jeśli formularz ma zapisywać odpowiedzi online, będzie potrzebna zewnętrzna usługa formularzy lub własne API.

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

W pliku `vite.config.js` jest ustawione:

```js
base: './'
```

Dzięki temu budowane pliki mają poprawne ścieżki na GitHub Pages.

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

Ta strona używa routingu z hash, więc adresy są typu:

```text
https://twoja-nazwa-uzytkownika.github.io/nazwa-repozytorium/#/szczegoly
```

To działa bez serwera i jest kompatybilne z GitHub Pages.

### 7) Domena własna

Jeśli chcesz potem dodać własną domenę, można to zrobić w `Settings > Pages`. Domena jest płatna, ale hosting GitHub Pages jest darmowy.
