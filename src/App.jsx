import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Fruits from "./pages/Fruits";
import FruitCard from "./components/FruitCard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Products from "./pages/admin/Products";
import Inventory from "./pages/admin/Inventory";
import AdminOrders from "./pages/admin/Orders";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/fruitCard" element={<FruitCard />} />
          <Route path="/fruit/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;