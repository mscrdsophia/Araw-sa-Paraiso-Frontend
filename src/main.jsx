import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { RoomProvider } from './context/RoomContext.jsx'
import { AuthProvider } from './context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <RoomProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </RoomProvider>
  </BrowserRouter>
  </StrictMode>,
);
