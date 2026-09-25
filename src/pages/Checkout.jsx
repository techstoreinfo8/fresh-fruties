import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery"
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/fruits");
      return;
    }

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const order = {
      id: `ORD-${Date.now()}`,
      customer,
      items: cart,
      total,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    existingOrders.push(order);

    localStorage.setItem(
      "orders",
      JSON.stringify(existingOrders)
    );

    localStorage.removeItem("cart");

    alert(
      `Order placed successfully!\nOrder ID: ${order.id}`
    );

    navigate("/orders");
  };

  return (
    <section className="section checkout-page">

      <div className="page-title">
        <span>ORDER CHECKOUT</span>
        <h1>Checkout</h1>
        <p>Enter your delivery details to place your order.</p>
      </div>

      <div className="checkout-layout">

        <form
          className="checkout-form"
          onSubmit={placeOrder}
        >

          <h2>Delivery Information</h2>

          <label>Full Name</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="House / Street / Area"
            required
          />

          <div className="checkout-row">

            <div>
              <label>City</label>
              <input
                name="city"
                value={customer.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>

            <div>
              <label>Pincode</label>
              <input
                name="pincode"
                value={customer.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                required
              />
            </div>

          </div>

          <label>Payment Method</label>

          <select
            name="payment"
            value={customer.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
          </select>

          <button
            type="submit"
            className="place-order-button"
          >
            🛍️ Place Order
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              className="summary-item"
              key={item.id}
            >
              <span>
                {item.emoji} {item.name} ×{" "}
                {item.cartQuantity}
              </span>

              <strong>
                ₹{item.price * item.cartQuantity}
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;