'use client';

import { useState } from 'react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { motion } from 'framer-motion';
import {
  Search,
  Copy,
  CheckCircle,
  Clock,
  AlertCircle,
  Link2,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { mockBlockchainRecords, mockRegistrationRequests } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BlockchainRecord, RegistrationRequest } from '@/lib/types';

export default function BlockchainLedger() {
  const [records, setRecords] = useState<BlockchainRecord[]>(mockBlockchainRecords);
  const [requests, setRequests] = useState<RegistrationRequest[]>(mockRegistrationRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(records[0]);

  const filteredRecords = records.filter(
    (r) =>
      r.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    verified: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
    pending: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
    failed: 'bg-red-500/20 border-red-500/50 text-red-400',
  };

  const statusIcons = {
    verified: CheckCircle,
    pending: Clock,
    failed: AlertCircle,
  };

  const handleCopyHash = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      toast.success('Hash copied to clipboard');
    } catch {
      toast.error('Unable to copy hash');
    }
  };

  const handleOpenTransaction = (txHash: string) => {
    const explorerUrl = `https://etherscan.io/search?f=q&q=${encodeURIComponent(txHash)}`;
    window.open(explorerUrl, '_blank', 'noopener,noreferrer');
    toast.success('Opening transaction explorer');
  };

  const handleApproveRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) {
      toast.error('Registration request not found');
      return;
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'registered' }
          : r
      )
    );

    const newRecord: BlockchainRecord = {
      id: `${records.length + 1}`,
      assetId: requestId,
      assetName: req.assetName,
      owner: req.owner,
      hash: `0x${Math.random().toString(16).slice(2, 32)}`,
      timestamp: new Date(),
      status: 'verified',
      txHash: `0x${Math.random().toString(16).slice(2, 66)}`,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
    toast.success('Asset registered on blockchain');
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'rejected' }
          : r
      )
    );
    toast.error('Registration request rejected');
  };

  const SelectedStatusIcon = statusIcons[selectedRecord.status];

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Blockchain Ledger
          </h1>
          <p className="text-foreground/70">
            Immutable ownership records and asset registration on distributed ledger
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Registered Assets', value: records.length, color: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' },
            { label: 'Pending Verification', value: requests.filter(r => r.status === 'pending').length, color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
            { label: 'Network Confirmations', value: '12847', color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className={`glass-effect-strong border bg-gradient-to-br ${stat.color} rounded-lg p-4`}
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-cyan-400 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Records List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-3"
          >
            <div>
              <h2 className="text-lg font-semibold mb-3">Registered Assets ({filteredRecords.length})</h2>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-card/50 border border-border rounded-lg focus:outline-none focus:border-cyan-400 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredRecords.map((record) => {
                const StatusIcon = statusIcons[record.status];
                return (
                  <motion.div
                    key={record.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedRecord(record)}
                    className={`glass-effect border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedRecord?.id === record.id
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <StatusIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        record.status === 'verified' ? 'text-emerald-400' :
                        record.status === 'pending' ? 'text-amber-400' : 'text-red-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{record.assetName}</p>
                        <p className="text-xs text-muted-foreground truncate">{record.owner}</p>
                        <p className="text-xs text-cyan-400 font-mono mt-1 truncate">{record.hash.slice(0, 12)}...</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Record Details */}
          {selectedRecord && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 glass-effect-strong border border-emerald-500/20 rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold mb-1">{selectedRecord.assetName}</h2>
                <p className="text-sm text-muted-foreground">Asset ID: {selectedRecord.assetId}</p>
              </div>

              {/* Status Badge */}
              <div className={`glass-effect border rounded-lg p-4 ${statusColors[selectedRecord.status]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <SelectedStatusIcon className="w-4 h-4" />
                  <h3 className="font-semibold">Verification Status</h3>
                </div>
                <p className="text-sm opacity-90">
                  {selectedRecord.status === 'verified'
                    ? 'This asset ownership has been cryptographically verified on the blockchain'
                    : selectedRecord.status === 'pending'
                      ? 'Awaiting network confirmations'
                      : 'Verification failed'}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect border border-border/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="text-sm font-semibold text-cyan-400 mt-2 break-words">
                    {selectedRecord.owner}
                  </p>
                </div>
                <div className="glass-effect border border-border/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Registration Date</p>
                  <p className="text-sm font-semibold text-amber-400 mt-2">
                    {selectedRecord.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Hash Information */}
              <div className="glass-effect border border-cyan-500/30 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Asset Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-card/50 p-2 rounded text-xs font-mono text-cyan-400 break-all">
                      {selectedRecord.hash}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopyHash(selectedRecord.hash)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-card/50 p-2 rounded text-xs font-mono text-amber-400 break-all">
                      {selectedRecord.txHash}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-2"
                      onClick={() => handleOpenTransaction(selectedRecord.txHash)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Blockchain Details */}
              <div className="glass-effect border border-border/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Blockchain Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Network', value: 'Ethereum Mainnet' },
                    { label: 'Block Height', value: '19245832' },
                    { label: 'Confirmations', value: '12847' },
                    { label: 'Gas Used', value: '142,500' },
                  ].map((detail, idx) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="p-2 bg-card/50 rounded"
                    >
                      <p className="text-xs text-muted-foreground">{detail.label}</p>
                      <p className="font-semibold text-cyan-400 text-xs mt-1">{detail.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Registration Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect-strong border border-amber-500/20 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-400" />
            Pending Registration Requests
          </h2>

          {requests.filter(r => r.status === 'pending').length > 0 ? (
            <div className="space-y-3">
              {requests.filter(r => r.status === 'pending').map((request, idx) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="glass-effect border border-amber-500/30 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{request.assetName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Owner: {request.owner} • Type: {request.assetType}
                      </p>
                      <p className="text-xs text-amber-400 mt-2">
                        Requested {request.requestDate.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        className="h-8 bg-emerald-500/30 hover:bg-emerald-500/40 border-emerald-500/50"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 border-border/50"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Link2 className="w-12 h-12 mx-auto opacity-20 mb-4" />
              <p>No pending registration requests</p>
            </div>
          )}
        </motion.div>
      </div>
    </LayoutWrapper>
  );
}
