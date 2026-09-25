import { useEffect, useState } from "react";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders.reverse());

  }, []);

  const updateStatus = (id, status) => {

    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updated = allOrders.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );

    setOrders([...updated].reverse());
  };

  return (
    <section className="admin-section">

      <div className="admin-header">

        <div>
          <span>ORDER MANAGEMENT</span>
          <h1>Customer Orders</h1>
          <p>Manage supermarket orders.</p>
        </div>

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

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order.id}
            >

              <div className="admin-order-top">

                <div>
                  <span>ORDER</span>
                  <h3>{order.id}</h3>
                </div>

                <div>
                  <span>CUSTOMER</span>
                  <strong>
                    {order.customer.name}
                  </strong>
                </div>

                <div>
                  <span>PHONE</span>
                  <strong>
                    {order.customer.phone}
                  </strong>
                </div>

                <div>
                  <span>TOTAL</span>
                  <strong>
                    ₹{order.total}
                  </strong>
                </div>

              </div>

              <div className="admin-order-address">

                <strong>Delivery Address:</strong>

                <p>
                  {order.customer.address},{" "}
                  {order.customer.city} -{" "}
                  {order.customer.pincode}
                </p>

              </div>

              <div className="admin-order-bottom">

                <span>
                  Payment: {order.customer.payment}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Packed</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default AdminOrders;