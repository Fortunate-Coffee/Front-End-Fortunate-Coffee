import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleBasedRoute from './component/molecules/RoleBasedRoute';

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
import NotAuthorizedPage from './pages/NotAuthorizedPage';

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
        <Route path='/login' element={<LoginPage onLogin={() => window.location.reload()} />} />
        <Route path='/not-authorized' element={<NotAuthorizedPage />} />

        <Route path="/admin" element={<RoleBasedRoute allowedRoles={['owner', 'admin', 'cashier']}><AdminHomePage /></RoleBasedRoute>} >
          <Route path="menu" element={<RoleBasedRoute allowedRoles={['owner', 'admin']}><AdminMenuPage /></RoleBasedRoute>} />
          <Route path="stock" element={<RoleBasedRoute allowedRoles={['owner', 'admin']}><AdminStockPage /></RoleBasedRoute>} />
          <Route path="order-history" element={<RoleBasedRoute allowedRoles={['owner', 'cashier']}><AdminOrderHistoryPage /></RoleBasedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;