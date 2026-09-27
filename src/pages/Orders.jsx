import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/orders`);

      if (!response.ok) {
        throw new Error("Failed to load orders.");
      }

      const data = await response.json();

      // Show newest orders first
      const sortedOrders = [...data].sort((a, b) => {
        return (
          new Date(b.orderDate || 0) -
          new Date(a.orderDate || 0)
        );
      });

      setOrders(sortedOrders);
    } catch (err) {
      console.error("Orders error:", err);
      setError(
        err.message || "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toFixed(2);
  };

  if (loading) {
    return (
      <section className="section orders-page">
        <div className="page-title">
          <span>ORDER HISTORY</span>
          <h1>My Orders</h1>
          <p>Track your Fresh Fruities orders.</p>
        </div>

        <div className="empty-cart">
          <div>⏳</div>
          <h2>Loading orders...</h2>
          <p>Please wait.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section orders-page">
        <div className="page-title">
          <span>ORDER HISTORY</span>
          <h1>My Orders</h1>
          <p>Track your Fresh Fruities orders.</p>
        </div>

        <div className="empty-cart">
          <div>⚠️</div>
          <h2>Unable to load orders</h2>
          <p>{error}</p>

          <button
            type="button"
            className="checkout-button"
            onClick={fetchOrders}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section orders-page">

      <div className="page-title">
        <span>ORDER HISTORY</span>
        <h1>My Orders</h1>
        <p>Track your Fresh Fruities orders.</p>
      </div>

      {orders.length === 0 ? (

        <div className="empty-cart">
          <div>📦</div>
          <h2>No orders yet</h2>
          <p>Start shopping for fresh fruits.</p>
        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-header">

                <div>
                  <span>ORDER NUMBER</span>
                  <h3>
                    {order.orderNumber || order.id}
                  </h3>
                </div>

                <div>
                  <span>DATE</span>
                  <p>
                    {formatDate(order.orderDate)}
                  </p>
                </div>

                <div>
                  <span>STATUS</span>

                  <strong className="status-badge">
                    {order.status || "PENDING"}
                  </strong>
                </div>

              </div>

              <div className="order-products">

                <div className="order-product">

                  <span>
                    Order #{order.orderNumber}
                  </span>

                  <span>
                    Customer ID: {order.customerId}
                  </span>

                  <strong>
                    ₹{formatAmount(order.totalAmount)}
                  </strong>

                </div>

              </div>

              <div className="order-footer">

                <span>
                  Payment:{" "}
                  {order.paymentStatus || "PENDING"}
                </span>

                <strong>
                  Total: ₹
                  {formatAmount(order.totalAmount)}
                </strong>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Orders;