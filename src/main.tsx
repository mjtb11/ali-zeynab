import { createRoot } from 'react-dom/client';

// Self-hosted Persian calligraphy (Gulzar) & UI font (Vazirmatn) bundled locally
import '@fontsource/gulzar/400.css';
import '@fontsource/vazirmatn/300.css';
import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/500.css';
import '@fontsource/vazirmatn/600.css';
import '@fontsource/vazirmatn/700.css';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
