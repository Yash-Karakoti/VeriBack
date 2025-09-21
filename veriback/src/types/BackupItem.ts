export interface BackupItem {
  id: string
  name: string
  size: number
  createdAt: Date
  lastVerified?: Date
  status: 'uploading' | 'stored' | 'verifying' | 'verified' | 'error'
  verification?: {
    isValid: boolean
    proofHash: string
    provider: string
    timestamp: Date
  }
  pieceCid?: string
  dataSetId?: string
  encrypted: boolean
}

export interface VerificationResult {
  isValid: boolean
  proofHash: string
  provider: string
  timestamp: Date
  details: {
    pieceCid: string
    dataSetId: string
    proofOfDataPossession: boolean
    integrityCheck: boolean
  }
}

export interface BackupStats {
  totalBackups: number
  totalSize: number
  verifiedBackups: number
  lastBackup?: Date
}
