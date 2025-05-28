import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import CocktailDetailPage from './pages/CocktailDetailPage';
import Cart from './pages/Cart';
import "../src/styles.css"
import Help from './pages/Help';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
function App() {
  return (
    <ThemeProvider>
      <CartProvider>
      <Navbar />
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CartProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;