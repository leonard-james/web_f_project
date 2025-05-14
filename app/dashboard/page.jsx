"use client"

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AppSidebar } from "@/components/app-sidebar";
import { Menu } from "lucide-react"; // Icon for menu

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
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Users", "Posts", "Comments"],
    },
    colors: ["#2563eb", "#22c55e", "#ef4444"], // Blue, Green, Red
  };

  const chartSeries = [
    {
      name: "Count",
      data: [userCount, postCount, commentCount], // Data for the chart
    },
  ];

  return (
    <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
    <main className="flex w-full h-[calc(100vh-48px)] justify-center items-center bg-gray-100">
      <div className="w-full h-full max-w-4xl p-4 md:p-10 bg-white rounded shadow flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 w-full">
            <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
              Total Users: {userCount}
            </div>
            <div className="bg-green-100 text-green-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
              Total Posts: {postCount}
            </div>
            <div className="bg-red-100 text-red-800 p-4 rounded shadow text-center font-semibold min-w-[180px]">
              Total Comments: {commentCount}
            </div>
          </div>
          <div className="w-full">
            <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}