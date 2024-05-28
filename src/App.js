import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import PrivateRoute from './component/atoms/PrivateRoute';
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoading ? <SplashPage /> : <HomePage />} />
        <Route path='/category/:categoryName' element = {<MenuPage />} />
        <Route path='/detail/:categoryName/:menuName' element = {<DetailMenuPage />}/>
        <Route path='/cart' element = {<CartPage />} />
        <Route path= '/payment' element = {<PaymentPage />} />
        <Route path='/*' element = {<NotFoundPage />} />

        <Route
          path='/login'
          element={<LoginPage onLogin={() => window.location.reload()} />} 
        />
        <Route path="/admin" element={<PrivateRoute><AdminHomePage /></PrivateRoute>}>
          <Route index element={<PrivateRoute><AdminMenuPage /></PrivateRoute>} />
          <Route path="/admin/menu" element={<PrivateRoute><AdminMenuPage /></PrivateRoute>} />
          <Route path="/admin/stock" element={<PrivateRoute><AdminStockPage /></PrivateRoute>} />
          <Route path="/admin/order-history" element={<PrivateRoute><AdminOrderHistoryPage /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;