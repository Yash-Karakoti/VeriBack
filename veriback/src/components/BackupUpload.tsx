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
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 hover-lift">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl"></div>
          <div className="relative bg-gray-800/60 rounded-full p-4 mx-auto w-fit border border-gray-600/30">
            <Shield className="h-10 w-10 text-indigo-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Create Verifiable Backup</h3>
        <p className="text-gray-200 mb-8 max-w-md mx-auto">
          Upload your data to create a cryptographically verifiable backup on the Filecoin network
        </p>
        
        <div
          className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-indigo-400 bg-indigo-500/20 scale-105'
              : 'border-gray-600/50 hover:border-gray-500/70 hover:bg-gray-800/40'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-lg"></div>
                <div className="relative bg-gray-800/60 rounded-full p-4 mx-auto w-fit border border-gray-600/30">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                </div>
              </div>
              <p className="text-lg font-medium text-white mb-2">Creating Verifiable Backup</p>
              <p className="text-gray-200">Encrypting and storing on Filecoin...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-lg"></div>
                <div className="relative bg-gray-800/60 rounded-full p-6 mx-auto w-fit border border-gray-600/30">
                  <Upload className="h-16 w-16 text-indigo-400" />
                </div>
              </div>
              <p className="text-lg font-medium text-white mb-3">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-gray-200 mb-6">
                Maximum file size: 100MB
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-indigo-600/20 border border-indigo-500/50 rounded-lg text-indigo-300 hover:bg-indigo-600/30 hover:border-indigo-400/70 transition-all duration-300">
                <Upload className="h-5 w-5 mr-2" />
                Choose File
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2 text-gray-200">
            <Shield className="h-4 w-4 text-green-400" />
            <span>End-to-end encrypted</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-200">
            <File className="h-4 w-4 text-blue-400" />
            <span>Stored on Filecoin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
