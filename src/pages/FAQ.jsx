import { motion } from 'framer-motion';

function FAQ() {
  return (
    <motion.div
      className="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Frequently Asked Questions</h1>
      <div className="faq-section">
        <h2>General Questions</h2>
        <p><strong>Q: How do I start using Cocktail Haven?</strong><br />A: Download the app, sign up, and start exploring our recipe library!</p>
        <p><strong>Q: Are the recipes suitable for beginners?</strong><br />A: Yes, we offer step-by-step guides for all skill levels.</p>
      </div>
      <div className="faq-section">
        <h2>Orders & Shipping</h2>
        <p><strong>Q: How long does shipping take?</strong><br />A: Shipping typically takes 3-5 business days, depending on your location.</p>
        <p><strong>Q: Can I track my order?</strong><br />A: Yes, track your order in the "My Cart" section after purchase.</p>
      </div>
      <div className="faq-section">
        <h2>Technical Support</h2>
        <p><strong>Q: What do I do if the app crashes?</strong><br />A: Restart the app or contact support at cocktails@haven.com.</p>
      </div>
    </motion.div>
  );
}

export default FAQ;