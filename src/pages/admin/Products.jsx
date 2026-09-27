import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // --------------------------------
  // LOAD PRODUCTS FROM DATABASE
  // --------------------------------
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/products`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load products."
        );
      }

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error(
        "Products loading error:",
        err
      );

      setError(
        err.message ||
        "Unable to load products."
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
        "Categories loading error:",
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
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="admin-section">

        <div className="admin-header">
          <div>
            <span>
              PRODUCT MANAGEMENT
            </span>

            <h1>Fresh Fruits</h1>

            <p>
              Loading products from database...
            </p>
          </div>
        </div>

        <div className="no-data-box">
          ⏳
          <h2>Loading Products...</h2>
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
              PRODUCT MANAGEMENT
            </span>

            <h1>Fresh Fruits</h1>

            <p>
              Manage supermarket products.
            </p>
          </div>

        </div>

        <div className="no-data-box">

          ⚠️

          <h2>
            Unable to load products
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadProducts}
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
            PRODUCT MANAGEMENT
          </span>

          <h1>Fresh Fruits</h1>

          <p>
            Manage supermarket products.
          </p>
        </div>

        <button
          type="button"
          className="refresh-button"
          onClick={loadProducts}
        >
          ↻ Refresh
        </button>

      </div>

      {products.length === 0 ? (

        <div className="no-data-box">

          🍎

          <h2>No Products</h2>

          <p>
            Products added to the database
            will appear here.
          </p>

        </div>

      ) : (

        <div className="admin-table">

          <div className="table-header">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Status</span>
          </div>

          {products.map((product) => {

            const stock = Number(
              product.stockQuantity || 0
            );

            const minimumStock = Number(
              product.minimumStock || 5
            );

            return (
              <div
                className="table-row"
                key={product.id}
              >

                <strong>
                  🍎 {product.name}
                </strong>

                <span>
                  {getCategoryName(
                    product.categoryId
                  )}
                </span>

                <span>
                  ₹
                  {Number(
                    product.price || 0
                  ).toFixed(2)}

                  {product.unit
                    ? ` / ${product.unit}`
                    : ""}
                </span>

                <span>
                  {stock}{" "}
                  {product.unit || ""}
                </span>

                <span>

                  {!product.active ? (

                    <b className="stock-out">
                      Inactive
                    </b>

                  ) : stock === 0 ? (

                    <b className="stock-out">
                      Out of Stock
                    </b>

                  ) : stock <= minimumStock ? (

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
            );
          })}

        </div>

      )}

    </section>
  );
}

export default Products;