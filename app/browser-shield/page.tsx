'use client';

import { useState } from 'react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { motion } from 'framer-motion';
import {
  Upload,
  CheckCircle,
  AlertTriangle,
  Eye,
  BarChart3,
  Shield,
} from 'lucide-react';
import { mockMediaVerifications } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MediaVerification } from '@/lib/types';

export default function BrowserShield() {
  const [verifications, setVerifications] = useState<MediaVerification[]>(mockMediaVerifications);
  const [selectedMedia, setSelectedMedia] = useState<MediaVerification | null>(verifications[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanMedia = async () => {
    setIsScanning(true);
    // Simulate scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsScanning(false);
    toast.success('Media scan completed');
  };

  const handleVerifyURL = () => {
    toast.success('Verification initiated');
  };

  const handleInstallExtension = () => {
    window.open('https://chromewebstore.google.com/', '_blank', 'noopener,noreferrer');
    toast.success('Opening browser extension store');
  };

  const confidenceColor = selectedMedia
    ? selectedMedia.verified
      ? 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/50'
      : 'from-red-500/20 to-pink-500/20 border-red-500/50'
    : '';

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Browser Shield
          </h1>
          <p className="text-foreground/70">
            Real-time media verification and deepfake detection in your browser
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect-strong border border-cyan-500/20 rounded-lg p-8"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-4 rounded-lg bg-cyan-500/20 mb-4"
            >
              <Upload className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Verify Media Authenticity</h2>
            <p className="text-foreground/70 text-center mb-6 max-w-md">
              Upload or paste a URL to verify if media is original or manipulated
            </p>

            <div className="w-full max-w-md space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste media URL..."
                  className="flex-1 px-4 py-2 bg-card/50 border border-border rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && handleVerifyURL()}
                />
                <Button
                  className="h-10 bg-cyan-500/30 hover:bg-cyan-500/40 border-cyan-500/50"
                  onClick={handleVerifyURL}
                >
                  Verify
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">or upload file</span>
                </div>
              </div>

              <motion.div
                whileHover={{ borderColor: 'rgba(0, 217, 255, 0.5)' }}
                className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center cursor-pointer transition-colors"
              >
                <p className="text-sm text-foreground/70">
                  Drag and drop your media file here
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Verification Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verifications List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-3"
          >
            <h2 className="text-lg font-semibold mb-4">Recent Scans ({verifications.length})</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {verifications.map((v) => (
                <motion.div
                  key={v.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedMedia(v)}
                  className={`glass-effect border rounded-lg p-3 cursor-pointer transition-all ${
                    selectedMedia?.id === v.id
                      ? 'border-cyan-500/50 bg-cyan-500/10'
                      : 'border-border/50 hover:border-border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {v.verified ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{v.fileName}</p>
                      <p className={`text-xs font-medium mt-1 ${
                        v.verified ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {v.verified ? 'Authentic' : 'Suspicious'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {v.confidence}% confidence
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Analysis */}
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Main Result Card */}
              <div className={`glass-effect-strong border bg-gradient-to-br ${confidenceColor} rounded-lg p-6`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedMedia.verified ? 'Authentic' : 'Suspicious'}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-1">
                      {selectedMedia.fileName}
                    </p>
                  </div>
                  {selectedMedia.verified ? (
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 text-red-400" />
                  )}
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="glass-effect border border-border/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">Confidence Score</p>
                  <p className="text-2xl font-bold text-cyan-400">{selectedMedia.confidence}%</p>
                </div>
                <div className="w-full bg-card rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedMedia.confidence}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className={`h-full ${
                      selectedMedia.verified
                        ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                        : 'bg-gradient-to-r from-red-400 to-pink-400'
                    }`}
                  />
                </div>
              </div>

              {/* Analysis Details */}
              <div className="glass-effect border border-border/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Analysis Results</h3>
                <p className="text-sm text-foreground/80">{selectedMedia.authenticity}</p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { label: 'Metadata', status: true },
                    { label: 'Watermark', status: selectedMedia.verified },
                    { label: 'Digital Signature', status: selectedMedia.verified },
                    { label: 'Temporal Analysis', status: true },
                  ].map((check, idx) => (
                    <motion.div
                      key={check.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-center gap-2 p-2 bg-card/50 rounded text-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          check.status ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span className="text-xs">{check.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scan Info */}
              <div className="glass-effect border border-border/50 rounded-lg p-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last scanned: {selectedMedia.scanDate.toLocaleString()}</span>
                <Button
                  size="sm"
                  className="h-8 bg-cyan-500/30 hover:bg-cyan-500/40"
                  onClick={handleScanMedia}
                  disabled={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Rescan'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* AR Overlay Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect-strong border border-purple-500/20 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-400" />
            AR Overlay Simulator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm text-foreground/70">
                Preview how MediaDNA verifications appear with AR overlay in your browser extension
              </p>

              <div className="space-y-2">
                {[
                  { label: 'Browser Extension Installed', status: true },
                  { label: 'Real-time Scanning', status: true },
                  { label: 'Inline Verification Badges', status: true },
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="flex items-center gap-3 p-2 bg-card/50 rounded"
                  >
                    <div className={`w-2 h-2 rounded-full ${feature.status ? 'bg-emerald-400' : 'bg-muted-foreground'}`} />
                    <span className="text-sm">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                className="w-full h-10 bg-purple-500/30 hover:bg-purple-500/40 border-purple-500/50"
                onClick={handleInstallExtension}
              >
                Install Browser Extension
              </Button>
            </div>

            <div className="glass-effect border border-purple-500/30 rounded-lg p-4 space-y-3">
              <p className="text-xs text-muted-foreground font-semibold">EXAMPLE: Online Media Page</p>
              <div className="space-y-2">
                {[
                  { title: 'Image 1', status: 'Verified', color: 'emerald' },
                  { title: 'Video Preview', status: 'Suspicious', color: 'red' },
                  { title: 'PDF Document', status: 'Verified', color: 'emerald' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded border bg-${item.color}-500/10 border-${item.color}-500/30`}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className={`text-xs font-semibold text-${item.color}-400`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </LayoutWrapper>
  );
}
