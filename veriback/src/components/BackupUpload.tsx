import React, { useState, useRef } from 'react'
import { Upload, File, Shield, AlertCircle } from 'lucide-react'

interface BackupUploadProps {
  onUpload: (file: File) => void
}

export const BackupUpload: React.FC<BackupUploadProps> = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      alert('File size must be less than 100MB')
      return
    }
    
    setUploading(true)
    onUpload(file)
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  return (
    <div className="dark-card p-8">
      <div className="text-center">
        <div className="dark-icon-container">
          <Shield className="h-10 w-10 text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold dark-text-primary mb-3">Create Verifiable Backup</h3>
        <p className="dark-text-secondary mb-8 max-w-md mx-auto">
          Upload your data to create a cryptographically verifiable backup on the Filecoin network
        </p>
        
        <div
          className={`dark-upload-area ${isDragOver ? 'drag-over' : ''} ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="text-center">
              <div className="dark-icon-container">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
              </div>
              <p className="text-lg font-medium dark-text-primary mb-2">Creating Verifiable Backup</p>
              <p className="dark-text-secondary">Encrypting and storing on Filecoin...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="dark-icon-container">
                <Upload className="h-16 w-16 text-indigo-400" />
              </div>
              <p className="text-lg font-medium dark-text-primary mb-3">
                Drag and drop your file here, or click to browse
              </p>
              <p className="dark-text-secondary mb-6">
                Maximum file size: 100MB
              </p>
              <div className="dark-button">
                <Upload className="h-5 w-5 mr-2" />
                Choose File
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2 dark-text-secondary">
            <Shield className="h-4 w-4 text-green-400" />
            <span>End-to-end encrypted</span>
          </div>
          <div className="flex items-center justify-center space-x-2 dark-text-secondary">
            <File className="h-4 w-4 text-blue-400" />
            <span>Stored on Filecoin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
