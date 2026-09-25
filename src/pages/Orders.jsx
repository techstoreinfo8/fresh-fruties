import { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders.reverse());

  }, []);

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
                  <span>ORDER ID</span>
                  <h3>{order.id}</h3>
                </div>

                <div>
                  <span>DATE</span>
                  <p>{order.date}</p>
                </div>

                <div>
                  <span>STATUS</span>
                  <strong className="status-badge">
                    {order.status}
                  </strong>
                </div>

              </div>

              <div className="order-products">

                {order.items.map((item) => (

                  <div
                    className="order-product"
                    key={item.id}
                  >
                    <span>
                      {item.emoji} {item.name}
                    </span>

                    <span>
                      × {item.cartQuantity}
                    </span>

                    <strong>
                      ₹{item.price * item.cartQuantity}
                    </strong>
                  </div>

                ))}

              </div>

              <div className="order-footer">

                <span>
                  Payment: {order.customer.payment}
                </span>

                <strong>
                  Total: ₹{order.total}
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