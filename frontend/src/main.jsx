//strict mode is used to check for potential problems in the code
import { StrictMode } from 'react'
//react dom is used to render the react components to the dom
import { createRoot } from 'react-dom/client'
//index.css is used to style the application
import './index.css'
//app is the main component of the application
import App from './App.jsx'
//browser router is used to route the pages,that means it will allow us to navigate between the pages without reloading the page
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  //strict mode is used to check for potential problems in the code
  <StrictMode>
    {/* browser router is used to route the pages,that means it will allow us to navigate between the pages without reloading the page */}
    <BrowserRouter>
      {/* app is the main component of the application */}
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
