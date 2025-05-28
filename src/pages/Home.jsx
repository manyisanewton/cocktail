import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import CocktailGrid from '../components/CocktailGrid';
import Pagination from '../components/Pagination';
import FilterSort from '../components/FilterSort';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState('grid');
  const [allCocktails, setAllCocktails] = useState([]);
  const [currentCocktailIndex, setCurrentCocktailIndex] = useState(0);
  const cocktailsPerPage = 8;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchCocktailsByLetter = async (letter) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(`Fetched for letter ${letter}:`, result.drinks);
      return Array.isArray(result.drinks) ? result.drinks : [];
    } catch (error) {
      console.error(`Error fetching cocktails for letter ${letter}:`, error);
      return [];
    }
  };

  const fetchCocktailsBySearch = async (term) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(`Fetched by search term "${term}":`, result.drinks);
      return Array.isArray(result.drinks) ? result.drinks : [];
    } catch (error) {
      console.error('Error fetching cocktails by search:', error);
      return [];
    }
  };

  const fetchAllCocktails = async () => {
    if (searchTerm) {
      const cocktails = await fetchCocktailsBySearch(searchTerm);
      return cocktails;
    } else {
      const initialLetters = 'abcde'.split('');
      const promises = initialLetters.map((letter) => fetchCocktailsByLetter(letter));
      const results = await Promise.all(promises);
      const cocktails = results.flat();
      const uniqueCocktails = Array.from(
        new Map(cocktails.map((cocktail) => [cocktail.idDrink, cocktail])).values()
      );
      console.log('Fetched all cocktails:', uniqueCocktails);
      return uniqueCocktails;
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cocktails', searchTerm],
    queryFn: fetchAllCocktails,
    staleTime: 5 * 60 * 1000,
  });

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useEffect(() => {
    if (data) {
      setAllCocktails(data);
      console.log('Updated allCocktails:', data);
    }
  }, [data]);

  // Define cocktails and featuredCocktails before useEffect
  const cocktails = Array.isArray(allCocktails) ? allCocktails : [];
  const featuredCocktails = cocktails.slice(0, 5);

  // Carousel effect for cocktail images in the Joy section
  useEffect(() => {
    if (featuredCocktails.length === 0) return; // Prevent running if no cocktails

    const interval = setInterval(() => {
      setCurrentCocktailIndex((prevIndex) => (prevIndex + 1) % featuredCocktails.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCocktails]);

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

  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  return (
    <main className="main-content">
      <motion.section
        className="home-hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Sip, Savor, Celebrate</h1>
        <p>Discover Your Perfect Cocktail for Every Moment!</p>
      </motion.section>

      <section className="home-featured-cocktails">
        <h2>Featured Cocktails</h2>
        <div className="home-cocktail-carousel">
          {error ? (
            <p>Error loading cocktails: {error.message}</p>
          ) : isLoading ? (
            <p>Loading featured cocktails...</p>
          ) : featuredCocktails.length > 0 ? (
            featuredCocktails.map((cocktail, index) => (
              <motion.div
                key={cocktail.idDrink}
                className="home-carousel-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <h3>{cocktail.strDrink}</h3>
                <p>Price: $10</p>
                <button
                  className="home-add-to-cart-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(cocktail);
                  }}
                >
                  Add to Cart
                </button>
              </motion.div>
            ))
          ) : (
            <p>No featured cocktails available. Try a different search!</p>
          )}
        </div>
      </section>

      <section className="home-joy-section">
        <div className="home-joy-background">
          {featuredCocktails.length > 0 && (
            <motion.img
              key={currentCocktailIndex}
              src={featuredCocktails[currentCocktailIndex].strDrinkThumb}
              alt={featuredCocktails[currentCocktailIndex].strDrink}
              className="home-joy-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
            />
          )}
          <div className="home-joy-overlay">
            <motion.div
              className="home-joy-content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2>Unleash the Magic of Cocktails</h2>
              <p>
                From vibrant flavors to timeless classics, every cocktail tells a story. Discover yours today and elevate every moment!
              </p>
              <motion.button
                className="home-joy-cta"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: document.querySelector('.home-search-bar').offsetTop, behavior: 'smooth' })}
              >
                Explore Cocktails
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="home-search-bar">
        <input
          type="text"
          placeholder="Search for cocktails..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <FilterSort onFilter={(url) => {
        const term = url.split('=')[1] || '';
        setSearchTerm(term);
        setCurrentPage(1);
      }} />
      <div className="home-layout-toggle">
        <button onClick={() => setLayout('grid')}>Grid View</button>
        <button onClick={() => setLayout('list')}>List View</button>
      </div>

      {error ? (
        <div className="home-loading">Error loading cocktails: {error.message}</div>
      ) : isLoading ? (
        <div className="home-cocktail-grid">
          {Array(8).fill().map((_, index) => (
            <div key={index} className="home-skeleton-card"></div>
          ))}
        </div>
      ) : currentCocktails.length === 0 ? (
        <div className="home-loading">No cocktails found. Try a different search!</div>
      ) : (
        <>
          <CocktailGrid cocktails={currentCocktails} layout={layout} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}

export default Home;