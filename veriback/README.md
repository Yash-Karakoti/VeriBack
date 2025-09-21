# VeriBack - Verifiable Backups as a Service

A comprehensive solution that enables SaaS companies to provide cryptographically verifiable data backups using Filecoin's Onchain Cloud infrastructure.

## 🚀 Overview

VeriBack addresses the critical trust gap in SaaS data protection by providing mathematically verifiable proof of backup integrity. Our solution transforms standard backup processes into auditable trust features that enhance enterprise sales and compliance capabilities.

## 🎯 The Problem

Modern SaaS applications require users to blindly trust that their data is being properly backed up. Businesses currently have no way to independently verify:
- Whether backups actually exist
- If backup data remains untampered with over time
- If they can actually recover data when needed

## 💡 Our Solution

VeriBack provides a white label SDK that SaaS companies can integrate to offer verifiable backups:

1. **Client-Side Encryption**: Data encrypted before leaving the user's device
2. **Filecoin Warm Storage**: Verifiable storage with continuous Proof of Data Possession
3. **Cryptographic Verification**: PDP proofs ensure data integrity
4. **Fast Recovery**: CDN accelerated retrieval via FilCDN

## 🛠 Technology Stack

### Core Filecoin Onchain Cloud Integration
- **Synapse SDK**: Primary interface for all storage and retrieval operations
- **Filecoin Warm Storage**: Verifiable storage with continuous Proof of Data Possession
- **Filecoin Pay**: Automated payment processing for storage costs and subscriptions
- **FilCDN**: High-performance content delivery network for recovery scenarios

### Development Stack
- **React + TypeScript**: Modern frontend framework
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful icon library
- **Local Storage**: Metadata persistence (demo mode)

## ✨ Key Features

- **🔐 Cryptographic Proofs**: Leverage Filecoin's Proof of Data Possession to verify backup integrity
- **🛡️ End-to-End Encryption**: Data encrypted client side before storage
- **💳 Automated Payments**: Seamless billing through Filecoin Pay contracts
- **⚡ Fast Recovery**: CDN accelerated retrieval via FilCDN
- **👨‍💻 Developer-Friendly**: Simple SDK with comprehensive documentation and examples

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- Modern web browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/Yash-Karakoti/veriback.git
cd veriback

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Upload Files**: Drag and drop files to create verifiable backups
2. **Verify Integrity**: Click "Verify" to check backup integrity using PDP proofs
3. **Recover Data**: Download your files with cryptographic verification
4. **Monitor Status**: View real-time backup status and verification results

## 🏗 Architecture

### Core Components

1. **VeriBackService**: Main service class handling all backup operations
2. **Dashboard**: Main interface showing backup status and controls
3. **BackupUpload**: File upload component with drag-and-drop support
4. **VerificationPanel**: Real-time verification status and proof display

### Data Flow

```
User File → Client Encryption → Filecoin Warm Storage → PDP Verification → FilCDN Recovery
```

## 🔧 Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── BackupUpload.tsx
│   └── VerificationPanel.tsx
├── services/           # Business logic
│   └── VeriBackService.ts
├── types/              # TypeScript definitions
│   └── BackupItem.ts
├── App.tsx             # Main application
├── main.tsx           # Application entry point
└── style.css         # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Demo Features

The current implementation includes:

- ✅ **File Upload**: Drag-and-drop file upload with size validation
- ✅ **Encryption Simulation**: Client-side encryption demonstration
- ✅ **Storage Simulation**: Mock Filecoin Warm Storage integration
- ✅ **Verification**: PDP proof verification simulation
- ✅ **Recovery**: File download with integrity verification
- ✅ **Real-time Status**: Live backup status updates
- ✅ **Responsive Design**: Mobile-friendly interface

## 🔮 Production Integration

To integrate with the actual Filecoin Onchain Cloud:

1. **Install Synapse SDK**: `npm install @filoz/synapse-sdk`
2. **Configure Network**: Set up Filecoin testnet/mainnet connection
3. **Initialize Services**: Configure Warm Storage, Filecoin Pay, and FilCDN
4. **Replace Mock Functions**: Implement real SDK calls in VeriBackService
5. **Add Authentication**: Integrate wallet connection and user management

## 📚 API Reference

### VeriBackService

```typescript
// Initialize the service
const service = new VeriBackService()
await service.initialize()

// Create a backup
const backup = await service.createBackup(file)

// Verify backup integrity
const verification = await service.verifyBackup(backupId)

// Recover backup data
const data = await service.recoverBackup(backupId)
```

### BackupItem Interface

```typescript
interface BackupItem {
  id: string
  name: string
  size: number
  createdAt: Date
  status: 'uploading' | 'stored' | 'verifying' | 'verified' | 'error'
  verification?: VerificationResult
  pieceCid?: string
  dataSetId?: string
  encrypted: boolean
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Design Document**: [View Design Doc](https://drive.google.com/file/d/1bX3nGp7Tv2p8NK9ngmZluvMWrp-bpwqo/view?usp=sharing)
- **Notion Workspace**: [VeriBack Notion Guide](https://ajar-parsley-c2e.notion.site/VeriBack-Verifiable-Backups-as-a-Service-589e209a61e843488d17d3890b82718d)
- **Filecoin Documentation**: [filcdn.com/docs](https://filcdn.com/docs)

## 🙏 Acknowledgments

- **Filecoin Foundation** for the Onchain Cloud initiative
- **FilOzone** for the Synapse SDK and related tools
- **Filecoin Community** for the decentralized storage infrastructure

---

**VeriBack** - Transforming trust in data backups through cryptographic verification.
