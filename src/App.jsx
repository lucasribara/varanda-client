import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import MenuPage from './scenes/menuPage/menuPage';
import LoginPage from './scenes/loginPage/loginPage';
import AccountPage from './scenes/accountPage/accountPage';
import CustomerOrdersPage from "./scenes/customerOrdersPage/customerOrdersPage";
import OrdersPage from "./scenes/ordersPage/ordersPage";
import { useSelector } from 'react-redux';
import './App.css'

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const currentUser = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role ==="admin";
  
  return (
    <div>
      <BrowserRouter>     
        <Routes>
          <Route path="/" element={<MenuPage />} />  
          <Route path="/login" element={!isAuth ? <LoginPage /> : <Navigate to="/"/>} />
          <Route path="/usuario" element={isAuth ? <AccountPage /> : <Navigate to="/login"/>} />
          <Route path="/usuario/pedidos" element={isAuth ? <CustomerOrdersPage /> : <Navigate to="/login"/>} />
          <Route path="/admin/pedidos" element={isAuth && isAdmin ? <OrdersPage /> : <Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
