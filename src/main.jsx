import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import EMatrix from './components/EMatrix.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/todo-react-app/" element={<App />}/>
      <Route path="/todo-react-app/eishenshowersmatrix" element={<EMatrix/>}/> 
    </Routes>
  </BrowserRouter>,
)
