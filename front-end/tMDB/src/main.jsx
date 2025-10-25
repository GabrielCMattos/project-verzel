import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
