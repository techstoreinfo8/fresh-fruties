import { useEffect, useState } from "react";
import FruitCard from "../components/FruitCard";
import { useCart } from "../context/CartContext";

const API_BASE_URL = "http://localhost:8080/api";

function Fruits() {
  const [fruits, setFruits] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

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

      setFruits(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load products. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load categories."
        );
      }

      const data = await response.json();

      setCategories(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Category loading error:",
        error
      );
    }
  };

  const filteredFruits = fruits.filter(
    (fruit) => {
      const productName =
        fruit.name || "";

      const matchesSearch =
        productName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        String(fruit.categoryId) ===
          String(category);

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const handleAddToCart = (fruit) => {
    addToCart(fruit);

    alert(
      `${fruit.name} added to cart.`
    );
  };

  return (
    <section className="section fruits-page">

      <div className="page-title">
        <span>
          FRESH COLLECTION
        </span>

        <h1>Fresh Fruits</h1>

        <p>
          Choose from our collection
          of quality fruits.
        </p>
      </div>

      <div className="fruit-controls">

        <input
          type="text"
          placeholder="🔍 Search fruits..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>

      </div>

      {loading && (
        <div className="loading-message">
          Loading fresh fruits...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}

          <button
            type="button"
            onClick={loadProducts}
          >
            Retry
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredFruits.length === 0 && (
          <div className="empty-products">
            <h2>
              No fruits found
            </h2>

            <p>
              Try another search
              or category.
            </p>
          </div>
        )}

      {!loading && !error && (
        <div className="fruit-grid">

          {filteredFruits.map(
            (fruit) => (
              <FruitCard
                key={fruit.id}
                fruit={fruit}
                onAddToCart={
                  handleAddToCart
                }
              />
            )
          )}

        </div>
      )}

    </section>
  );
}

export default Fruits;