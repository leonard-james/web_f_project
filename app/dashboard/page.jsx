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
      height: 400,
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
    <main className="p-6 border rounded shadow-sm w-full h-full flex flex-col justify-center items-center">
      <div className="w-full mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center w-full">Dashboard</h1>
        <div className="w-full flex flex-col md:flex-row gap-6 mb-10">
          <div className="flex-1 p-6 border rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
          <div className="flex-1 p-6 border rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Posts</h2>
            <p className="text-2xl font-bold">{postCount}</p>
          </div>
          <div className="flex-1 p-6 border rounded shadow text-center">
            <h2 className="text-lg font-semibold">Total Comments</h2>
            <p className="text-2xl font-bold">{commentCount}</p>
          </div>
        </div>
        <div className="w-full p-6 border rounded shadow">
          <h2 className="text-lg font-semibold mb-4 w-full text-center">Visualization</h2>
          <div className="w-full" style={{ minHeight: 420 }}>
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={400}
              width="100%"
            />
          </div>
        </div>
      </div>
    </main>
  );
}