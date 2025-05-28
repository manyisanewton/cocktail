import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

function CocktailCard({ cocktail, index }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      idDrink: cocktail.idDrink,
      strDrink: cocktail.strDrink,
      strDrinkThumb: cocktail.strDrinkThumb,
      price: 10,
      quantity: 1,
    });
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${cocktail.strDrink} has been added to your cart.`,
      showConfirmButton: true,
      confirmButtonText: 'View Cart',
      confirmButtonColor: '#f1c40f',
      showCancelButton: true,
      cancelButtonText: 'Continue Shopping',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart');
      }
    });
  };

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
      <p>Price: $10</p>
      <motion.button
        className="add-to-cart"
        onClick={handleAddToCart}
        style={{
          backgroundColor: '#f5f5dc',
          color: '#000000',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
}

export default CocktailCard;