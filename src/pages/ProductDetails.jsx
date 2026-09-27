import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_BASE_URL = "http://localhost:8080/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  // --------------------------------
  // LOAD PRODUCT
  // --------------------------------
  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      setProduct(null);
      setCategoryName("");

      const response = await fetch(
        `${API_BASE_URL}/products/${id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setProduct(null);
          return;
        }

        throw new Error(
          "Failed to load product."
        );
      }

      const productData = await response.json();

      setProduct(productData);

      // --------------------------------
      // LOAD CATEGORY
      // --------------------------------
      if (productData.categoryId) {
        try {
          const categoryResponse = await fetch(
            `${API_BASE_URL}/categories`
          );

          if (categoryResponse.ok) {
            const categories =
              await categoryResponse.json();

            const matchedCategory =
              categories.find(
                (category) =>
                  Number(category.id) ===
                  Number(productData.categoryId)
              );

            if (matchedCategory) {
              setCategoryName(
                matchedCategory.name
              );
            }
          }
        } catch (categoryError) {
          console.error(
            "Category loading error:",
            categoryError
          );
        }
      }
    } catch (err) {
      console.error(
        "Product details error:",
        err
      );

      setError(
        err.message ||
          "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // ADD TO CART
  // --------------------------------
  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!product.active) {
      alert(
        "This product is currently unavailable."
      );
      return;
    }

    const stock = Number(
      product.stockQuantity || 0
    );

    if (stock <= 0) {
      alert(
        "This product is currently out of stock."
      );
      return;
    }

    addToCart(product);

    navigate("/cart");
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="product-details">
        <div className="product-content">

          <h2>Loading product...</h2>

          <p>
            Please wait while we load the
            product information.
          </p>

        </div>
      </section>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error) {
    return (
      <section className="product-details">

        <div className="product-content">

          <h2>
            Unable to load product
          </h2>

          <p>{error}</p>

          <button
            type="button"
            className="add-cart-button"
            onClick={loadProduct}
          >
            Try Again
          </button>

        </div>

      </section>
    );
  }

  // --------------------------------
  // PRODUCT NOT FOUND
  // --------------------------------
  if (!product) {
    return (
      <section className="product-details">

        <div className="product-content">

          <h2>
            Product not found
          </h2>

          <p>
            The requested product could not
            be found.
          </p>

          <button
            type="button"
            className="add-cart-button"
            onClick={() => navigate("/products")}
          >
            Back to Products
          </button>

        </div>

      </section>
    );
  }

  const price = Number(
    product.price || 0
  );

  const stock = Number(
    product.stockQuantity || 0
  );

  const minimumStock = Number(
    product.minimumStock || 0
  );

  const isAvailable =
    Boolean(product.active) &&
    stock > 0;

  return (
    <section className="product-details">

      {/* PRODUCT IMAGE */}
      <div className="product-large-image">
        🍎
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="product-content">

        <span className="category">
          {categoryName || "Fresh Fruit"}
        </span>

        <h1>{product.name}</h1>

        <p className="product-description">
          Fresh {product.name} available at
          Fresh Fruities.
        </p>

        {/* PRICE */}
        <h2>
          ₹{price.toFixed(2)}

          {product.unit && (
            <span>
              {" "}
              / {product.unit}
            </span>
          )}
        </h2>

        {/* STOCK */}
        <p>
          Available Stock:{" "}
          <strong>
            {stock} {product.unit || ""}
          </strong>
        </p>

        {/* MINIMUM STOCK */}
        <p>
          Minimum Stock:{" "}
          <strong>
            {minimumStock}
          </strong>
        </p>

        {/* INACTIVE */}
        {!product.active && (
          <p className="stock-warning">
            This product is currently
            unavailable.
          </p>
        )}

        {/* OUT OF STOCK */}
        {product.active && stock <= 0 && (
          <p className="stock-warning">
            This product is currently
            out of stock.
          </p>
        )}

        {/* LOW STOCK */}
        {isAvailable &&
          stock <= minimumStock && (
            <p className="stock-warning">
              Only {stock}{" "}
              {product.unit || "units"}{" "}
              remaining.
            </p>
          )}

        {/* ADD TO CART */}
        <button
          type="button"
          className="add-cart-button"
          onClick={handleAddToCart}
          disabled={!isAvailable}
        >
          {!product.active
            ? "Unavailable"
            : stock <= 0
            ? "Out of Stock"
            : "🛒 Add to Cart"}
        </button>

      </div>

    </section>
  );
}

export default ProductDetails;

