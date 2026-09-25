import { useState } from "react";
import fruits from "../data/fruits";
import FruitCard from "../components/FruitCard";

function Fruits() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(fruits.map((fruit) => fruit.category))
  ];

  const filteredFruits = fruits.filter((fruit) => {

    const matchesSearch =
      fruit.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      fruit.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section fruits-page">

      <div className="page-title">
        <span>FRESH COLLECTION</span>
        <h1>Fresh Fruits</h1>
        <p>Choose from our collection of quality fruits.</p>
      </div>

      <div className="fruit-controls">

        <input
          type="text"
          placeholder="🔍 Search fruits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="fruit-grid">

        {filteredFruits.map((fruit) => (
          <FruitCard
            key={fruit.id}
            fruit={fruit}
          />
        ))}

      </div>

    </section>
  );
}

export default Fruits;