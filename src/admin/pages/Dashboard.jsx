import { motion } from "framer-motion";
import {
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
} from "lucide-react";

function Dashboard() {

  const cards = [
    {
      title: "Total Revenue",
      value: "₹1,24,500",
      icon: <IndianRupee size={22} />,
    },
    {
      title: "Total Orders",
      value: "245",
      icon: <ShoppingBag size={22} />,
    },
    {
      title: "Products",
      value: "82",
      icon: <Package size={22} />,
    },
    {
      title: "Customers",
      value: "156",
      icon: <Users size={22} />,
    },
  ];

  return (
    <div className="admin-dashboard">

      <h1 className="dashboard-title">
        Dashboard Overview
      </h1>

      {/* STATS GRID */}
      <div className="stats-grid">

        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-icon">
              {card.icon}
            </div>

            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </motion.div>
        ))}

      </div>

      {/* PERFORMANCE SECTION */}
      <div className="performance-section">

        <div className="performance-card">
          <h3>Top Selling Product</h3>
          <p>Bridal Mukut Premium</p>
        </div>

        <div className="performance-card">
          <h3>Lowest Stock Alert</h3>
          <p>Royal Boron Dala (5 left)</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
