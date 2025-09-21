import React from 'react'
import { CheckCircle, AlertCircle, Clock, Shield, Database } from 'lucide-react'
import type { BackupItem } from '../types/BackupItem'

interface VerificationPanelProps {
  backups: BackupItem[]
}

export const VerificationPanel: React.FC<VerificationPanelProps> = ({ backups }) => {
  const verifiedBackups = backups.filter(backup => backup.status === 'verified')
  const pendingBackups = backups.filter(backup => backup.status === 'stored')
  const errorBackups = backups.filter(backup => backup.status === 'error')

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover-lift">
        <h3 className="text-xl font-bold text-white mb-6">Verification Status</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
              <span className="text-sm font-medium text-green-300">Verified Backups</span>
            </div>
            <span className="text-lg font-bold text-green-400">{verifiedBackups.length}</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-yellow-400 mr-3" />
              <span className="text-sm font-medium text-yellow-300">Pending Verification</span>
            </div>
            <span className="text-lg font-bold text-yellow-400">{pendingBackups.length}</span>
          </div>
          
          {errorBackups.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
                <span className="text-sm font-medium text-red-300">Errors</span>
              </div>
              <span className="text-lg font-bold text-red-400">{errorBackups.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Verifications */}
      {verifiedBackups.length > 0 && (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover-lift">
          <h3 className="text-xl font-bold text-white mb-6">Recent Verifications</h3>
          
          <div className="space-y-4">
            {verifiedBackups.slice(0, 3).map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-white">{backup.name}</p>
                    <p className="text-xs text-gray-200">
                      Verified {backup.lastVerified ? formatDate(backup.lastVerified) : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-400 font-medium">PDP Valid</p>
                  {backup.verification && (
                    <p className="text-xs text-gray-200 font-mono">
                      {backup.verification.proofHash.slice(0, 8)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 hover-lift">
        <h3 className="text-xl font-bold text-white mb-6">How VeriBack Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-indigo-300">1</span>
            </div>
            <p className="text-sm font-medium text-white mb-2">Client-Side Encryption</p>
            <p className="text-xs text-gray-200">Your data is encrypted before leaving your device</p>
          </div>
          
          <div className="text-center p-4 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-indigo-300">2</span>
            </div>
            <p className="text-sm font-medium text-white mb-2">Filecoin Warm Storage</p>
            <p className="text-xs text-gray-200">Encrypted data stored with continuous PDP proofs</p>
          </div>
          
          <div className="text-center p-4 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-indigo-300">3</span>
            </div>
            <p className="text-sm font-medium text-white mb-2">Cryptographic Verification</p>
            <p className="text-xs text-gray-200">Proof of Data Possession ensures integrity</p>
          </div>
          
          <div className="text-center p-4 bg-gray-800/60 rounded-xl border border-gray-600/30">
            <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-indigo-300">4</span>
            </div>
            <p className="text-sm font-medium text-white mb-2">Fast Recovery</p>
            <p className="text-xs text-gray-200">FilCDN enables quick data retrieval</p>
          </div>
        </div>
      </div>
    </div>
  )
}
