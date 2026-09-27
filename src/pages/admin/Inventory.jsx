import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInventory();
    loadCategories();
  }, []);

  // --------------------------------
  // LOAD INVENTORY FROM DATABASE
  // --------------------------------
  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/inventory`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load inventory."
        );
      }

      const data = await response.json();

      setInventory(data);
    } catch (err) {
      console.error(
        "Inventory loading error:",
        err
      );

      setError(
        err.message ||
        "Unable to load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // LOAD CATEGORIES
  // --------------------------------
  const loadCategories = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories`
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setCategories(data);
    } catch (err) {
      console.error(
        "Category loading error:",
        err
      );
    }
  };

  // --------------------------------
  // GET CATEGORY NAME
  // --------------------------------
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (item) =>
        Number(item.id) ===
        Number(categoryId)
    );

    return category?.name || "-";
  };

  // --------------------------------
  // STOCK VALUE
  // --------------------------------
  const getStockQuantity = (item) => {
    return Number(
      item.stockQuantity ??
      item.quantity ??
      0
    );
  };

  // --------------------------------
  // SUMMARY
  // --------------------------------
  const totalStock = inventory.reduce(
    (sum, item) =>
      sum + getStockQuantity(item),
    0
  );

  const lowStock = inventory.filter((item) => {
    const stock = getStockQuantity(item);

    const minimumStock = Number(
      item.minimumStock ?? 5
    );

    return (
      stock > 0 &&
      stock <= minimumStock
    );
  });

  const outOfStock = inventory.filter(
    (item) =>
      getStockQuantity(item) === 0
  );

  // --------------------------------
  // RENDER
  // --------------------------------

  if (loading) {
    return (
      <section className="admin-section">

        <div className="admin-header">
          <div>
            <span>
              INVENTORY MANAGEMENT
            </span>

            <h1>Inventory</h1>

            <p>
              Loading inventory from database...
            </p>
          </div>
        </div>

        <div className="inventory-loading">
          Loading...
        </div>

      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-section">

        <div className="admin-header">
          <div>
            <span>
              INVENTORY MANAGEMENT
            </span>

            <h1>Inventory</h1>

            <p>
              Monitor fruit stock levels.
            </p>
          </div>
        </div>

        <div className="inventory-error">

          <span>⚠️</span>

          <h2>
            Unable to load inventory
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadInventory}
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
            INVENTORY MANAGEMENT
          </span>

          <h1>Inventory</h1>

          <p>
            Monitor fruit stock levels.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInventory}
          className="refresh-button"
        >
          ↻ Refresh
        </button>

      </div>

      {/* INVENTORY SUMMARY */}

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

      {/* INVENTORY TABLE */}

      <div className="admin-table">

        <div className="table-header">

          <span>Product</span>

          <span>Category</span>

          <span>Stock</span>

          <span>Unit</span>

          <span>Stock Status</span>

        </div>

        {inventory.length === 0 ? (

          <div className="inventory-empty">

            <span>📦</span>

            <h2>No inventory found</h2>

            <p>
              No products are currently available
              in the database.
            </p>

          </div>

        ) : (

          inventory.map((item) => {

            const stock =
              getStockQuantity(item);

            const minimumStock =
              Number(
                item.minimumStock ?? 5
              );

            return (
              <div
                className="table-row"
                key={item.id}
              >

                <strong>
                  🍎 {item.name}
                </strong>

                <span>
                  {getCategoryName(
                    item.categoryId
                  )}
                </span>

                <span>
                  {stock}
                </span>

                <span>
                  {item.unit || "-"}
                </span>

                <span>

                  {stock === 0 ? (

                    <b className="stock-out">
                      Out of Stock
                    </b>

                  ) : stock <= minimumStock ? (

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
            );
          })
        )}

      </div>

    </section>
  );
}

export default Inventory;