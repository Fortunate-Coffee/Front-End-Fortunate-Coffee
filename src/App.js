import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MenuPage from './pages/MenuPage';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path='/category/:categorySlug' element = {<MenuPage />} />
        <Route path='/*' element = {<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;