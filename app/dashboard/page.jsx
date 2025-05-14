"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";


// Dynamically import ApexCharts to avoid SSR issues
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);
      const users = await usersRes.json();
      const posts = await postsRes.json();
      const comments = await commentsRes.json();
      setStats({
        users: users.length,
        posts: posts.length,
        comments: comments.length,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  // Example chart data
  const chartOptions = {
    chart: { type: "bar" },
    xaxis: { categories: ["Users", "Posts", "Comments"] },
    colors: ["#3b82f6", "#22c55e", "#ef4444"], // blue, green, red
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#111"]
      }
    },
  };
  const chartSeries = [{ data: [stats.users, stats.posts, stats.comments] }];

  return (
    <main className="flex flex-1 min-h-screen bg-gray-100 p-4 md:p-10 justify-center items-center">
  <div className="max-w-4xl w-full flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 w-full">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
          {loading ? "Loading..." : `Total Users: ${stats.users}`}
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
          {loading ? "Loading..." : `Total Posts: ${stats.posts}`}
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
          {loading ? "Loading..." : `Total Comments: ${stats.comments}`}
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow w-full">
        <ApexCharts options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
    </div>
  </div>
</main>

  );
}
