import { Link } from "react-router-dom";
import fruits from "../data/fruits";
import FruitCard from "../components/FruitCard";

function Home() {
  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            🌱 100% Fresh & Quality Fruits
          </span>

          <h1>
            Fresh Fruits.
            <br />
            Healthy Life.
          </h1>

          <p>
            Shop fresh, healthy and delicious fruits
            delivered directly to your doorstep.
          </p>

          <Link to="/fruits" className="hero-button">
            Shop Fresh Fruits →
          </Link>

        </div>

        <div className="hero-fruits">
          🍎 🍊 🍌
          <br />
          🥭 🍇 🍉
        </div>

      </section>

      <section className="section">

        <div className="section-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Fresh Fruits</h2>
          </div>

          <Link to="/fruits">
            View All →
          </Link>
        </div>

        <div className="fruit-grid">

          {fruits.slice(0, 6).map((fruit) => (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
            />
          ))}

        </div>

      </section>

      <section className="features">

        <div>
          <span>🚚</span>
          <h3>Fast Delivery</h3>
          <p>Fresh fruits delivered quickly.</p>
        </div>

        <div>
          <span>🌱</span>
          <h3>Fresh Quality</h3>
          <p>Carefully selected fresh fruits.</p>
        </div>

        <div>
          <span>💳</span>
          <h3>Secure Payment</h3>
          <p>Safe and convenient checkout.</p>
        </div>

        <div>
          <span>📞</span>
          <h3>Customer Support</h3>
          <p>We're here to help you.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;