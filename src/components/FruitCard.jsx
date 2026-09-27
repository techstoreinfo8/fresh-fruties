import { Link } from "react-router-dom";

function FruitCard({ fruit, onAddToCart }) {
  const handleAddToCart = () => {
    const cartItem = {
      id: fruit.id,
      name: fruit.name,
      price: Number(fruit.price || 0),
      unit: fruit.unit,
      emoji: fruit.emoji,
      description: fruit.description,
      category: fruit.category,
      cartQuantity: 1
    };

    onAddToCart(cartItem);
  };

  return (
    <div className="fruit-card">

      <div className="fruit-image">
        {fruit.emoji}
      </div>

      <div className="fruit-info">

        <span className="category">
          {fruit.category}
        </span>

        <h3>{fruit.name}</h3>

        <p>{fruit.description}</p>

        <div className="fruit-bottom">

          <strong>
            ₹{fruit.price}/{fruit.unit}
          </strong>

          <div className="fruit-actions">

            <Link
              to={`/fruit/${fruit.id}`}
              className="view-button"
            >
              View
            </Link>

            <button
              type="button"
              className="add-cart-button"
              onClick={handleAddToCart}
            >
              🛒 Add
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FruitCard;