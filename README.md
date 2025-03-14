🗺️ NomadAI - AI-Powered Trip Planner

An AI-driven trip planner that creates personalized travel itineraries using Gemini 1.5-Flash, integrated with Google Sign-In and powered by Firebase for secure data storage.  
Built with React.js, Tailwind CSS, Firebase, and REST APIs.

---

🚀 Features

- AI-powered personalized travel itineraries (Gemini 1.5-Flash)
- Google Sign-In for user authentication
- Generates and stores 100+ travel plans with seamless data management
- Clean and intuitive UI for efficient trip planning

---

🛠️ Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend/Services: Firebase, Gemini 1.5-Flash, REST APIs
- Additional APIs: Google Places, Geoapify, Pixabay

---

🖥️ Getting Started

1. Clone the repository
```bash
git clone https://github.com/Arun20Sb/NomadAI.git
cd nomadai
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables  
Create a `.env` file in the root directory and add:
```env
VITE_GOOGLE_PLACE_API_KEY=your_google_place_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id

VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key

VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
VITE_PIXABAY_API_KEY=your_pixabay_api_key
```

4. Run the development server
```bash
npm run dev
```

The app should now be running at:  
http://localhost:5173

---
