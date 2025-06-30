import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, Filter, RefreshCw, PieChart, LineChart, Activity } from 'lucide-react';

interface ChartData {
  month: string;
  revenue: number;
  customers: number;
  projects: number;
  tasks: number;
}

const mockChartData: ChartData[] = [
  { month: 'Jan', revenue: 45000, customers: 12, projects: 8, tasks: 45 },
  { month: 'Feb', revenue: 52000, customers: 15, projects: 10, tasks: 52 },
  { month: 'Mar', revenue: 48000, customers: 14, projects: 9, tasks: 48 },
  { month: 'Apr', revenue: 61000, customers: 18, projects: 12, tasks: 61 },
  { month: 'May', revenue: 55000, customers: 16, projects: 11, tasks: 55 },
  { month: 'Jun', revenue: 67000, customers: 20, projects: 14, tasks: 67 }
];

const mockTopCustomers = [
  { name: 'Tech Solutions Inc.', revenue: 25000, projects: 3 },
  { name: 'Global Tech', revenue: 22000, projects: 2 },
  { name: 'Innovate Corp', revenue: 18000, projects: 4 },
  { name: 'StartupXYZ', revenue: 15000, projects: 1 },
  { name: 'Digital Dynamics', revenue: 12000, projects: 2 }
];

const mockProjectStatus = [
  { status: 'Completed', count: 15, percentage: 60 },
  { status: 'In Progress', count: 8, percentage: 32 },
  { status: 'On Hold', count: 2, percentage: 8 }
];

export default function ReportsAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const totalRevenue = mockChartData.reduce((sum, data) => sum + data.revenue, 0);
  const totalCustomers = mockChartData.reduce((sum, data) => sum + data.customers, 0);
  const totalProjects = mockChartData.reduce((sum, data) => sum + data.projects, 0);
  const totalTasks = mockChartData.reduce((sum, data) => sum + data.tasks, 0);

  const revenueGrowth = ((mockChartData[mockChartData.length - 1].revenue - mockChartData[0].revenue) / mockChartData[0].revenue * 100).toFixed(1);
  const customerGrowth = ((mockChartData[mockChartData.length - 1].customers - mockChartData[0].customers) / mockChartData[0].customers * 100).toFixed(1);

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'revenue':
        return mockChartData.map(d => ({ month: d.month, value: d.revenue }));
      case 'customers':
        return mockChartData.map(d => ({ month: d.month, value: d.customers }));
      case 'projects':
        return mockChartData.map(d => ({ month: d.month, value: d.projects }));
      case 'tasks':
        return mockChartData.map(d => ({ month: d.month, value: d.tasks }));
      default:
        return mockChartData.map(d => ({ month: d.month, value: d.revenue }));
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'revenue': return 'Revenue ($)';
      case 'customers': return 'Customers';
      case 'projects': return 'Projects';
      case 'tasks': return 'Tasks';
      default: return 'Revenue ($)';
    }
  };

  const chartData = getMetricData();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 dark:text-green-400">+{revenueGrowth}% from last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCustomers}</p>
              <p className="text-sm text-green-600 dark:text-green-400">+{customerGrowth}% from last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProjects}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">8 in progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
              <p className="text-sm text-green-600 dark:text-green-400">85% completion rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Metric:</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
            >
              <option value="revenue">Revenue</option>
              <option value="customers">Customers</option>
              <option value="projects">Projects</option>
              <option value="tasks">Tasks</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blueinc"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{getMetricLabel()} Over Time</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => {
              const maxValue = Math.max(...chartData.map(d => d.value));
              const height = (data.value / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg relative" style={{ height: `${height}%` }}>
                    <div className="absolute inset-0 bg-blueinc rounded-t-lg"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white mt-1">
                    {selectedMetric === 'revenue' ? `$${data.value.toLocaleString()}` : data.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Status Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Status</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockProjectStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    status.status === 'Completed' ? 'bg-green-500' :
                    status.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm text-gray-900 dark:text-white">{status.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{status.count}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({status.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Customers by Revenue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTopCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blueinc text-white flex items-center justify-center font-semibold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${customer.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {customer.projects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Project Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45 days</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5.0</p>
            </div>
            <BarChart3 className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Productivity</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">92%</p>
            </div>
            <Activity className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
} 