import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      className="main-content about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Cocktail Haven</strong>, your ultimate destination for exploring and mastering the art of cocktail making! Founded with a passion for
        mixology, we bring you an unparalleled collection of cocktail recipes, premium ingredients, and a vibrant community of enthusiasts. Whether
        you're a beginner or a seasoned bartender, our app is designed to elevate your cocktail experience with easy-to-follow guides, stunning
        visuals, and personalized recommendations.
      </p>
      <p>
        At Cocktail Haven, we pride ourselves on offering:
        <ul>
          <li><strong>Extensive Recipe Library</strong>: Thousands of cocktails to suit every taste and occasion.</li>
          <li><strong>Premium Ingredients</strong>: Access to top-quality mixers and spirits delivered to your door.</li>
          <li><strong>Community Engagement</strong>: Share your creations and learn from fellow cocktail lovers.</li>
          <li><strong>Expert Tips</strong>: Master techniques from world-class mixologists.</li>
        </ul>
      </p>
      <p>
        Located in the heart of the cocktail scene, our team is dedicated to curating the best selections and ensuring a delightful experience. Join us
        today and transform every moment into a celebration with the perfect drink! Download the app now or explore our online store for exclusive
        offers and a world of flavors.
      </p>
      <div className="map-container">
        <iframe
          title="Cocktail Haven Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.466614787672!2d-73.98935478451318!3d40.74252977932679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a4e93c28e1%3A0x2a0e3c35e1b2e9c0!2sNew%20York%2C%20NY%2010012%2C%20USA!5e0!3m2!1sen!2sus!4v1623456789!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </motion.div>
  );
}

export default About;