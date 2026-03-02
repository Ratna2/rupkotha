import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

import PersonalInfo from "./pages/account/PersonalInfo";
import MyAddress from "./pages/account/MyAddress";
import AddAddress from "./pages/account/AddAddress";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Enquiry from "./admin/pages/Enquiry";
import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./admin/pages/AdminLogin";

function App() {
  return (
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/account/profile" element={<PersonalInfo />} />
        <Route path="/account/address" element={<MyAddress />} />
        <Route path="/account/add-address" element={<AddAddress />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* ADMIN LOGIN (PUBLIC PAGE) */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="enquiry" element={<Enquiry />} />
      </Route>

    </Routes>
  );
}

export default App;