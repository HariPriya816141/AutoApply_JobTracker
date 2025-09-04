import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import EmptyPieChartPlaceHolder from "../components/EmptyPieChartPlaceHolder";
import EmptyBarChartPlaceholder from "../components/EmptyBarChartPlaceholder";

const COLORS = ["#3B3F98", "#5BC0EB", "#AEEEEE", "#FF6B6B"];
// applied, interview, offer, rejected

const Dashboard = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications") || "[]");
    setApps(data);
  }, []);

  const total = apps.length;
  const statusCounts = apps.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "Applied", value: statusCounts["Applied"] || 0 },
    { name: "Interview", value: statusCounts["Interview"] || 0 },
    { name: "Offer", value: statusCounts["Offer"] || 0 },
    { name: "Rejected", value: statusCounts["Rejected"] || 0 },
  ].filter((slice) => slice.value > 0);

  const sourceCounts = Object.entries(
    apps.reduce((acc, a) => {
      acc[a.source] = (acc[a.source] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const submittedToday = apps.filter(
    (app) => app.dateSubmitted && app.dateSubmitted.startsWith(today)
  ).length;

  const pendingReview = apps.filter(
    (app) => app.status === "Applied" || app.status === "Interview"
  ).length;

  const completed = apps.filter(
    (app) => app.status === "Offer" || app.status === "Rejected"
  ).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-2">
      {/* Total Applications Card */}
      <div
  className="text-white p-5 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
  style={{
    background: "linear-gradient(135deg, #3B3F98, #5BC0EB, #AEEEEE)",
  }}
>
  {/* Card Header */}
  <div className="flex flex-col items-start">
    <h3 className="text-base font-bold opacity-90">Total Applications</h3>
    <div className="text-4xl font-bold mt-1">{total}</div>
  </div>

  {/* Status Summary */}
  <div className="grid grid-cols-4 gap-4 mt-5 text-sm">
    <div className="text-center">
      <div className="opacity-80">Applied</div>
      <div className="font-semibold">{statusCounts["Applied"] || 0}</div>
    </div>
    <div className="text-center">
      <div className="opacity-80">Interview</div>
      <div className="font-semibold">{statusCounts["Interview"] || 0}</div>
    </div>
    <div className="text-center">
      <div className="opacity-80">Offer</div>
      <div className="font-semibold">{statusCounts["Offer"] || 0}</div>
    </div>
    <div className="text-center">
      <div className="opacity-80">Rejected</div>
      <div className="font-semibold">{statusCounts["Rejected"] || 0}</div>
    </div>
  </div>

  {/* Extra Stats */}
  <div className="mt-6 space-y-2 text-sm opacity-90">
    <div className="flex justify-between">
      <span>Resumes submitted today:</span>
      <span className="font-medium">{submittedToday}</span>
    </div>
    <div className="flex justify-between">
      <span>Pending review:</span>
      <span className="font-medium">{pendingReview}</span>
    </div>
    <div className="flex justify-between">
      <span>Applications completed:</span>
      <span className="font-medium">{completed}</span>
    </div>
  </div>
</div>

     {/* Pie Chart Card */}
<div
  className="col-span-1 lg:col-span-2 dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
  style={{
    background: "linear-gradient(135deg, #DAA520, #FFEB8A, #FFF7C0)",
  }}
>
  <h3 className="text-lg text-white font-semibold mb-3">
    Status distribution
  </h3>
  <div className="flex-1 min-h-[300px] w-full flex items-center justify-center">
    {pieData.length === 0 ? (
      <div className="flex flex-col items-center space-y-4">
      <EmptyPieChartPlaceHolder className="w-32 h-32 opacity-80" />
      <p className="text-white font-medium text-lg text-center">
        Start adding your applications to see status distribution 📊
      </p>
      </div>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius="70%"
            label
          >
            {pieData.map((entry, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "none",
            }}
            labelStyle={{ fontWeight: "600", color: "#374151" }}
            itemStyle={{ color: "#111827" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
</div>

{/* Bar Chart Card */}
<div
  className="col-span-1 lg:col-span-3 dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transform-gpu transition-all duration-300 flex flex-col"
  style={{
    background:
      "linear-gradient(135deg, rgba(17,30,212,0.7), rgba(53,104,163,0.5), rgba(122,218,241,0.3))",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
  }}
>
  <h3 className="text-lg text-white font-semibold mb-3">
    Applications by source
  </h3>
  <div className="flex-1 min-h-[300px] w-full flex items-center justify-center">
    {sourceCounts.length === 0 ? (
      <div className="flex flex-col items-center space-y-4">
      <EmptyBarChartPlaceholder className="w-40 h-40 opacity-80" />
      <p className="text-white font-medium text-lg text-center">
        No data yet. Add applications to see where they came from 🌐
      </p>
      </div>
    ) : (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sourceCounts}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.2}
            stroke="#ffffff33"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: "#fff", fontSize: 22, fontWeight: 600 }}
            axisLine={{ stroke: "#fff" }}
            tickLine={{ stroke: "#fff" }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#fff", fontSize: 12 }}
            axisLine={{ stroke: "#fff" }}
            tickLine={{ stroke: "#fff" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "none",
            }}
            labelStyle={{ fontWeight: "600", color: "#111827" }}
            itemStyle={{ color: "#374151" }}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
</div>

    </div>
  );
};

export default Dashboard;
