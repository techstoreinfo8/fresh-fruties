import fruits from "../../data/fruits";

function Inventory() {

  const totalStock = fruits.reduce(
    (sum, fruit) => sum + fruit.quantity,
    0
  );

  const lowStock = fruits.filter(
    (fruit) => fruit.quantity <= 20
  );

  const outOfStock = fruits.filter(
    (fruit) => fruit.quantity === 0
  );

  return (
    <section className="admin-section">

      <div className="admin-header">

        <div>
          <span>INVENTORY MANAGEMENT</span>
          <h1>Inventory</h1>
          <p>Monitor fruit stock levels.</p>
        </div>

      </div>

      <div className="inventory-summary">

        <div>
          <span>📦</span>
          <p>Total Stock</p>
          <h2>{totalStock}</h2>
        </div>

        <div>
          <span>⚠️</span>
          <p>Low Stock</p>
          <h2>{lowStock.length}</h2>
        </div>

        <div>
          <span>❌</span>
          <p>Out of Stock</p>
          <h2>{outOfStock.length}</h2>
        </div>

      </div>

      <div className="admin-table">

        <div className="table-header">
          <span>Fruit</span>
          <span>Category</span>
          <span>Stock</span>
          <span>Unit</span>
          <span>Stock Status</span>
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

            <span>{fruit.quantity}</span>

            <span>{fruit.unit}</span>

            <span>

              {fruit.quantity === 0 ? (

                <b className="stock-out">
                  Out of Stock
                </b>

              ) : fruit.quantity <= 20 ? (

                <b className="stock-low">
                  Low Stock
                </b>

              ) : (

                <b className="stock-good">
                  Good Stock
                </b>

              )}

            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Inventory;