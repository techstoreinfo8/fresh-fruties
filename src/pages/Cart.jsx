import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    total
  } = useCart();

  return (
    <section className="section cart-page">

      <div className="page-title">
        <span>
          YOUR SHOPPING CART
        </span>

        <h1>Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div>🛒</div>

          <h2>
            Your cart is empty
          </h2>

          <Link to="/fruits">
            Start Shopping
          </Link>

        </div>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((item) => {

              const quantity =
                Number(
                  item.cartQuantity || 1
                );

              const itemTotal =
                Number(item.price || 0) *
                quantity;

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-emoji">
                    🍎
                  </div>

                  <div className="cart-details">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price}/
                      {item.unit}
                    </p>

                  </div>

                  <div className="quantity">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <strong>
                      {quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <strong>
                    ₹{itemTotal.toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        item.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>
              );
            })}

          </div>

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div>
              <span>
                Subtotal
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>
            </div>

            <div>
              <span>
                Delivery
              </span>

              <strong>
                Free
              </strong>
            </div>

            <hr />

            <div className="total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>

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