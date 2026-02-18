# CopyPrompts.ai

Premium prompt marketplace with Firebase auth/data and Stripe subscriptions.

## Folder tree

```txt
.
├── apps
│   └── web
│       ├── src
│       │   ├── components
│       │   ├── contexts
│       │   ├── data
│       │   ├── hooks
│       │   ├── lib
│       │   ├── pages
│       │   ├── styles
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── public/sitemap.xml
│       ├── index.html
│       └── package.json
├── functions
│   ├── src/index.ts
│   └── package.json
├── scripts
│   ├── seed-prompts.ts
│   └── generate-sitemap.mjs
├── firebase.json
├── firestore.rules
├── storage.rules
└── README.md
```

## Architecture notes

- **Frontend**: Vite + React + TypeScript + Tailwind + Framer Motion + Three.js hero.
- **Auth/Data**: Firebase Auth, Firestore users/prompts/likes/views.
- **Payments**: Stripe Checkout session via Firebase Function + webhook sync for subscription status.
- **Security**: Firestore + Storage rules enforce admin writes and per-user access controls.
- **SEO**: Dynamic routes for model/category and generated `sitemap.xml`.

## Environment variables

### Frontend (`apps/web/.env`)

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

### Functions (`functions/.env`)

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PRICE_ID_MONTHLY_1199=
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env files for web + functions.
3. Run app:
   ```bash
   npm run dev
   ```
4. Run Firebase emulators:
   ```bash
   npm run emulators
   ```
5. Seed prompts:
   ```bash
   npm run seed
   ```

## Stripe configuration

1. Create recurring product in Stripe (`$11.99 / month`) and copy price ID.
2. Set `PRICE_ID_MONTHLY_1199` in functions env.
3. Deploy functions and set webhook endpoint:
   - `https://<region>-<project>.cloudfunctions.net/stripeWebhook`
4. Listen to events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## Deploy

- **Frontend**: deploy `apps/web` to Vercel.
- **Functions/Auth/DB/Storage rules**: deploy through Firebase CLI:
  ```bash
  firebase deploy --only functions,firestore,storage
  ```

## Dev checkout stub behavior

In `/explore`, Unlock opens modal and shows dev message. Replace with function call to `createCheckoutSession` + Stripe redirect when ready.
