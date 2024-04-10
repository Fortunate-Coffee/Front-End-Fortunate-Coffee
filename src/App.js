import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MenuPage from './pages/MenuPage';
import DetailMenuPage from './pages/DetailMenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SplashPage from './pages/SplashPage';

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
        <Route path='/category/:categorySlug' element = {<MenuPage />} />
        <Route path='/detail/:categorySlug/:menuSlug' element = {<DetailMenuPage />}/>
        <Route path='/cart' element = {<CartPage />} />
        <Route path= '/payment' element = {<PaymentPage />} />
        <Route path='/*' element = {<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;