"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Activity, FileText, MessageCircle, UsersRound } from "lucide-react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const metrics = [
  { key: "users", label: "Total users", icon: UsersRound, tone: "bg-blue-50 text-blue-700" },
  { key: "posts", label: "Published posts", icon: FileText, tone: "bg-violet-50 text-violet-700" },
  { key: "comments", label: "Comments", icon: MessageCircle, tone: "bg-emerald-50 text-emerald-700" },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({ users: 0, posts: 0, comments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
        ]);
        if (responses.some((response) => !response.ok)) {
          throw new Error("The overview data could not be loaded.");
        }
        const [users, posts, comments] = await Promise.all(responses.map((response) => response.json()));
        setCounts({ users: users.length, posts: posts.length, comments: comments.length });
      } catch (fetchError) {
        console.error("Failed to fetch dashboard data:", fetchError);
        setError("We couldn't load the overview right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false }, fontFamily: "inherit" },
    plotOptions: { bar: { horizontal: true, borderRadius: 6, barHeight: "48%", distributed: true } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Users", "Posts", "Comments"], labels: { style: { colors: "#64748b" } } },
    yaxis: { labels: { style: { colors: "#475569", fontWeight: 500 } } },
    grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
    colors: ["#2563eb", "#8b5cf6", "#10b981"],
    tooltip: { theme: "light" },
    legend: { show: false },
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 pb-10">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">At a glance</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Project overview</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">A live snapshot of the people and conversations in ViewPoint.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
          <Activity className="h-4 w-4 text-emerald-600" /> JSONPlaceholder data
        </div>
      </section>

      {error ? (
        <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-800">{error}</div>
      ) : (
        <>
          <section aria-label="Project metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map(({ key, label, icon: Icon, tone }) => (
              <article key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                      {loading ? <span className="inline-block h-9 w-16 animate-pulse rounded bg-slate-100" aria-label="Loading" /> : counts[key].toLocaleString()}
                    </p>
                  </div>
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
                </div>
              </article>
            ))}
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-950">Community snapshot</h3>
              <p className="mt-1 text-sm text-slate-500">Compare the total content currently available.</p>
            </div>
            <div className="min-h-[280px]">
              {loading ? (
                <div className="flex min-h-[280px] items-center justify-center text-sm text-slate-500" role="status">Loading project data…</div>
              ) : (
                <ReactApexChart options={chartOptions} series={[{ name: "Count", data: [counts.users, counts.posts, counts.comments] }]} type="bar" height={300} width="100%" />
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
