# BeautyHub (Firebase Studio)

BeautyHub is a platform to help users discover and connect with salons across Africa, built using Next.js and Firebase. It offers salon search, geolocation, AI recommendations, and more.

## Core Features

- **Salon Search:** Find salons by city and service type (Braiding, Nails, etc.) with dropdown filters.
- **Salon Listings:** Browse salons in a grid layout with name, image, rating, location, starting price, and a ‘View Profile’ button.
- **Salon Profiles:** Detailed salon pages include business name, location, gallery, services, pricing, reviews, and chat (mock data for MVP).
- **Geolocation:** Use ‘near me’ filters based on user location.
- **Inquiry Form:** Contact salon owners via a built-in email form.
- **AI Treatment Suggestions:** Upload your photo to receive personalized beauty treatment recommendations.

## Style Guidelines

- **Primary Color:** Vibrant amber (#FFBF00)
- **Background Color:** Pale yellow (#FAF0E6)
- **Accent Color:** Deep orange (#FF8C00)
- **Typography:** ‘Belleza’ for headlines, ‘Alegreya’ for body text
- **Icons:** Rounded, category-specific icons
- **Layout:** Grid-based, visually organized
- **UX:** Subtle transitions on buttons and images

## Getting Started

To get started, check out the main page component at `src/app/page.tsx`.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Firebase account (for hosting and backend features)

### Installation

```bash
git clone https://github.com/le-arch/studio.git
cd studio
npm install
```

### Development

```bash
npm run dev
```

The app will be available locally at [http://localhost:3000](http://localhost:3000).

### Hosting

You can host BeautyHub using Firebase Hosting:

1. Install Firebase CLI:

    ```bash
    npm install -g firebase-tools
    ```

2. Login to Firebase:

    ```bash
    firebase login
    ```

3. Initialize Firebase in your project directory:

    ```bash
    firebase init
    ```

    - Choose **Hosting** and follow the prompts.
    - Set `build` as your public directory if using Next.js static export.

4. Deploy:

    ```bash
    npm run build
    firebase deploy
    ```

For full documentation on deployment, see [Firebase Hosting Docs](https://firebase.google.com/docs/hosting).

## Accessing the App

Once hosted, your app will be available at your Firebase project's domain (e.g., `https://your-app-id.web.app`). For local development, visit [http://localhost:3000](http://localhost:3000).

---

For more details on design and features, see [`docs/blueprint.md`](https://github.com/le-arch/studio/blob/main/docs/blueprint.md).