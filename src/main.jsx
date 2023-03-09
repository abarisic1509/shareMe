import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'
import './index.css'

const getGoogleClientId = () => {
  const SHAREME_GOOGLE_TOKEN = import.meta.env.VITE_SHAREME_GOOGLE_TOKEN

  if (!SHAREME_GOOGLE_TOKEN) {
    throw new Error("SHAREME_GOOGLE_TOKEN needs to be defined");
  }

  return SHAREME_GOOGLE_TOKEN;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={getGoogleClientId()}>
    <Router >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </GoogleOAuthProvider>
)
