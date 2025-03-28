require('dotenv').config();
require('web-streams-polyfill');

console.log("Environment variables loaded:");
console.log("MNEMONIC exists:", !!process.env.MNEMONIC);
console.log("ALCHEMY_API_KEY exists:", !!process.env.ALCHEMY_API_KEY);
console.log("ETHERSCAN_API_KEY exists:", !!process.env.ETHERSCAN_API_KEY);

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    sepolia: {
      provider: () => {
        if (!process.env.MNEMONIC || !process.env.ALCHEMY_API_KEY) {
          throw new Error("MNEMONIC or ALCHEMY_API_KEY not set in .env file");
        }
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        });
      },
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_testnet: {
      provider: () => {
        if (!process.env.MNEMONIC) {
          throw new Error("MNEMONIC not set in .env file");
        }
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`
        });
      },
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    ethereum: {
      provider: () => {
        if (!process.env.MNEMONIC || !process.env.INFURA_API_KEY) {
          throw new Error("MNEMONIC or INFURA_API_KEY not set in .env file");
        }
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        });
      },
      network_id: 1,
      gas: 5500000,
      gasPrice: 20000000000,  // 20 gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => {
        if (!process.env.MNEMONIC) {
          throw new Error("MNEMONIC not set in .env file");
        }
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: `https://bsc-dataseed1.binance.org`
        });
      },
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        viaIR: true  // Added viaIR option to fix stack too deep errors
      }
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY,
    bscscan: process.env.BSCSCAN_API_KEY
  }
};