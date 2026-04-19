# Waye Digital — Kundhanteringsdashboard

Intern kundhanteringsdashboard för Waye Digital, byggd med Next.js 14, TypeScript och Tailwind CSS.

## Kom igång lokalt

### Förutsättningar
- Node.js 18+
- npm eller yarn

### Installation

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

## Sidor

| Route | Beskrivning |
|-------|-------------|
| `/` | Dashboard med KPI-kort, diagram och kundtabell |
| `/customers` | Fullständig kundlista med sökning och filtrering |
| `/customers/[id]` | Detaljsida per kund |
| `/api/customers` | REST API — stöder `?status=`, `?industry=`, `?search=` |

## Bygga för produktion

```bash
npm run build
npm start
```

## Deploy på Vercel

1. Pusha projektet till GitHub/GitLab
2. Koppla repot på [vercel.com](https://vercel.com)
3. Vercel detekterar Next.js automatiskt — klicka **Deploy**

Ingen databas eller miljövariabel behövs. All data läses från `data/customers.json`.

## Datastruktur

Kunddata finns i `data/customers.json`. Varje kund har:

```ts
{
  id, name, industry, status,
  monthlyFee, contractStart, contractEnd,
  contactPerson, email, phone,
  services, notes, health, consultant
}
```

`health`: `"green"` | `"yellow"` | `"red"`
`status`: `"active"` | `"inactive"` | `"paused"`