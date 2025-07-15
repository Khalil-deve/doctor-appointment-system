import DataCard from "../Shared/DataCard";
import { Suspense, lazy } from "react";

// Dynamically import charts (reduces initial bundle size)
const ApexChart = lazy(() => import("react-apexcharts"));

export default function AnalyticsOverview({
  users = [],
  patients = [],
  doctors = [],
  appointments = [],
}) {
  // Calculate statistics
  const totalUsers = users.length;
  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const activeAppointments = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  ).length;
  const cancelledAppointments = appointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  // Calculate percentages (mock growth - replace with your actual business logic)
  const userGrowthPercentage = Math.round((users.length / 100) * 12); // Example: 12% growth
  const appointmentGrowthPercentage = Math.round(
    (appointments.length / 100) * 8
  ); // 8% growth

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      change: `+${userGrowthPercentage}%`,
      trend: "up",
    },
    {
      title: "Active Patients",
      value: totalPatients,
      change: "+5%",
      trend: "up",
    },
    {
      title: "Verified Doctors",
      value: totalDoctors,
      change: "+15%",
      trend: "up",
    },
    {
      title: "Confirmed Appointments",
      value: activeAppointments,
      change: `+${appointmentGrowthPercentage}%`,
      trend: "up",
    },
  ];

  // Chart configurations
  const appointmentTrendOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 3 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    colors: ["#3B82F6"],
  };

  const appointmentTrendSeries = [
    {
      name: "Appointments",
      data: [30, 40, 35, 50, 49, 60, activeAppointments], // Last value is current month
    },
  ];

  const userDistributionSeries = [
    users.filter((u) => u.role === "patient").length,
    users.filter((u) => u.role === "doctor").length,
    users.filter((u) => u.role === "admin").length,
  ];

  const appointmentStatusSeries = [
    (activeAppointments / appointments.length) * 100 || 0,
    (pendingAppointments / appointments.length) * 100 || 0,
    (cancelledAppointments / appointments.length) * 100 || 0,
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analytics Overview</h2>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <DataCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium mb-4">Appointments Trend</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <ApexChart
            options={appointmentTrendOptions}
            series={appointmentTrendSeries}
            type="line"
            height={300}
          />
        </Suspense>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">User Types</h3>
          <Suspense fallback={<div>Loading chart...</div>}>
            <ApexChart
              options={{
                chart: { type: "donut" },
                labels: ["Patients", "Doctors", "Admins"],
                colors: ["#10B981", "#3B82F6", "#6366F1"],
                legend: { position: "bottom" },
              }}
              series={userDistributionSeries}
              type="donut"
              height={280}
            />
          </Suspense>
        </div>

        {/* Appointment Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">Appointment Status</h3>
          <Suspense fallback={<div>Loading chart...</div>}>
            <ApexChart
              options={{
                chart: { type: "radialBar" },
                plotOptions: {
                  radialBar: {
                    hollow: { size: "40%" },
                    dataLabels: {
                      name: { fontSize: "14px" },
                      value: { fontSize: "18px" },
                    },
                  },
                },
                labels: ["Confirmed", "Pending", "Cancelled"],
                colors: ["#10B981", "#F59E0B", "#EF4444"],
              }}
              series={appointmentStatusSeries}
              type="radialBar"
              height={280}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
