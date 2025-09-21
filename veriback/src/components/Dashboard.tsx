import React from 'react'
import { Shield, Database, Clock, CheckCircle, AlertCircle, Download, Eye } from 'lucide-react'
import type { BackupItem } from '../types/BackupItem'

interface DashboardProps {
  backups: BackupItem[]
  onVerifyBackup: (backupId: string) => void
  onRecoverBackup: (backupId: string) => void
}

export const Dashboard: React.FC<DashboardProps> = ({ backups, onVerifyBackup, onRecoverBackup }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusIcon = (status: BackupItem['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'stored':
        return <Database className="h-5 w-5 text-blue-500" />
      case 'uploading':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      case 'verifying':
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Database className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: BackupItem['status']) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'stored':
        return 'Stored'
      case 'uploading':
        return 'Uploading...'
      case 'verifying':
        return 'Verifying...'
      case 'error':
        return 'Error'
      default:
        return 'Unknown'
    }
  }

  const totalSize = backups.reduce((sum, backup) => sum + backup.size, 0)
  const verifiedCount = backups.filter(backup => backup.status === 'verified').length

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="dark-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark-text-primary">Backup Overview</h2>
          <div className="flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dark-stats-card">
            <div className="text-3xl font-bold text-indigo-400 mb-2">{backups.length}</div>
            <div className="text-sm dark-text-secondary">Total Backups</div>
          </div>
          <div className="dark-stats-card">
            <div className="text-3xl font-bold text-green-400 mb-2">{verifiedCount}</div>
            <div className="text-sm dark-text-secondary">Verified</div>
          </div>
          <div className="dark-stats-card">
            <div className="text-3xl font-bold text-blue-400 mb-2">{formatFileSize(totalSize)}</div>
            <div className="text-sm dark-text-secondary">Total Size</div>
          </div>
        </div>
      </div>

      {/* Backups List */}
      <div className="dark-card">
        <div className="px-8 py-6 border-b border-white/10">
          <h2 className="text-2xl font-bold dark-text-primary">Your Backups</h2>
          <p className="dark-text-secondary mt-1">Cryptographically verifiable data backups</p>
        </div>
        
        {backups.length === 0 ? (
          <div className="p-12 text-center">
            <div className="dark-icon-container">
              <Database className="h-16 w-16 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold dark-text-primary mb-3">No backups yet</h3>
            <p className="dark-text-secondary max-w-md mx-auto">Upload your first file to create a cryptographically verifiable backup on the Filecoin network</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {backups.map((backup) => (
              <div key={backup.id} className="p-6 hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(backup.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium dark-text-primary truncate">
                        {backup.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm dark-text-secondary bg-white/10 px-3 py-1 rounded-full">
                          {formatFileSize(backup.size)}
                        </span>
                        <span className="text-sm dark-text-muted">
                          {formatDate(backup.createdAt)}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          backup.status === 'verified' ? 'dark-status-verified' :
                          backup.status === 'stored' ? 'dark-status-stored' :
                          backup.status === 'error' ? 'dark-status-error' :
                          'dark-status-pending'
                        }`}>
                          {getStatusText(backup.status)}
                        </span>
                      </div>
                      {backup.verification && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg">
                          <div className="text-xs dark-text-muted mb-1">Proof Hash</div>
                          <div className="text-sm font-mono text-indigo-300">
                            {backup.verification.proofHash.slice(0, 16)}...
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {backup.status === 'stored' && (
                      <button
                        onClick={() => onVerifyBackup(backup.id)}
                        className="dark-button text-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Verify
                      </button>
                    )}
                    
                    {backup.status === 'verified' && (
                      <button
                        onClick={() => onRecoverBackup(backup.id)}
                        className="dark-button text-sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Recover
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
