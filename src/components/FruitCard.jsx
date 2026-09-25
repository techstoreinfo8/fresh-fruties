import { Link } from "react-router-dom";

function FruitCard({ fruit }) {
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

          <Link
            to={`/fruit/${fruit.id}`}
            className="view-button"
          >
            View
          </Link>

        </div>

      </div>
    </div>
  );
}

export default FruitCard;