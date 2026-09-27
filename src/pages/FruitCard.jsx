import { Link } from "react-router-dom";

function FruitCard({ fruit, onAddToCart }) {
  const price = Number(fruit.price || 0);

  // Build the image URL
  const imageUrl = fruit.imageUrl
    ? fruit.imageUrl.startsWith("http")
      ? fruit.imageUrl
      : `http://localhost:8080${fruit.imageUrl}`
    : null;

  return (
    <div className="fruit-card">

      <div className="fruit-image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={fruit.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="fruit-placeholder">🍎</span>
        )}
      </div>

      <div className="fruit-info">

        <span className="category">
          Fresh Fruit
        </span>

        <h3>{fruit.name}</h3>

        <p>
          Available: {fruit.stockQuantity ?? 0}{" "}
          {fruit.unit || ""}
        </p>

        <div className="fruit-bottom">

          <strong>
            ₹{price.toFixed(2)}
            {fruit.unit
              ? ` / ${fruit.unit}`
              : ""}
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
              onClick={() => onAddToCart(fruit)}
              disabled={
                !fruit.active ||
                Number(fruit.stockQuantity || 0) <= 0
              }
            >
              {Number(fruit.stockQuantity || 0) <= 0
                ? "Out of Stock"
                : "🛒 Add"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FruitCard;