# Calculator cmmdc – Algoritmul lui Euclid

Aplicație web construită cu React și Vite, care calculează cel mai mare divizor comun (cmmdc) pentru două numere întregi. Rezultatul și pașii algoritmului se actualizează automat pe măsură ce valorile din câmpuri se schimbă.

## Funcționalități

- Introducerea a două numere întregi, inclusiv valori negative.
- Calcularea cmmdc-ului folosind algoritmul lui Euclid.
- Afișarea împărțirilor succesive în forma `a = q · b + r`.
- Validarea câmpurilor și afișarea mesajelor de eroare.
- Actualizarea titlului filei browserului cu rezultatul curent.

## Tehnologii

- React 19
- Vite 8
- JavaScript (ES modules)
- Hook-urile React `useState` și `useEffect`

## Cum funcționează `useState` și `useEffect`

Componenta principală a aplicației este `src/Euclid.jsx`. Ea păstrează în stare valorile câmpurilor ca șiruri de caractere, pentru ca inputurile controlate să poată reflecta inclusiv editarea în curs:

- `a` și `b` – valorile introduse de utilizator; se schimbă prin `setA` și `setB`.
- `result` – cmmdc-ul calculat sau `null` dacă valorile nu sunt valide.
- `steps` – lista împărțirilor efectuate de algoritm.
- `error` – mesajul de validare sau șirul gol dacă nu există eroare.

Primul `useEffect` depinde de `[a, b]`. Când se schimbă oricare dintre valori, convertește intrările în numere și verifică dacă ambele câmpuri sunt completate, dacă valorile sunt numere întregi sigure și dacă nu sunt ambele zero. La o intrare validă, calculează cmmdc-ul pentru valorile absolute și salvează rezultatul și pașii în stare. În caz de eroare, golește rezultatul și pașii.

Funcția `euclid` repetă relația `a = q · b + r`, apoi înlocuiește perechea `(a, b)` cu `(b, r)` până când restul devine zero. Ultima valoare nenulă este cmmdc-ul. Dacă `b` este zero de la început, lista de pași este goală, iar interfața explică faptul că cmmdc-ul este `a`.

Al doilea `useEffect` depinde de `[result]` și actualizează `document.title`: titlul devine `cmmdc = …` după un calcul valid și revine la `Euclid` când rezultatul este invalid sau incomplet.

## Validări

- Câmpurile goale afișează „Introdu ambele numere.”
- Valorile care nu sunt întregi sigure afișează „Folosește doar numere întregi.”
- Perechea `(0, 0)` afișează „cmmdc(0, 0) nu este definit.”
- Numerele negative sunt acceptate; algoritmul este aplicat valorilor lor absolute.

## Rulare locală

Ai nevoie de Node.js și npm instalate.

```bash
npm install
npm run dev
```

Vite va afișa în terminal adresa locală la care rulează aplicația.

## Comenzi disponibile

| Comandă | Descriere |
| --- | --- |
| `npm run dev` | Pornește serverul de dezvoltare Vite. |
| `npm run build` | Construiește versiunea pentru producție în `dist/`. |
| `npm run preview` | Servește local versiunea construită. |
| `npm run lint` | Rulează ESLint asupra proiectului. |
| `npm run deploy` | Construiește aplicația și publică directorul `dist/` cu `gh-pages`. |

## Structura relevantă

```text
src/
├── App.jsx       # Integrează componenta Euclid
├── Euclid.jsx    # Interfața, starea, validarea și algoritmul
├── index.css     # Stiluri globale
└── main.jsx      # Punctul de intrare React
```
