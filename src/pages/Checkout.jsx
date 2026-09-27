import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";


const API_BASE_URL = "http://localhost:8080/api";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    total,
    clearCart
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: ""
  });

  const [payment, setPayment] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customer.name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    setLoading(true);

    try {
      // -------------------------------------------------
      // STEP 1: Create customer in MySQL
      // -------------------------------------------------

      const customerResponse = await fetch(
        `${API_BASE_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            active: true
          })
        }
      );

      if (!customerResponse.ok) {
        throw new Error("Failed to create customer.");
      }

      const savedCustomer = await customerResponse.json();

      console.log("Customer created:", savedCustomer);

      // -------------------------------------------------
      // STEP 2: Create order
      // -------------------------------------------------

      const orderNumber = `ORD-${Date.now()}`;

      const checkoutRequest = {
        customerId: savedCustomer.id,
        orderNumber: orderNumber,
        totalAmount: total,
        paymentStatus: payment,
        items: cart.map((item) => ({
          productId: Number(item.id),
          quantity: Number(item.cartQuantity)
        }))
      };

      console.log("Checkout request:", checkoutRequest);

      const orderResponse = await fetch(
        `${API_BASE_URL}/orders/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(checkoutRequest)
        }
      );

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();

        throw new Error(
          errorText || "Failed to place order."
        );
      }

      const savedOrder = await orderResponse.json();

      console.log("Order created:", savedOrder);

      // -------------------------------------------------
      // STEP 3: Clear React cart
      // -------------------------------------------------

      clearCart();

      alert(
        `Order placed successfully!\nOrder Number: ${orderNumber}`
      );

      navigate("/orders");

    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.message ||
        "Unable to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>

          <button
            type="button"
            onClick={() => navigate("/fruits")}
            className="checkout-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-left">

          <h1>Checkout</h1>

          <form onSubmit={handleSubmit}>

            <div className="checkout-section">

              <h2>Customer Details</h2>

              <div className="form-group">
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>

            </div>

            <div className="checkout-section">

              <h2>Payment Method</h2>

              <div className="payment-options">

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="PENDING"
                    checked={payment === "PENDING"}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="PAID"
                    checked={payment === "PAID"}
                    onChange={(e) =>
                      setPayment(e.target.value)
                    }
                  />

                  <span>Paid</span>
                </label>

              </div>

            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

        </div>

        <div className="checkout-right">

          <div className="order-summary">

            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >
                <div>
                  <strong>{item.name}</strong>

                  <small>
                    {item.cartQuantity} × ₹
                    {Number(item.price || 0).toFixed(2)}
                  </small>
                </div>

                <span>
                  ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.cartQuantity || 0)
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="summary-total">
              <strong>Total</strong>

              <strong>
                ₹{Number(total).toFixed(2)}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;