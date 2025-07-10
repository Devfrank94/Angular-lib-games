# 🎮 Angular Games Library

Una moderna applicazione web Angular per esplorare e scoprire videogiochi utilizzando l'API RAWG. L'applicazione offre un'interfaccia elegante e responsive per navigare tra giochi, piattaforme, sviluppatori e creatori.

<!-- TODO: inserisci link produzione -->
<!-- Il progetto è reperibile a questo link: -->

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Tecnologie Utilizzate](#-tecnologie-utilizzate)
- [Installazione](#-installazione)
- [Funzionalità Principali](#-funzionalità-principali)
- [Componenti](#-componenti)
- [Styling](#-styling)

## ✨ Caratteristiche

- **🎯 Interfaccia Moderna**: Design responsive con TailwindCSS e DaisyUI
- **🔍 Ricerca Avanzata**: Funzionalità di ricerca per trovare giochi specifici
- **📱 Mobile-First**: Ottimizzata per dispositivi mobili e desktop
- **⚡ Performance**: Lazy loading e paginazione per prestazioni ottimali
- **🎨 Temi**: Supporto per modalità chiara/scura
- **📊 Filtraggio**: Filtri per giochi popolari e nuove uscite
- **🔄 Stato Reattivo**: Gestione dello stato con Angular Signals
- **🛡️ Error Handling**: Gestione robusta degli errori con componenti dedicati

## 🛠 Tecnologie Utilizzate

### Frontend
- **Angular 19** - Framework principale
- **TypeScript** - Linguaggio di programmazione
- **TailwindCSS 4.1** - Framework CSS utility-first
- **DaisyUI 5.0** - Componenti UI per TailwindCSS
- **Angular Signals** - Gestione dello stato reattivo
- **RxJS** - Programmazione reattiva

### Build & Development
- **Angular CLI** - Strumenti di sviluppo
- **PostCSS** - Processore CSS
- **Autoprefixer** - Prefissi CSS automatici

### API
- **RAWG API** - Database di videogiochi


## 🚀 Installazione

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn
- Angular CLI

## 🎮 Funzionalità Principali

### 1. **Homepage con Catalogo Giochi**
- Visualizzazione griglia responsive di giochi
- Filtro per giochi popolari (rating ≥ 4.0)
- Paginazione infinita con "Carica altri"
- Layout masonry per ottimizzazione spazio

### 2. **Ricerca Giochi**
- Barra di ricerca integrata
- Ricerca in tempo reale
- Risultati filtrati per rilevanza

### 3. **Sezioni Specializzate**
- **Nuove Uscite**: Giochi rilasciati nell'ultimo mese
- **Top Giochi**: Giochi con rating Metacritic 80-100
- **Piattaforme**: Esplorazione per piattaforma di gioco
- **Sviluppatori**: Catalogo sviluppatori
- **Creatori**: Database creatori di giochi

### 4. **Card Gioco Dettagliate**
- Immagine di copertina
- Informazioni complete (rating, data rilascio, piattaforme)
- Badge per giochi nuovi e punteggi Metacritic
- Generi e tempo di gioco
- Descrizioni dinamiche basate su rating

### 5. **Navigazione Responsive**
- Menu desktop espandibile/collassabile
- Dock navigation per mobile
- Routing con lazy loading
- tooltip informativi

### 6. **Gestione Stati**
- Loading states con skeleton screens
- Error handling con componenti dedicati
- Gestione stato reattivo con Angular Signals

## 🧩 Componenti

### Componenti UI Core

#### `CardComponent`
Visualizza le informazioni di un gioco in formato card:
- Immagine, titolo, rating, generi
- Badge per giochi nuovi e punteggi Metacritic
- Informazioni piattaforme e tempo di gioco
- Descrizioni dinamiche basate su qualità

#### `NavbarComponent`
Sistema di navigazione adattivo:
- Menu desktop con toggle espandi/comprimi
- Dock navigation per dispositivi mobili
- Icone SVG e tooltip informativi
- Integrazione con routing Angular

#### `SearchbarComponent`
Funzionalità di ricerca:
- Input reattivo per ricerca giochi
- Integrazione con API service
- Gestione stato di ricerca

### Componenti di Stato

#### `SkeletonComponent`
Placeholder animati durante il caricamento:
- Animazioni CSS per effetto shimmer
- Layout responsive per diverse dimensioni

#### `LoadingComponent`
Indicatori di caricamento:
- Spinner animato
- Messaggi di stato

#### `ErrorGenericComponent`
Gestione errori:
- Messaggi di errore user-friendly
- Opzioni di retry
- Design consistente con l'app

## 🎨 Styling

### TailwindCSS + DaisyUI
Il progetto utilizza un approccio utility-first con TailwindCSS e componenti DaisyUI:

**Temi Supportati:**
- Modalità chiara/scura
- Temi personalizzabili DaisyUI
- Variabili CSS per consistenza

**Componenti Personalizzati:**
- Dock navigation per mobile
- Card animate effects
- Skeleton loading animations

**Sviluppato con il ❤️ da DevFrank94**
