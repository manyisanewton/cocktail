import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import CocktailGrid from '../components/CocktailGrid';
import Pagination from '../components/Pagination';
import FilterSort from '../components/FilterSort';
import { motion } from 'framer-motion';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState('grid');
  const [apiUrl, setApiUrl] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  const cocktailsPerPage = 8;

  const fetchCocktails = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log('API Response:', result);
      return Array.isArray(result.drinks) ? result.drinks : [];
    } catch (error) {
      console.error('Error fetching cocktails:', error);
      return [];
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cocktails', apiUrl],
    queryFn: fetchCocktails,
  });

  const updateUrlAndRefetch = (url) => {
    setApiUrl(url);
  };

  const debouncedSearch = debounce((term) => {
    const newUrl = term
      ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
    setApiUrl(newUrl);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    refetch();
  }, [apiUrl, refetch]);

  // Ensure cocktails arrays are safe
  const cocktails = Array.isArray(data) ? data : [];
  const featuredCocktails = cocktails.slice(0, 5);
  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  return (
    <>
      {/* <Navbar fetchCocktails={updateUrlAndRefetch} /> */}
      <main className="main-content">
        {/* Hero Section */}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Sip, Savor, Celebrate</h1>
          <p>Discover Your Perfect Cocktail for Every Moment!</p>
        </motion.section>

        {/* Featured Cocktails Carousel */}
        <section className="featured-cocktails">
          <h2>Featured Cocktails</h2>
          <div className="cocktail-carousel">
            {error ? (
              <p>Error loading cocktails: {error.message}</p>
            ) : isLoading ? (
              <p>Loading featured cocktails...</p>
            ) : featuredCocktails.length > 0 ? (
              featuredCocktails.map((cocktail, index) => (
                <motion.div
                  key={cocktail.idDrink}
                  className="carousel-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                  <h3>{cocktail.strDrink}</h3>
                  <p>Price: $19.99</p>
                </motion.div>
              ))
            ) : (
              <p>No featured cocktails available. Try a different search!</p>
            )}
          </div>
        </section>

        {/* Enjoyment Section */}
        <motion.section
          className="enjoyment-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>The Joy of Cocktails</h2>
          <p>
            Cocktails are more than just drinks – they’re an experience. Whether you’re unwinding after a long day, 
            celebrating with friends, or exploring new flavors, there’s a cocktail for every mood. Let us help you 
            find the perfect blend to elevate your moments.
          </p>
        </motion.section>

        {/* Search and Filters */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for cocktails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FilterSort onFilter={updateUrlAndRefetch} />
        <div className="layout-toggle">
          <button onClick={() => setLayout('grid')}>Grid View</button>
          <button onClick={() => setLayout('list')}>List View</button>
        </div>

        {/* Cocktail Grid */}
        {error ? (
          <div className="loading">Error loading cocktails: {error.message}</div>
        ) : isLoading ? (
          <div className="cocktail-grid">
            {Array(8).fill().map((_, index) => (
              <div key={index} className="skeleton-card"></div>
            ))}
          </div>
        ) : currentCocktails.length === 0 ? (
          <div className="loading">No cocktails found. Try a different search!</div>
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
    </>
  );
}

export default Home;