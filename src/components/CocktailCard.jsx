import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CocktailCard({ cocktail, index }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <motion.div
      className="cocktail-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
      onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
      style={{ cursor: 'pointer' }}
    >
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>{cocktail.strDrink}</h3>
      <p>Price: $19.99</p>
      <motion.button
        className="add-to-cart"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(cocktail);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
}

export default CocktailCard;