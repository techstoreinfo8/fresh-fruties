import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  // --------------------------------
  // LOAD ORDERS FROM DATABASE
  // --------------------------------
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load orders."
        );
      }

      const data = await response.json();

      const sortedOrders = [...data].sort(
        (a, b) =>
          new Date(b.orderDate || 0) -
          new Date(a.orderDate || 0)
      );

      setOrders(sortedOrders);

      // Load items for every order
      await loadAllOrderItems(sortedOrders);

    } catch (err) {
      console.error(
        "Order loading error:",
        err
      );

      setError(
        err.message ||
        "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // LOAD ORDER ITEMS
  // --------------------------------
  const loadAllOrderItems = async (ordersList) => {
    const itemsMap = {};

    await Promise.all(
      ordersList.map(async (order) => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/orders/${order.id}/items`
          );

          if (!response.ok) {
            return;
          }

          const items = await response.json();

          itemsMap[order.id] = items;
        } catch (err) {
          console.error(
            `Failed to load items for order ${order.id}`,
            err
          );

          itemsMap[order.id] = [];
        }
      })
    );

    setOrderItems(itemsMap);
  };

  // --------------------------------
  // UPDATE ORDER STATUS
  // --------------------------------
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const currentOrder = orders.find(
        (order) => order.id === id
      );

      if (!currentOrder) {
        return;
      }

      const updatedOrder = {
        ...currentOrder,
        status
      };

      const response = await fetch(
        `${API_BASE_URL}/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedOrder)
        }
      );

      if (!response.ok) {
        const message =
          await response.text();

        throw new Error(
          message ||
          "Failed to update order status."
        );
      }

      const savedOrder =
        await response.json();

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.id === id
            ? savedOrder
            : order
        )
      );

    } catch (err) {
      console.error(
        "Update order error:",
        err
      );

      alert(
        err.message ||
        "Unable to update order."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------
  // DATE FORMAT
  // --------------------------------
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  };

  // --------------------------------
  // MONEY FORMAT
  // --------------------------------
  const formatAmount = (amount) => {
    return Number(amount || 0).toFixed(2);
  };

  // --------------------------------
  // STATUS CLASS
  // --------------------------------
  const getStatusClass = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "status-confirmed";

      case "PROCESSING":
        return "status-processing";

      case "COMPLETED":
        return "status-completed";

      case "CANCELLED":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="admin-section">

        <div className="admin-header">
          <div>
            <span>
              ORDER MANAGEMENT
            </span>

            <h1>Customer Orders</h1>

            <p>
              Loading orders from database...
            </p>
          </div>
        </div>

        <div className="no-data-box">
          ⏳
          <h2>Loading Orders...</h2>
          <p>Please wait.</p>
        </div>

      </section>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error) {
    return (
      <section className="admin-section">

        <div className="admin-header">
          <div>
            <span>
              ORDER MANAGEMENT
            </span>

            <h1>Customer Orders</h1>

            <p>
              Manage supermarket orders.
            </p>
          </div>
        </div>

        <div className="no-data-box">

          ⚠️

          <h2>
            Unable to load orders
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadOrders}
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="admin-section">

      <div className="admin-header">

        <div>
          <span>
            ORDER MANAGEMENT
          </span>

          <h1>Customer Orders</h1>

          <p>
            Manage supermarket orders.
          </p>
        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={loadOrders}
        >
          ↻ Refresh
        </button>

      </div>

      {orders.length === 0 ? (

        <div className="no-data-box">

          📦

          <h2>No Orders</h2>

          <p>
            Customer orders will appear here.
          </p>

        </div>

      ) : (

        <div className="admin-orders">

          {orders.map((order) => {

            const items =
              orderItems[order.id] || [];

            return (
              <div
                className="admin-order-card"
                key={order.id}
              >

                {/* ORDER HEADER */}

                <div className="admin-order-top">

                  <div>
                    <span>ORDER</span>

                    <h3>
                      {order.orderNumber ||
                        `#${order.id}`}
                    </h3>
                  </div>

                  <div>
                    <span>ORDER DATE</span>

                    <strong>
                      {formatDate(
                        order.orderDate
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>CUSTOMER ID</span>

                    <strong>
                      {order.customerId ||
                        "-"}
                    </strong>
                  </div>

                  <div>
                    <span>TOTAL</span>

                    <strong>
                      ₹
                      {formatAmount(
                        order.totalAmount
                      )}
                    </strong>
                  </div>

                </div>

                {/* ORDER ITEMS */}

                <div className="admin-order-address">

                  <strong>
                    Order Items:
                  </strong>

                  {items.length === 0 ? (

                    <p>
                      No order items found.
                    </p>

                  ) : (

                    <div className="admin-order-items">

                      {items.map(
                        (item, index) => (
                          <div
                            className="admin-order-item"
                            key={
                              item.id ||
                              index
                            }
                          >

                            <span>
                              Product ID:{" "}
                              {item.productId ||
                                "-"}
                            </span>

                            <span>
                              Quantity:{" "}
                              {item.quantity ||
                                0}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

                {/* ORDER FOOTER */}

                <div className="admin-order-bottom">

                  <span>
                    Payment:{" "}
                    <strong>
                      {order.paymentStatus ||
                        "PENDING"}
                    </strong>
                  </span>

                  <span
                    className={`status-badge ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status ||
                      "PENDING"}
                  </span>

                  <select
                    value={
                      order.status ||
                      "PENDING"
                    }
                    disabled={
                      updatingId === order.id
                    }
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="CONFIRMED">
                      Confirmed
                    </option>

                    <option value="PROCESSING">
                      Processing
                    </option>

                    <option value="COMPLETED">
                      Completed
                    </option>

                    <option value="CANCELLED">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default AdminOrders;