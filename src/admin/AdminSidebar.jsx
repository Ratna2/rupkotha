import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <h2 className="admin-logo">Rupkotha Admin</h2>

      <nav>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/customers">Customers</NavLink>
        <NavLink to="/admin/payments">Payments</NavLink>
        <NavLink to="/admin/enquiry">Enquiry</NavLink>
      </nav>

    </aside>
  );
}

export default AdminSidebar;
