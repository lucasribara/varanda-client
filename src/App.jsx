import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import MenuPage from './scenes/menuPage/menuPage';
import LoginPage from './scenes/loginPage/loginPage';
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>     
        <Routes>
          <Route path="/" element={<MenuPage />} />  
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
