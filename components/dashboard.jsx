"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  // Fetch total number of users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUserCount(data.length));
  }, []);

  // Fetch total number of posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPostCount(data.length));
  }, []);

  // Fetch total number of comments
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => setCommentCount(data.length));
  }, []);

  // Chart configuration
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
    },
    colors: ["#1E90FF", "#32CD32", "#FF6347"], // Custom colors for bars
  };

  const chartSeries = [
    {
      name: "Count",
      data: [userCount, postCount, commentCount], // Data for the chart
    },
  ];

  return (
    <main className="p-4 md:p-8 lg:p-12 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-center w-full">Dashboard</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 border rounded shadow text-center w-full">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{userCount}</p>
        </div>
        <div className="p-6 border rounded shadow text-center w-full">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-2xl font-bold">{postCount}</p>
        </div>
        <div className="p-6 border rounded shadow text-center w-full">
          <h2 className="text-lg font-semibold">Total Comments</h2>
          <p className="text-2xl font-bold">{commentCount}</p>
        </div>
      </div>
      <div className="w-full p-6 border rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Visualization</h2>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </main>
  );
}
