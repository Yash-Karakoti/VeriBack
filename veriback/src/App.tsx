import React, { useState, useEffect } from 'react'
import { Shield, Database, Zap, CheckCircle, AlertCircle, Clock, Upload, Download } from 'lucide-react'
import { VeriBackService } from './services/VeriBackService'
import type { BackupItem } from './types/BackupItem'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { BackupUpload } from './components/BackupUpload'
import { VerificationPanel } from './components/VerificationPanel'


function App() {
  const [backups, setBackups] = useState<BackupItem[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [veriBackService, setVeriBackService] = useState<VeriBackService | null>(null)

  useEffect(() => {
    initializeVeriBack()
  }, [])

  const initializeVeriBack = async () => {
    try {
      setLoading(true)
      const service = new VeriBackService()
      await service.initialize()
      setVeriBackService(service)
      setIsConnected(true)
      
      // Load existing backups
      const existingBackups = await service.getBackups()
      setBackups(existingBackups)
    } catch (error) {
      console.error('Failed to initialize VeriBack:', error)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const handleBackupUpload = async (file: File) => {
    if (!veriBackService) return

    try {
      console.log('Starting backup upload for file:', file.name)
      const backupItem = await veriBackService.createBackup(file)
      console.log('Backup created successfully:', backupItem)
      setBackups(prev => [...prev, backupItem])
      console.log('Backup added to state')
    } catch (error) {
      console.error('Failed to create backup:', error)
    }
  }

  const handleVerifyBackup = async (backupId: string) => {
    if (!veriBackService) return

    console.log(`Starting verification for backup: ${backupId}`)

    // Set status to verifying first
    setBackups(prev => 
      prev.map(backup => 
        backup.id === backupId 
          ? { ...backup, status: 'verifying' }
          : backup
      )
    )

    try {
      console.log('Calling veriBackService.verifyBackup...')
      const verification = await veriBackService.verifyBackup(backupId)
      console.log('Verification result received:', verification)
      
      // Update with verification result and set status to verified
      setBackups(prev => 
        prev.map(backup => 
          backup.id === backupId 
            ? { 
                ...backup, 
                status: verification.isValid ? 'verified' : 'error',
                verification, 
                lastVerified: new Date() 
              }
            : backup
        )
      )
      
      console.log('Backup status updated to verified')
    } catch (error) {
      console.error('Failed to verify backup:', error)
      
      // Set status to error on failure
      setBackups(prev => 
        prev.map(backup => 
          backup.id === backupId 
            ? { ...backup, status: 'error' }
            : backup
        )
      )
    }
  }

  const handleRecoverBackup = async (backupId: string) => {
    if (!veriBackService) return

    try {
      const data = await veriBackService.recoverBackup(backupId)
      // Create download link
      const blob = new Blob([data])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `backup-${backupId}.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to recover backup:', error)
    }
  }

  const handleDownloadBackup = async (backupId: string) => {
    if (!veriBackService) return
    return await veriBackService.downloadBackup(backupId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)'}}>
        <div className="text-center">
          <div className="dark-icon-container">
            <Shield className="h-12 w-12 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold dark-text-primary mb-2">Initializing VeriBack</h2>
          <p className="dark-text-secondary">Setting up secure backup infrastructure...</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)'}}>
      <Header isConnected={isConnected} />
      
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="text-center py-16">
            <div className="dark-icon-container">
              <AlertCircle className="h-16 w-16 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold dark-text-primary mb-4">System Offline</h2>
            <p className="dark-text-secondary mb-8 max-w-md mx-auto">
              Unable to establish secure connection. Please check your network and try again.
            </p>
            <button 
              onClick={initializeVeriBack}
              className="dark-button px-8 py-4 text-lg"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Dashboard 
                backups={backups}
                onVerifyBackup={handleVerifyBackup}
                onRecoverBackup={handleRecoverBackup}
                onDownloadBackup={handleDownloadBackup}
              />
            </div>
            
            <div className="space-y-6">
              <BackupUpload onUpload={handleBackupUpload} />
              <VerificationPanel backups={backups} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
