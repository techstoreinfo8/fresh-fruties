import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  }, []);

  const updateQuantity = (id, change) => {

    const updatedCart = cart
      .map((item) => {

        if (item.id === id) {

          return {
            ...item,
            cartQuantity: Math.max(
              1,
              item.cartQuantity + change
            )
          };

        }

        return item;

      });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((item) => item.id !== id);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.cartQuantity,
    0
  );

  return (
    <section className="section cart-page">

      <div className="page-title">
        <span>YOUR SHOPPING CART</span>
        <h1>Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">
          <div>🛒</div>
          <h2>Your cart is empty</h2>
          <Link to="/fruits">
            Start Shopping
          </Link>
        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-emoji">
                  {item.emoji}
                </div>

                <div className="cart-details">

                  <h3>{item.name}</h3>

                  <p>
                    ₹{item.price}/{item.unit}
                  </p>

                </div>

                <div className="quantity">

                  <button
                    onClick={() =>
                      updateQuantity(item.id, -1)
                    }
                  >
                    −
                  </button>

                  <strong>
                    {item.cartQuantity}
                  </strong>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, 1)
                    }
                  >
                    +
                  </button>

                </div>

                <strong>
                  ₹{item.price * item.cartQuantity}
                </strong>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div>
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <hr />

            <div className="total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout →
            </Link>

          </div>

        </>

      )}

    </section>
  );
}

export default Cart;