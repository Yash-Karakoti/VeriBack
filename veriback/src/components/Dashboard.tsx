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
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Backup Overview</h2>
          <div className="flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="text-3xl font-bold text-indigo-400 mb-2">{backups.length}</div>
            <div className="text-sm text-gray-200">Total Backups</div>
          </div>
          <div className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="text-3xl font-bold text-green-400 mb-2">{verifiedCount}</div>
            <div className="text-sm text-gray-200">Verified</div>
          </div>
          <div className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">{formatFileSize(totalSize)}</div>
            <div className="text-sm text-gray-200">Total Size</div>
          </div>
        </div>
      </div>

      {/* Backups List */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 hover-lift">
        <div className="px-8 py-6 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">Your Backups</h2>
          <p className="text-gray-200 mt-1">Cryptographically verifiable data backups</p>
        </div>
        
        {backups.length === 0 ? (
          <div className="p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"></div>
              <div className="relative bg-gray-800/60 rounded-full p-6 mx-auto w-fit border border-gray-600/30">
                <Database className="h-16 w-16 text-indigo-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">No backups yet</h3>
            <p className="text-gray-200 max-w-md mx-auto">Upload your first file to create a cryptographically verifiable backup on the Filecoin network</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700/50">
            {backups.map((backup) => (
              <div key={backup.id} className="p-6 hover:bg-gray-800/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(backup.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-white truncate">
                        {backup.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-200 bg-gray-800/60 px-3 py-1 rounded-full border border-gray-600/30">
                          {formatFileSize(backup.size)}
                        </span>
                        <span className="text-sm text-gray-300">
                          {formatDate(backup.createdAt)}
                        </span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          backup.status === 'verified' ? 'text-green-400 bg-green-400/20 border border-green-400/30' :
                          backup.status === 'stored' ? 'text-blue-400 bg-blue-400/20 border border-blue-400/30' :
                          backup.status === 'error' ? 'text-red-400 bg-red-400/20 border border-red-400/30' :
                          'text-yellow-400 bg-yellow-400/20 border border-yellow-400/30'
                        }`}>
                          {getStatusText(backup.status)}
                        </span>
                      </div>
                      {backup.verification && (
                        <div className="mt-3 p-3 bg-gray-800/60 rounded-lg border border-gray-600/30">
                          <div className="text-xs text-gray-300 mb-1">Proof Hash</div>
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
                        className="inline-flex items-center px-4 py-2 bg-indigo-600/20 border border-indigo-500/50 text-sm font-medium rounded-lg text-indigo-300 hover:bg-indigo-600/30 hover:border-indigo-400/70 transition-all duration-300"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Verify
                      </button>
                    )}
                    
                    {backup.status === 'verified' && (
                      <button
                        onClick={() => onRecoverBackup(backup.id)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-sm font-medium rounded-lg text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
