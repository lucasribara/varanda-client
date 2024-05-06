import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import MenuPage from './scenes/menuPage/menuPage';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>     
        <Routes>
          <Route path="/" element={<MenuPage />} />          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
