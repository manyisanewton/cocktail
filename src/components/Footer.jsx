import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Cocktail Haven</h3>
          <p>
            Your go-to source for cocktail recipes, ingredients, and inspiration. Explore a world of flavors with us!
          </p>
        </div>
        <div className="footer-column">
          <h3>Cocktail Categories</h3>
          <ul>
            <li><Link to="/">Alcoholic Drinks</Link></li>
            <li><Link to="/">Non-Alcoholic Drinks</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Useful Links</h3>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Shipping Info</Link></li>
            <li><Link to="/">Contact Support</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> New York, NY 10012, USA</p>
          <p><FaEnvelope /> cocktails@haven.com</p>
          <p><FaPhone /> +1 555-123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        <div className="copyright">
          <p>© 2025 Cocktail Haven. All rights reserved.</p>
        </div>
      </div>
      <div className="back-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    </footer>
  );
}

export default Footer;