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
      <div className="dark-card p-6">
        <h3 className="text-xl font-bold dark-text-primary mb-6">Verification Status</h3>
        
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
        <div className="dark-card p-6">
          <h3 className="text-xl font-bold dark-text-primary mb-6">Recent Verifications</h3>
          
          <div className="space-y-4">
            {verifiedBackups.slice(0, 3).map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium dark-text-primary">{backup.name}</p>
                    <p className="text-xs dark-text-secondary">
                      Verified {backup.lastVerified ? formatDate(backup.lastVerified) : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-400 font-medium">PDP Valid</p>
                  {backup.verification && (
                    <p className="text-xs dark-text-muted font-mono">
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
      <div className="dark-card p-6">
        <h3 className="text-xl font-bold dark-text-primary mb-6">How VeriBack Works</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dark-workflow-card">
            <div className="dark-workflow-number">1</div>
            <p className="text-sm font-medium dark-text-primary mb-2">Client-Side Encryption</p>
            <p className="text-xs dark-text-secondary">Your data is encrypted before leaving your device</p>
          </div>
          
          <div className="dark-workflow-card">
            <div className="dark-workflow-number">2</div>
            <p className="text-sm font-medium dark-text-primary mb-2">Filecoin Warm Storage</p>
            <p className="text-xs dark-text-secondary">Encrypted data stored with continuous PDP proofs</p>
          </div>
          
          <div className="dark-workflow-card">
            <div className="dark-workflow-number">3</div>
            <p className="text-sm font-medium dark-text-primary mb-2">Cryptographic Verification</p>
            <p className="text-xs dark-text-secondary">Proof of Data Possession ensures integrity</p>
          </div>
          
          <div className="dark-workflow-card">
            <div className="dark-workflow-number">4</div>
            <p className="text-sm font-medium dark-text-primary mb-2">Fast Recovery</p>
            <p className="text-xs dark-text-secondary">FilCDN enables quick data retrieval</p>
          </div>
        </div>
      </div>
    </div>
  )
}
