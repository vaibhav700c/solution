'use client';

import { useState } from 'react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockAnalyticsData, mockPerformanceMetrics } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  const chartData = mockAnalyticsData.map((d) => ({
    date: d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    detections: d.detections,
    assetsProtected: d.assetsProtected,
    botsBlocked: d.botsBlocked,
  }));

  const threatDistribution = [
    { name: 'Unauthorized Copy', value: 35, color: '#ff1744' },
    { name: 'Deepfake', value: 25, color: '#ff00ff' },
    { name: 'Metadata Strip', value: 20, color: '#ffb81c' },
    { name: 'Distribution', value: 20, color: '#ff9800' },
  ];

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
    downloadCsv(
      `analytics-report-${dateRange}.csv`,
      [
        ['Date', 'Detections', 'Assets Protected', 'Bots Blocked'],
        ...chartData.map((point) => [point.date, String(point.detections), String(point.assetsProtected), String(point.botsBlocked)]),
      ]
    );
    toast.success('Analytics data exported as CSV');
  };

  const handleDownloadReport = (title: string, subtitle: string) => {
    downloadCsv(`report-${title.toLowerCase().replace(/\s+/g, '-')}.csv`, [
      ['Report', 'Subtitle', 'Date Range'],
      [title, subtitle, dateRange],
    ]);
    toast.success(`${title} downloaded`);
  };

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-foreground/70">
            Comprehensive insights into platform performance and threat patterns
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-foreground/70">Date Range:</span>
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                size="sm"
                variant={dateRange === range ? 'default' : 'outline'}
                className={`h-8 text-xs ${
                  dateRange === range
                    ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                    : 'border-border/50'
                }`}
                onClick={() => setDateRange(range)}
              >
                Last {range === '7d' ? '7' : range === '30d' ? '30' : '90'} Days
              </Button>
            ))}
          </div>

          <Button
            className="h-10 bg-cyan-500/30 hover:bg-cyan-500/40 border-cyan-500/50"
            onClick={handleExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {mockPerformanceMetrics.map((metric, idx) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="glass-effect-strong border border-border/50 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{metric.metric}</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-2">
                    {metric.value.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    metric.trend === 'up'
                      ? 'bg-emerald-500/20'
                      : metric.trend === 'down'
                        ? 'bg-red-500/20'
                        : 'bg-amber-500/20'
                  }`}
                >
                  {metric.trend === 'up' ? (
                    <TrendingUp
                      className={`w-4 h-4 ${
                        metric.trend === 'up'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
              <div
                className={`mt-3 text-xs font-medium ${
                  metric.change > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {metric.change > 0 ? '+' : ''}{metric.change}% vs previous period
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detections Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect-strong border border-cyan-500/20 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Threat Detections
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3548" />
                <XAxis dataKey="date" stroke="#8a95a8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#8a95a8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #2d3548',
                    borderRadius: '8px',
                  }}
                  cursor={{ stroke: '#00d9ff', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="detections"
                  stroke="#00d9ff"
                  strokeWidth={2}
                  dot={{ fill: '#00d9ff', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Assets & Bots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect-strong border border-emerald-500/20 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Protection & Defense
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3548" />
                <XAxis dataKey="date" stroke="#8a95a8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#8a95a8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #2d3548',
                    borderRadius: '8px',
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  contentStyle={{
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #2d3548',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="assetsProtected" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="botsBlocked" fill="#ffb81c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Threat Distribution & Performance Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Threat Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect-strong border border-purple-500/20 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Threat Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f3a',
                    border: '1px solid #2d3548',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect-strong border border-amber-500/20 rounded-lg p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold">System Performance</h2>

            {[
              { metric: 'API Response Time', value: '42ms', status: 'optimal' },
              { metric: 'DNA Processing', value: '156ms', status: 'optimal' },
              { metric: 'Blockchain Verification', value: '234ms', status: 'good' },
              { metric: 'ML Model Inference', value: '89ms', status: 'optimal' },
              { metric: 'Database Queries', value: '12ms', status: 'excellent' },
              { metric: 'Network Latency', value: '28ms', status: 'excellent' },
            ].map((perf, idx) => (
              <motion.div
                key={perf.metric}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{perf.metric}</p>
                  <p className="text-sm font-semibold mt-1 text-cyan-400">{perf.value}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    perf.status === 'excellent'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : perf.status === 'optimal'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {perf.status}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Compliance & Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect-strong border border-border/50 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Compliance & Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Monthly Report',
                subtitle: 'March 2024',
                status: 'Ready',
              },
              {
                title: 'Annual Compliance',
                subtitle: 'GDPR & DMCA',
                status: 'Current',
              },
              {
                title: 'SLA Performance',
                subtitle: '99.98% Uptime',
                status: 'Verified',
              },
            ].map((report, idx) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="glass-effect border border-border/50 rounded-lg p-4"
              >
                <p className="text-sm font-semibold">{report.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{report.subtitle}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    {report.status}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-border/50"
                    onClick={() => handleDownloadReport(report.title, report.subtitle)}
                  >
                    Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </LayoutWrapper>
  );
}
