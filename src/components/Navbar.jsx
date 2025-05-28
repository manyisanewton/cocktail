import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaShoppingCart } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ fetchCocktails }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, customTheme, changeCustomTheme } = useTheme();
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-brand">Cocktail one stop</div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => { fetchCocktails('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'); setMenuOpen(false); }}>Alcoholic</Link></li>
        <li><Link to="/" onClick={() => { fetchCocktails('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'); setMenuOpen(false); }}>Non-Alcoholic</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/help" onClick={() => setMenuOpen(false)}>Help</Link></li>
        <li><Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
      </ul>
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <select
        value={customTheme}
        onChange={(e) => changeCustomTheme(e.target.value)}
        className="theme-selector"
      >
        <option value="default">Default Theme</option>
        <option value="dark">Dark Theme</option>
        <option value="vibrant">Vibrant Theme</option>
      </select>
    
      <motion.button
        className="cart-icon"
        onClick={() => navigate('/cart')}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </motion.button>
    </motion.nav>
  );
}

export default Navbar;