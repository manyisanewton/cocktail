import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

function CocktailGrid({ cocktails, layout }) {
  const { addToCart } = useCart();

  const handleAddToCart = (cocktail) => {
    addToCart(cocktail);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${cocktail.strDrink} has been added to your cart.`,
      showConfirmButton: true,
      confirmButtonText: 'View Cart',
      confirmButtonColor: '#f1c40f', // Vibrant yellow to match theme
      showCancelButton: true,
      cancelButtonText: 'Continue Shopping',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/cart';
      }
    });
  };

  return (
    <div className={`cocktail-grid ${layout}`}>
      {cocktails.map((cocktail) => (
        <motion.div
          key={cocktail.idDrink}
          className="cocktail-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to={`/cocktail/${cocktail.idDrink}`}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>{cocktail.strDrink}</h3>
            <p>Price: ${cocktail.price || 10}</p>
          </Link>
          <button
            className="add-to-cart-button"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link navigation on button click
              handleAddToCart(cocktail);
            }}
          >
            Add to Cart
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default CocktailGrid;