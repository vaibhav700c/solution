'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';
import { Shield, AlertTriangle, Zap, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Lock } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const dashboardData = [
  { time: '00:00', threats: 4, protected: 12 },
  { time: '04:00', threats: 3, protected: 18 },
  { time: '08:00', threats: 8, protected: 25 },
  { time: '12:00', threats: 6, protected: 32 },
  { time: '16:00', threats: 9, protected: 28 },
  { time: '20:00', threats: 5, protected: 35 },
  { time: '24:00', threats: 2, protected: 40 },
];

const threatDistribution = [
  { name: 'Bot Attacks', value: 240, fill: '#ec4899' },
  { name: 'IP Theft', value: 180, fill: '#6366f1' },
  { name: 'Unauthorized', value: 120, fill: '#3b82f6' },
  { name: 'Other', value: 80, fill: '#f59e0b' },
];

const stats = [
  {
    icon: Shield,
    label: 'Protected Assets',
    value: '1,247',
    change: '+12.5%',
    isPositive: true,
    color: 'from-indigo-600 to-indigo-400',
  },
  {
    icon: AlertTriangle,
    label: 'Active Threats',
    value: '24',
    change: '-8.2%',
    isPositive: false,
    color: 'from-pink-600 to-pink-400',
  },
  {
    icon: Activity,
    label: 'Bot Network',
    value: '3.2K',
    change: '+5.1%',
    isPositive: true,
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: TrendingUp,
    label: 'Detection Rate',
    value: '99.8%',
    change: '+0.3%',
    isPositive: true,
    color: 'from-green-600 to-green-400',
  },
];

const recentThreats = [
  { id: 1, type: 'Bot Attack', severity: 'Critical', time: '2 min ago', status: 'Blocked' },
  { id: 2, type: 'IP Spoofing', severity: 'High', time: '15 min ago', status: 'Investigating' },
  { id: 3, type: 'Content Theft', severity: 'Medium', time: '1 hour ago', status: 'Resolved' },
  { id: 4, type: 'Unauthorized Access', severity: 'High', time: '2 hours ago', status: 'Blocked' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const downloadCsv = (filename: string, rows: string[][]) => {
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    downloadCsv('dashboard-activity.csv', [
      ['Time', 'Threats', 'Protected'],
      ...dashboardData.map((point) => [point.time, String(point.threats), String(point.protected)]),
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Header />

      <main className="ml-72 mt-20 p-8 space-y-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, Admin. Here's what's happening with your assets.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group relative overflow-hidden"
                >
                  {/* Background animation */}
                  <motion.div
                    animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} -z-10`}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-2 font-medium">{stat.label}</p>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-white mb-3"
                      >
                        {stat.value}
                      </motion.h3>
                      <motion.div className="flex items-center gap-1 text-sm">
                        {stat.isPositive ? (
                          <>
                            <ArrowUpRight size={14} className="text-green-400" />
                            <span className="text-green-400">{stat.change}</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight size={14} className="text-emerald-400" />
                            <span className="text-emerald-400">{stat.change}</span>
                          </>
                        )}
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      animate={{ y: hoveredCard === index ? -2 : 0 }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                    >
                      <Icon size={24} className="text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Activity Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              whileHover={{ borderColor: '#6366f1' }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Daily Activity</h3>
                  <p className="text-sm text-slate-400 mt-1">Threats vs Protected Assets</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-sm font-medium transition-all"
                >
                  Export
                </motion.button>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dashboardData}>
                  <defs>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorProtected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Area type="monotone" dataKey="threats" stroke="#ec4899" fillOpacity={1} fill="url(#colorThreats)" />
                  <Area type="monotone" dataKey="protected" stroke="#6366f1" fillOpacity={1} fill="url(#colorProtected)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Threat Distribution */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ borderColor: '#6366f1' }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Threat Types</h3>
              <div className="space-y-4">
                {threatDistribution.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="space-y-2 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300 font-medium">{item.name}</span>
                      <span className="text-sm font-semibold text-white">{item.value}</span>
                    </div>
                    <motion.div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / 300) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        style={{ backgroundColor: item.fill }}
                        className="h-full rounded-full shadow-lg"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Recent Threats Table */}
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ borderColor: '#6366f1' }}
            className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Threats</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/analytics')}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                View All →
              </motion.button>
            </div>

            <div className="space-y-3">
              {recentThreats.map((threat, index) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(71, 85, 105, 0.3)' }}
                  className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50 flex items-center justify-between group cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        threat.severity === 'Critical'
                          ? 'bg-red-500'
                          : threat.severity === 'High'
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">{threat.type}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{threat.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        threat.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-300'
                          : threat.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {threat.severity}
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        threat.status === 'Blocked'
                          ? 'bg-green-500/20 text-green-300'
                          : threat.status === 'Resolved'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-orange-500/20 text-orange-300'
                      }`}
                    >
                      {threat.status}
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
