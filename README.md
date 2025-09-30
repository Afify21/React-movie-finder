 🎬 Movie Search App
<img width="1452" height="818" alt="image" src="https://github.com/user-attachments/assets/12975d1b-0b60-4499-a29a-523647b0e151" />
<img width="1348" height="802" alt="image" src="https://github.com/user-attachments/assets/9537df92-04ad-4e4b-aed8-2b0f59facb47" />

A modern React application for discovering movies using the OMDB API. Built with React, Tailwind CSS, and Vite.


 ✨ Features

- 🔍 **Real-time movie search** with debounced input
- 🔥 **Trending movies section** 
- 📱 **Responsive design** - works on all devices
- ⚡ **Fast loading** with Vite build tool
- 🎨 **Beautiful UI** with Tailwind CSS
- 🔄 **Loading states** and error handling
- 🎭 **Movie details** including posters, year, and type

 🚀 Live Demo



 🛠️ Built With

- React - JavaScript library for building user interfaces
- Tailwind CSS - Utility-first CSS framework
- Vite - Fast build tool and development server
- OMDB API - Movie database API

🏃‍♂️ Running Locally

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/movie-search-app.git
cd movie-search-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## 📁 Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx      # Individual movie display
│   ├── Search.jsx         # Search input component
│   └── Spinner.jsx        # Loading animation
├── App.jsx                # Main application component
├── main.jsx              # React entry point
└── index.css             # Global styles
```

 🎯 Key Features Implemented

 Search Functionality
- Debounced search to prevent excessive API calls
- Real-time results as you type
- Error handling for failed requests

 Movie Display
- Grid layout responsive to screen size
- Movie posters with fallback images
- Movie details (title, year, type)
- Loading states during API calls

 User Experience
- Clean, modern interface
- Smooth animations and transitions
- Mobile-friendly responsive design
- Accessibility features

 🔧 API Integration

This app uses the [OMDB API](http://www.omdbapi.com/) to fetch movie data. The API provides:
- Movie search by title
- Detailed movie information
- High-quality movie posters
- IMDB ratings and details

 🚀 Deployment

The app can be easily deployed to:
- **Vercel** - `npm run build` then drag/drop dist folder
- **Netlify** - Connect GitHub repo for automatic deployments
- **GitHub Pages** - Use gh-pages for static hosting
