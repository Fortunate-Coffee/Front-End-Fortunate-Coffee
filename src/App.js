import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MenuPage from './pages/MenuPage';
import DetailMenuPage from './pages/DetailMenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SplashPage from './pages/SplashPage';

import AdminHomePage from './pages/AdminHomePage';
import AdminMenuPage from './pages/AdminMenuPage';
import LoginPage from './pages/LoginPage';
import AdminStockPage from './pages/AdminStockPage';
import AdminOrderHistoryPage from './pages/AdminOrderHistoryPage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoading ? <SplashPage /> : <HomePage />} />
        <Route path='/category/:categorySlug' element = {<MenuPage />} />
        <Route path='/detail/:categorySlug/:menuSlug' element = {<DetailMenuPage />}/>
        <Route path='/cart' element = {<CartPage />} />
        <Route path= '/payment' element = {<PaymentPage />} />
        <Route path='/*' element = {<NotFoundPage />} />

        <Route
          path='/login'
          element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} 
        />
        <Route path="/admin" element={isLoggedIn ? <AdminHomePage /> : <Navigate to="/login" />}>
          <Route index element={<AdminMenuPage />} />
          <Route path="/admin/menu" element={<AdminMenuPage />} />
          <Route path="/admin/stock" element={<AdminStockPage />} />
          <Route path="/admin/order-history" element={<AdminOrderHistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;