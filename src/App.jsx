import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import MenuPage from './scenes/menuPage/menuPage';
import LoginPage from './scenes/loginPage/loginPage';
import AccountPage from './scenes/accountPage/accountPage';
import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  
  return (
    <div>
      <BrowserRouter>     
        <Routes>
          <Route path="/" element={<MenuPage />} />  
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usuario" element={isAuth ? <AccountPage /> : <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
