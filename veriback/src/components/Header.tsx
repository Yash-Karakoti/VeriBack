import React from 'react'
import { Database, Zap } from 'lucide-react'
import { VeriBackLogo } from './VeriBackLogo'

interface HeaderProps {
  isConnected: boolean
}

export const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <header className="dark-header">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="dark-icon-container">
              <VeriBackLogo className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark-text-primary">VeriBack</h1>
              <p className="dark-text-secondary text-sm">Verifiable Backups as a Service</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="dark-text-primary text-sm font-medium">
                  {isConnected ? 'System Online' : 'System Offline'}
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 dark-text-muted">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span className="text-sm">Warm Storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span className="text-sm">PDP Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
