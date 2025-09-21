import React from 'react'
import { Database, Zap } from 'lucide-react'
import { VeriBackLogo } from './VeriBackLogo'

interface HeaderProps {
  isConnected: boolean
}

export const Header: React.FC<HeaderProps> = ({ isConnected }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-3">
                <VeriBackLogo className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">VeriBack</h1>
              <p className="text-indigo-100 text-sm">Verifiable Backups as a Service</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-white text-sm font-medium">
                  {isConnected ? 'System Online' : 'System Offline'}
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-white/80">
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
