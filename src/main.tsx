import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// Қазақ әріптерін (Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І) толық қолдайтын қаріптер — интернетсіз де жұмыс істейді
import '@fontsource/lora/500.css';
import '@fontsource/lora/600.css';
import '@fontsource/lora/600-italic.css';
import '@fontsource/onest/400.css';
import '@fontsource/onest/500.css';
import '@fontsource/onest/600.css';
import '@fontsource/onest/700.css';

// Leaflet картасының міндетті стильдері
import 'leaflet/dist/leaflet.css';
import './index.css';

import App from './App';
import { ROUTER_BASENAME } from './lib/asset';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
