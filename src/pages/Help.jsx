import { motion } from 'framer-motion';

function Help() {
  return (
    <motion.div
      className="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Help & Support</h1>
      <p>
        Need assistance with Cocktail Haven? We’re here to help! Whether you have questions about recipes, orders, or 
        using the app, our support team is ready to assist you.
      </p>
      <h2>Contact Us</h2>
      <ul>
        <li>Email: <a href="mailto:cocktails@haven.com">cocktails@haven.com</a></li>
        <li>Phone: +1 555-123-4567 (Available 9 AM - 6 PM EST)</li>
        <li>Live Chat: Available on the app during business hours.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <p>
        For quick answers, check our <a href="/faq">FAQ page</a>. Common topics include account setup, order tracking, 
        and cocktail preparation tips.
      </p>
    </motion.div>
  );
}

export default Help;