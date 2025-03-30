import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    runningOffers: 0,
    products: {
      women: 0,
      men: 0,
      kids: 0,
    },
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:4000/dashboard-stats");
      const data = await response.json();

      if (data.success) {
        setStats({
          totalUsers: data.totalUsers,
          totalSales: data.totalSales,
          runningOffers: data.runningOffers,
          products: {
            women: data.products.women,
            men: data.products.men,
            kids: data.products.kids,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Sales</h3>
          <p>${stats.totalSales.toFixed(2)}</p>
        </div>

        <div className="dashboard-card">
          <h3>Running Offers</h3>
          <p>{stats.runningOffers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Products</h3>
          <p>Women: {stats.products.women}</p>
          <p>Men: {stats.products.men}</p>
          <p>Kids: {stats.products.kids}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
