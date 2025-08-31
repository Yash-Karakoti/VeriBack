# VeriBack: Verifiable Backups as a Service

A comprehensive solution that enables SaaS companies to provide cryptographically verifiable data backups using Filecoin's Onchain Cloud infrastructure.

## Overview

VeriBack addresses the critical trust gap in SaaS data protection by providing mathematically verifiable proof of backup integrity. Our solution transforms standard backup processes into auditable trust features that enhance enterprise sales and compliance capabilities.

## The Problem

Modern SaaS applications require users to blindly trust that their data is being properly backed up. Businesses currently have no way to independently verify:
- Whether backups actually exist
- If backup data remains untampered with over time
- If they can actually recover data when needed

## Our Solution

VeriBack provides a white label SDK that SaaS companies can integrate to offer verifiable backups:
1. Automatically creates encrypted data snapshots
2. Stores them on Filecoin Warm Storage with continuous integrity proofs
3. Provides cryptographic verification of backup status through Proof of Data Possession
4. Enables fast recovery through CDN accelerated retrieval

## Technology Stack

### Core Filecoin Onchain Cloud Integration
- **Synapse SDK**: Primary interface for all storage and retrieval operations
- **Filecoin Warm Storage**: Verifiable storage with continuous Proof of Data Possession
- **Filecoin Pay**: Automated payment processing for storage costs and subscriptions
- **FilCDN**: High-performance content delivery network for recovery scenarios

### Development Stack
- TypeScript/Node.js for backend services and SDK
- React/Next.js for dashboard interfaces
- PostgreSQL for metadata and proof management
- Docker for containerized deployment

## Key Features

- **Cryptographic Proofs**: Leverage Filecoin's Proof of Data Possession to verify backup integrity
- **End-to-End Encryption**: Data encrypted client side before storage
- **Automated Payments**: Seamless billing through Filecoin Pay contracts
- **Fast Recovery**: CDN accelerated retrieval via FilCDN
- **Developer-Friendly**: Simple SDK with comprehensive documentation and examples

## Buildathon Roadmap

### Wave 1: Ideation Phase
- Problem validation and solution design
- Technical architecture specification
- Initial project documentation and Notion setup

### Wave 2: MVP Development
- Core SDK functionality implementation
- Basic storage and verification workflow
- CLI demonstration tool
- Integration with Filecoin Warm Storage

### Wave 3: Feature Integration
- Filecoin Pay integration for payment processing
- FilCDN integration for retrieval optimization
- Basic dashboard interface for proof verification
- Pilot testing with sample data

### Wave 4: Production Preparation
- Performance optimization and stress testing
- Security enhancements and audit preparation
- Comprehensive documentation completion
- Production deployment planning

### Product Design Docs
[Design Doc](https://drive.google.com/file/d/1bX3nGp7Tv2p8NK9ngmZluvMWrp-bpwqo/view?usp=sharing)

### Notion Page 
[Click Here for the Notion Guide](https://ajar-parsley-c2e.notion.site/VeriBack-Verifiable-Backups-as-a-Service-589e209a61e843488d17d3890b82718d)
## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- Filecoin wallet with testnet FIL
- Access to Filecoin Onchain Cloud services
- PostgreSQL database

### Installation
```bash
# Clone the repository
git clone https://github.com/Yash-Karakoti/veriback.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
