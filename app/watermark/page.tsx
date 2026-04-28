'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Plus, Shield, Eye, Settings, Trash2, Download } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const initialWatermarks = [
  { id: 1, name: 'Corporate Logo DNA', status: 'Active', assets: 142, deployed: '2024-01-15', strength: 98 },
  { id: 2, name: 'Document Watermark v2', status: 'Active', assets: 89, deployed: '2024-01-10', strength: 95 },
  { id: 3, name: 'Video Frame Protection', status: 'Inactive', assets: 0, deployed: '2023-12-20', strength: 92 },
  { id: 4, name: 'Audio Fingerprint', status: 'Active', assets: 267, deployed: '2024-01-05', strength: 99 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WatermarkPage() {
  const [watermarks, setWatermarks] = useState(initialWatermarks);
  const [selectedId, setSelectedId] = useState(1);

  const selectedWatermark = watermarks.find((w) => w.id === selectedId);

  const handleCreateWatermark = () => {
    const nextId = Math.max(...watermarks.map((watermark) => watermark.id)) + 1;
    const newWatermark = {
      id: nextId,
      name: `New Watermark ${nextId}`,
      status: 'Inactive',
      assets: 0,
      deployed: new Date().toISOString().slice(0, 10),
      strength: 100,
    };

    setWatermarks((prev) => [newWatermark, ...prev]);
    setSelectedId(nextId);
    toast.success('Watermark created');
  };

  const handlePreviewWatermark = () => {
    if (!selectedWatermark) {
      return;
    }

    toast.success(`Previewing ${selectedWatermark.name}`);
  };

  const handleDeployWatermark = () => {
    if (!selectedWatermark) {
      return;
    }

    setWatermarks((prev) =>
      prev.map((watermark) =>
        watermark.id === selectedId
          ? { ...watermark, status: 'Active', deployed: new Date().toISOString().slice(0, 10) }
          : watermark
      )
    );
    toast.success(`${selectedWatermark.name} deployed`);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Header />

      <main className="ml-72 mt-20 p-8 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Watermark Manager</h1>
              <p className="text-slate-400">Manage and deploy your digital DNA watermarks</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateWatermark}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/30"
            >
              <Plus size={20} />
              Create Watermark
            </motion.button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Watermarks List */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="lg:col-span-2">
            <motion.div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4">Your Watermarks</h2>
              <div className="space-y-3">
                {watermarks.map((wm, index) => (
                  <motion.div
                    key={wm.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedId(wm.id)}
                    whileHover={{ x: 4 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedId === wm.id
                        ? 'bg-indigo-600/20 border-indigo-500/50'
                        : 'bg-slate-900/50 border-slate-700/30 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-medium">{wm.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${wm.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                        {wm.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400 text-xs">Assets</p>
                        <p className="text-white font-semibold">{wm.assets}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Deployed</p>
                        <p className="text-white font-semibold">{wm.deployed}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Strength</p>
                        <p className="text-indigo-300 font-semibold">{wm.strength}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Details Panel */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <motion.div className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-4">DNA Profile</h2>
              {selectedWatermark && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Watermark ID</p>
                    <p className="text-white font-mono text-sm">WMDNA-2024-{String(selectedId).padStart(4, '0')}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Encryption Level</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" />
                      </div>
                      <span className="text-sm text-indigo-300 font-semibold">95%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Visibility</p>
                    <p className="text-white font-semibold">Invisible to Human Eye</p>
                  </div>

                  <div className="pt-4 border-t border-slate-700/30 space-y-2">
                    <motion.button whileHover={{ scale: 1.02 }} onClick={handlePreviewWatermark} className="w-full p-2.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Eye size={16} />
                      Preview
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} onClick={handleDeployWatermark} className="w-full p-2.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-300 text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Shield size={16} />
                      Deploy
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
