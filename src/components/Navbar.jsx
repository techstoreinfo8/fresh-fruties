import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        🍃 <span>Fresh Fruities</span>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/fruits">Fresh Fruits</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Link to="/cart" className="cart-button">
        🛒 Cart
      </Link>
    </header>
  );
}

export default Navbar;