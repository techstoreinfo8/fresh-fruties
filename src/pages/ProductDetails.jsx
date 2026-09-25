import { useParams, useNavigate } from "react-router-dom";
import fruits from "../data/fruits";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const fruit = fruits.find(
    (item) => item.id === Number(id)
  );

  if (!fruit) {
    return <h2 className="not-found">Fruit not found</h2>;
  }

  const addToCart = () => {

    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item.id === fruit.id
    );

    if (existingItem) {
      existingItem.cartQuantity += 1;
    } else {
      existingCart.push({
        ...fruit,
        cartQuantity: 1
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    navigate("/cart");
  };

  return (
    <section className="product-details">

      <div className="product-large-image">
        {fruit.emoji}
      </div>

      <div className="product-content">

        <span className="category">
          {fruit.category}
        </span>

        <h1>{fruit.name}</h1>

        <p className="product-description">
          {fruit.description}
        </p>

        <h2>
          ₹{fruit.price}/{fruit.unit}
        </h2>

        <p>
          Available Stock:{" "}
          <strong>{fruit.quantity} {fruit.unit}</strong>
        </p>

        <button
          className="add-cart-button"
          onClick={addToCart}
        >
          🛒 Add to Cart
        </button>

      </div>

    </section>
  );
}

export default ProductDetails;