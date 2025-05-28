import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function CocktailDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cocktail, setCocktail] = useState(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem(`reviews-${id}`)) || []);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setCocktail(data.drinks[0] || null);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      }
    };
    fetchCocktail();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      const newReviews = [...reviews, review];
      setReviews(newReviews);
      localStorage.setItem(`reviews-${id}`, JSON.stringify(newReviews));
      setReview('');
    }
  };

  if (!cocktail) return <div className="loading">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="detail-page"
    >
      <button onClick={() => navigate('/')}>Back to Shop</button>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3>Ingredients</h3>
      <ul>
        {Array.from({ length: 15 }, (_, i) => cocktail[`strIngredient${i + 1}`])
          .filter(Boolean)
          .map((ingredient, index) => (
            <li key={index}>{ingredient} - {cocktail[`strMeasure${index + 1}`] || 'To taste'}</li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p>{cocktail.strInstructions}</p>
      <button className="add-to-cart" onClick={() => addToCart(cocktail)}>
        Add to Cart ($19.99)
      </button>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((r, index) => (
          <li key={index}>{r}</li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Add a review..."
        />
        <button type="submit">Submit</button>
      </form>
    </motion.div>
  );
}

export default CocktailDetailPage;