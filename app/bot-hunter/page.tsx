'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Bot, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const botData = [
  { time: '12am', bots: 12, blocked: 8 },
  { time: '4am', bots: 19, blocked: 14 },
  { time: '8am', bots: 28, blocked: 22 },
  { time: '12pm', bots: 34, blocked: 28 },
  { time: '4pm', bots: 42, blocked: 35 },
  { time: '8pm', bots: 38, blocked: 32 },
  { time: '12am', bots: 31, blocked: 26 },
];

const detections = [
  { id: 1, type: 'Crawler Bot', ip: '192.168.1.45', threat: 'High', status: 'Blocked', time: '2 min ago' },
  { id: 2, type: 'Scraper Agent', ip: '10.0.0.89', threat: 'Critical', status: 'Blocked', time: '5 min ago' },
  { id: 3, type: 'Proxy Access', ip: '172.16.0.23', threat: 'Medium', status: 'Monitored', time: '12 min ago' },
  { id: 4, type: 'Bot Network', ip: '203.0.113.45', threat: 'Critical', status: 'Blocked', time: '18 min ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BotHunterPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Header />

      <main className="ml-72 mt-20 p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Bot Hunter Network</h1>
          <p className="text-slate-400">Real-time bot detection and threat intelligence</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Bots Detected</p>
                <h3 className="text-3xl font-bold text-white mt-2">3,247</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-pink-600 to-pink-400">
                <Bot size={24} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Blocked This Hour</p>
                <h3 className="text-3xl font-bold text-white mt-2">284</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-600 to-green-400">
                <Shield size={24} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Network Health</p>
                <h3 className="text-3xl font-bold text-white mt-2">98.7%</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
                <TrendingUp size={24} className="text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts and Detections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4">Bot Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={botData}>
                  <defs>
                    <linearGradient id="colorBots" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0' }} />
                  <Area type="monotone" dataKey="bots" stroke="#ec4899" fillOpacity={1} fill="url(#colorBots)" />
                  <Area type="monotone" dataKey="blocked" stroke="#10b981" fillOpacity={1} fill="url(#colorBlocked)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Top Threats */}
          <motion.div variants={itemVariants}>
            <motion.div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4">Top Threats</h2>
              <div className="space-y-3">
                {detections.slice(0, 4).map((d, idx) => (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${d.threat === 'Critical' ? 'bg-red-500' : d.threat === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                      <p className="text-sm text-white font-medium">{d.type}</p>
                    </div>
                    <p className="text-xs text-slate-400">{d.ip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Detections Table */}
        <motion.div variants={itemVariants}>
          <motion.div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
            <h2 className="text-lg font-semibold text-white mb-4">Live Detections</h2>
            <div className="space-y-2">
              {detections.map((d, idx) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/30 hover:border-slate-600/50 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className={`w-3 h-3 rounded-full ${d.threat === 'Critical' ? 'bg-red-500' : d.threat === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                    <div className="flex-1">
                      <p className="text-white font-medium">{d.type}</p>
                      <p className="text-xs text-slate-400">{d.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${d.threat === 'Critical' ? 'bg-red-500/20 text-red-300' : d.threat === 'High' ? 'bg-orange-500/20 text-orange-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {d.threat}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${d.status === 'Blocked' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {d.status}
                    </span>
                    <span className="text-xs text-slate-400">{d.time}</span>
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
