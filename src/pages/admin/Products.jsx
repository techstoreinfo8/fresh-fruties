import fruits from "../../data/fruits";

function Products() {

  return (
    <section className="admin-section">

      <div className="admin-header">

        <div>
          <span>PRODUCT MANAGEMENT</span>
          <h1>Fresh Fruits</h1>
          <p>Manage supermarket products.</p>
        </div>

      </div>

      <div className="admin-table">

        <div className="table-header">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
        </div>

        {fruits.map((fruit) => (

          <div
            className="table-row"
            key={fruit.id}
          >

            <strong>
              {fruit.emoji} {fruit.name}
            </strong>

            <span>{fruit.category}</span>

            <span>
              ₹{fruit.price}/{fruit.unit}
            </span>

            <span>
              {fruit.quantity} {fruit.unit}
            </span>

            <span>

              {fruit.quantity <= 20 ? (

                <b className="stock-low">
                  Low Stock
                </b>

              ) : (

                <b className="stock-good">
                  Available
                </b>

              )}

            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Products;