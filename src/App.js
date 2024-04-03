import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MenuPage from './pages/MenuPage';
import DetailMenuPage from './pages/DetailMenuPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage />} />
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