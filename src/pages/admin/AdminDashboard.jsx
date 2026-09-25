import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fruits from "../../data/fruits";

function AdminDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

  const totalSales = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const stock = fruits.reduce(
    (sum, fruit) => sum + fruit.quantity,
    0
  );

  const lowStock = fruits.filter(
    (fruit) => fruit.quantity <= 20
  ).length;

  return (
    <section className="admin-section">

      <div className="admin-header">

        <div>
          <span>FRESH FRUITIES ADMIN</span>
          <h1>Dashboard</h1>
          <p>
            Manage your supermarket operations.
          </p>
        </div>

        <Link
          to="/fruits"
          className="admin-store-button"
        >
          View Store →
        </Link>

      </div>

      <div className="admin-cards">

        <div className="admin-card">
          <span>🍎</span>
          <p>Total Products</p>
          <h2>{fruits.length}</h2>
        </div>

        <div className="admin-card">
          <span>📦</span>
          <p>Total Stock</p>
          <h2>{stock}</h2>
        </div>

        <div className="admin-card">
          <span>🛒</span>
          <p>Total Orders</p>
          <h2>{orders.length}</h2>
        </div>

        <div className="admin-card">
          <span>⏳</span>
          <p>Pending Orders</p>
          <h2>{pendingOrders}</h2>
        </div>

        <div className="admin-card">
          <span>💰</span>
          <p>Total Sales</p>
          <h2>₹{totalSales}</h2>
        </div>

        <div className="admin-card warning-card">
          <span>⚠️</span>
          <p>Low Stock</p>
          <h2>{lowStock}</h2>
        </div>

      </div>

      <div className="admin-navigation">

        <Link to="/admin/products">
          <span>🍎</span>
          <strong>Products</strong>
          <small>Manage fruits</small>
        </Link>

        <Link to="/admin/inventory">
          <span>📦</span>
          <strong>Inventory</strong>
          <small>Manage stock</small>
        </Link>

        <Link to="/admin/orders">
          <span>🛍️</span>
          <strong>Orders</strong>
          <small>Manage customer orders</small>
        </Link>

      </div>

      <div className="admin-recent">

        <div className="admin-section-title">
          <h2>Recent Orders</h2>

          <Link to="/admin/orders">
            View All →
          </Link>
        </div>

        {orders.length === 0 ? (

          <p className="no-data">
            No customer orders yet.
          </p>

        ) : (

          <div className="admin-order-table">

            {orders.slice(-5).reverse().map((order) => (

              <div
                className="admin-order-row"
                key={order.id}
              >

                <strong>{order.id}</strong>

                <span>
                  {order.customer.name}
                </span>

                <span>
                  ₹{order.total}
                </span>

                <span className="status-badge">
                  {order.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default AdminDashboard;