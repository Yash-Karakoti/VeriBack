import React from 'react'
import { CheckCircle, AlertCircle, Download, Shield, Clock, FileText } from 'lucide-react'
import type { VerificationResult } from '../types/BackupItem'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  verification: VerificationResult
  downloadProgress: number
  isDownloading: boolean
  isComplete: boolean
  error?: string
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  fileName,
  verification,
  downloadProgress,
  isDownloading,
  isComplete,
  error
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="dark-card p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="dark-icon-container mb-4">
              {isComplete ? (
                <CheckCircle className="h-12 w-12 text-green-400" />
              ) : error ? (
                <AlertCircle className="h-12 w-12 text-red-400" />
              ) : (
                <Download className="h-12 w-12 text-indigo-400" />
              )}
            </div>
            <h3 className="text-2xl font-bold dark-text-primary mb-2">
              {isComplete ? 'Download Complete' : error ? 'Download Failed' : 'Downloading Backup'}
            </h3>
            <p className="dark-text-secondary text-sm">{fileName}</p>
          </div>

          {/* Progress Bar */}
          {isDownloading && (
            <div className="mb-6">
              <div className="flex justify-between text-sm dark-text-muted mb-2">
                <span>Downloading...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Verification Details */}
          {verification && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold dark-text-primary mb-4">Cryptographic Verification</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-sm font-medium dark-text-primary">Proof of Data Possession</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-sm text-green-400">Valid</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-sm font-medium dark-text-primary">Data Integrity</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-blue-400">Verified</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-800/60 rounded-lg">
                  <div className="text-xs dark-text-muted mb-1">Proof Hash</div>
                  <div className="text-sm font-mono text-indigo-300 break-all">
                    {verification.proofHash}
                  </div>
                </div>

                <div className="p-3 bg-gray-800/60 rounded-lg">
                  <div className="text-xs dark-text-muted mb-1">Storage Provider</div>
                  <div className="text-sm dark-text-secondary">
                    {verification.provider}
                  </div>
                </div>

                <div className="p-3 bg-gray-800/60 rounded-lg">
                  <div className="text-xs dark-text-muted mb-1">Verification Timestamp</div>
                  <div className="text-sm dark-text-secondary">
                    {verification.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                <span className="text-sm text-red-400">{error}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {isComplete && (
              <button
                onClick={onClose}
                className="dark-button flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Close
              </button>
            )}
            
            {error && (
              <button
                onClick={onClose}
                className="dark-button flex-1"
              >
                Try Again
              </button>
            )}
            
            {!isComplete && !error && (
              <button
                onClick={onClose}
                className="dark-button flex-1"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

