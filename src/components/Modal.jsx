import { motion } from 'framer-motion';

function Modal({ isOpen, onClose, cocktail }) {
  if (!isOpen || !cocktail) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{cocktail.strDrink}</h2>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <p>{cocktail.strInstructions}</p>
        <button onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  );
}

export default Modal;