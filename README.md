# Yamaha Parts E-commerce

## Panoramica
Applicazione web e-commerce moderna per la vendita di ricambi originali per motocicli Yamaha. Costruita con frontend React (Vite) e backend Express, con funzionalità di autenticazione utente, catalogo prodotti e carrello della spesa.

## Modifiche Recenti
- **2025-10-22**: Setup iniziale del progetto con implementazione completa del frontend
  - Creato sistema di autenticazione con Replit Auth (Google, GitHub, email/password)
  - Implementate tre pagine principali: Home, Shop, Carrello
  - Aggiunto catalogo prodotti con filtri e ricerca
  - Costruita Navbar responsive con badge carrello
  - Integrato database PostgreSQL per la persistenza

## Architettura del Progetto

### Frontend (React + Vite)
- **Pagine**:
  - `Landing.tsx` - Pagina di atterraggio pubblica per utenti non autenticati con sezione hero
  - `Home.tsx` - Homepage autenticata con prodotti in evidenza e categorie
  - `Shop.tsx` - Catalogo prodotti con ricerca, filtri e ordinamento
  - `Cart.tsx` - Gestione carrello della spesa con controlli quantità e riepilogo ordine

- **Componenti**:
  - `Navbar.tsx` - Barra di navigazione con stato autenticazione, badge carrello e menu utente
  - `ProductCard.tsx` - Card prodotto riutilizzabile con immagine, prezzo, stato disponibilità e aggiungi-al-carrello

- **Hook**:
  - `useAuth.ts` - Gestione stato autenticazione tramite Replit Auth

### Backend (Express + PostgreSQL)
- **Tabelle Database**:
  - `users` - Account utenti (integrazione Replit Auth)
  - `sessions` - Memorizzazione sessioni (richiesto per Replit Auth)
  - `products` - Catalogo ricambi motocicli Yamaha
  - `cart_items` - Articoli carrello utente

- **Endpoint API** (da implementare nel Task 2):
  - `GET /api/products` - Recupera tutti i prodotti con filtri opzionali
  - `GET /api/products/:id` - Ottieni dettagli singolo prodotto
  - `GET /api/cart` - Ottieni articoli carrello utente (protetto)
  - `POST /api/cart` - Aggiungi articolo al carrello (protetto)
  - `PATCH /api/cart/:id` - Aggiorna quantità articolo carrello (protetto)
  - `DELETE /api/cart/:id` - Rimuovi articolo dal carrello (protetto)
  - `GET /api/auth/user` - Ottieni informazioni utente autenticato (protetto)

## Sistema di Design

### Colori
- **Primario**: Blu Racing Yamaha (214 100% 45% in modalità scura, 214 100% 42% in modalità chiara)
- **Sfondo**: Carbone profondo (220 15% 10%) in modalità scura, bianco pulito (0 0% 98%) in modalità chiara
- **Superfici/Card**: Superfici elevate con contrasto sottile

### Tipografia
- **Font Family**: Inter (tutti i pesi 400-800)
- **Utilizzo**: Precisione professionale e tecnica per estetica motorsport

### Elementi Chiave del Design
- Estetica ispirata alle corse con focus sulle prestazioni
- Sezioni hero con immagini moto drammatiche e overlay scuro
- Card prodotto con badge disponibilità e codici articolo
- Layout grid responsive (4→2→1 colonne su desktop→tablet→mobile)
- Interazioni hover fluide e transizioni

## Stack Tecnologico
- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express, Node.js, TypeScript
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Autenticazione**: Replit Auth (OpenID Connect)
- **Gestione Stato**: TanStack Query v5
- **Routing**: Wouter

## Flusso di Sviluppo

### Avviare l'Applicazione
```bash
npm run dev
```
Questo avvia sia il backend Express che il frontend Vite sulla stessa porta.

### Migrazioni Database
```bash
npm run db:push
```
Invia le modifiche dello schema al database (non sono necessarie migrazioni SQL manuali).

## Preferenze Utente
- Lingua: Italiano (testo UI in italiano)
- Design: Estetica moderna, professionale, ispirata alle corse
- Funzionalità: Autenticazione, navigazione prodotti, carrello della spesa
- Dati: Ricambi Yamaha realistici con codici articolo e prezzi accurati