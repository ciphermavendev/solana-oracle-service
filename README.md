# Solana Oracle Service

A decentralized oracle service built on the Solana blockchain that provides reliable price feed data.

## Features

- On-chain price data storage
- Real-time price updates
- Timestamp tracking for each update
- JavaScript client for easy integration
- Multiple price feed support
- Authority-based access control

## Prerequisites

- Node.js 14+ and npm/yarn
- Rust and Cargo
- Solana Tool Suite
- Anchor Framework

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solana-oracle.git
cd solana-oracle
```

2. Install dependencies:
```bash
# Install JavaScript dependencies
npm install

# Install Anchor dependencies
anchor build
```

3. Set up your Solana environment:
```bash
solana-keygen new
solana config set --url localhost
```

## Building

```bash
# Build the program
anchor build

# Get program ID
solana address -k target/deploy/solana_oracle-keypair.json

# Update program ID in lib.rs and Anchor.toml
```

## Deployment

1. Start local validator:
```bash
solana-test-validator
```

2. Deploy the program:
```bash
anchor deploy
```

## Usage

### Running the Oracle Client

```bash
node app/oracle-client.js
```

### Running the Price Feed Example

```bash
node app/price-feed-example.js
```

## Testing

```bash
anchor test
```

## Project Structure

```
solana-oracle/
├── programs/           # Solana program source code
│   └── solana-oracle/
│       └── src/
│           └── lib.rs
├── app/               # Client applications
│   ├── oracle-client.js
│   └── price-feed-example.js
├── tests/             # Test files
├── Anchor.toml        # Anchor configuration
└── package.json       # Node.js dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

This is experimental software. Use at your own risk.

For security concerns, please open an issue or contact the maintainers directly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.