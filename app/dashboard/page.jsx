"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);
        const users = await usersRes.json();
        const posts = await postsRes.json();
        const comments = await commentsRes.json();

        setUserCount(users.length);
        setPostCount(posts.length);
        setCommentCount(comments.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
    },
    colors: ["#2563eb", "#22c55e", "#ef4444"],
  };

  const chartSeries = [
    {
      name: "Count",
      data: [userCount, postCount, commentCount],
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-2 md:px-4 lg:px-8 py-6">
      <div className="max-w-screen-lg w-full mx-auto my-10 p-8 md:px-20 lg:px-24 py-12 bg-white rounded shadow flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-10 text-center">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-10 justify-center">
          <div className="flex-1 min-w-[200px] max-w-xs p-8 border rounded shadow text-center bg-blue-600 text-white">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-xs p-8 border rounded shadow text-center bg-green-600 text-white">
            <h2 className="text-lg font-semibold">Total Posts</h2>
            <p className="text-2xl font-bold">{postCount}</p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-xs p-8 border rounded shadow text-center bg-red-600 text-white">
            <h2 className="text-lg font-semibold">Total Comments</h2>
            <p className="text-2xl font-bold">{commentCount}</p>
          </div>
        </div>
        <div className="p-12 border rounded shadow w-full max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-center">Visualization</h2>
          <div className="w-full" style={{ minHeight: 420 }}>
            {loading ? (
              <div className="text-center text-gray-500">Loading chart...</div>
            ) : (
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={400}
                width="100%"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
