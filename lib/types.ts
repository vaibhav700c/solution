// Asset Management Types
export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'audio';
  uploadDate: Date;
  size: number;
  dnaProfile: string;
  watermarkStatus: 'protected' | 'unprotected' | 'compromised';
  detections: number;
}

export interface DNAProfile {
  id: string;
  assetId: string;
  hash: string;
  confidence: number;
  features: string[];
  createdAt: Date;
}

// Threat Detection Types
export interface ThreatEvent {
  id: string;
  type: 'unauthorized_copy' | 'metadata_strip' | 'deepfake' | 'distribution';
  severity: 'critical' | 'high' | 'medium' | 'low';
  assetName: string;
  location: string;
  timestamp: Date;
  evidence?: string;
  status: 'active' | 'resolved';
}

export interface BotDetection {
  id: string;
  botId: string;
  botName: string;
  networkId: string;
  lastSeen: Date;
  assetsCompromised: number;
  threat: 'spambot' | 'scraper' | 'deepfake_generator' | 'distributor';
  activity: string;
}

export interface SwarmLog {
  id: string;
  timestamp: Date;
  action: string;
  botsInvolved: number;
  assetsAffected: string[];
  response: string;
}

// Blockchain Types
export interface BlockchainRecord {
  id: string;
  assetId: string;
  assetName: string;
  owner: string;
  hash: string;
  timestamp: Date;
  status: 'verified' | 'pending' | 'failed';
  txHash: string;
}

export interface RegistrationRequest {
  id: string;
  assetName: string;
  owner: string;
  assetType: string;
  requestDate: Date;
  status: 'pending' | 'registered' | 'rejected';
}

// Browser Shield Types
export interface MediaVerification {
  id: string;
  mediaUrl: string;
  fileName: string;
  verified: boolean;
  confidence: number;
  authenticity: string;
  scanDate: Date;
}

// Analytics Types
export interface AnalyticsMetric {
  date: Date;
  detections: number;
  assetsProtected: number;
  botsBlocked: number;
  revenue?: number;
}

export interface PerformanceData {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

// Platform Status
export interface PlatformStatus {
  service: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  latency: number;
}
