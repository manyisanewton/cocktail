import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

function CocktailGrid({ cocktails, layout }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (cocktail) => {
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
    <div className={`home-cocktail-grid ${layout === 'list' ? 'home-cocktail-grid-list' : ''}`}>
      {cocktails.map((cocktail, index) => (
        <motion.div
          key={cocktail.idDrink}
          className="home-cocktail-card"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 }}
        >
          <Link to={`/cocktail/${cocktail.idDrink}`}>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h3>{cocktail.strDrink}</h3>
            <p>Price: $10</p>
          </Link>
          <button
            className="home-add-to-cart"
            onClick={(e) => {
              e.preventDefault();
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