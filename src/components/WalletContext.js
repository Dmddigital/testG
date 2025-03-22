import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Create wallet context
const WalletContext = createContext({});

// Token ABI - minimal for just reading balance
const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

// AURA token address - replace with your actual token address when deploying
const AURA_TOKEN_ADDRESS = "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa";

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signer = provider.getSigner();
            const network = await provider.getNetwork();
            
            setWalletAddress(accounts[0]);
            setChainId(network.chainId);
            setConnected(true);
            setProvider(provider);
            setSigner(signer);
            
            // Fetch token balance
            fetchTokenBalance(provider, accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    
    checkConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);
  
  // Fetch token balance
  const fetchTokenBalance = async (provider, address) => {
    try {
      const tokenContract = new ethers.Contract(
        AURA_TOKEN_ADDRESS,
        TOKEN_ABI,
        provider
      );
      
      const balance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();
      
      // Format with correct decimals
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);
      setTokenBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setTokenBalance('0');
    }
  };
  
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      setConnected(false);
      setWalletAddress('');
      setTokenBalance('0');
      setProvider(null);
      setSigner(null);
    } else {
      // User switched accounts
      setWalletAddress(accounts[0]);
      if (provider) {
        const signer = provider.getSigner();
        setSigner(signer);
        fetchTokenBalance(provider, accounts[0]);
      }
    }
  };
  
  const handleChainChanged = (_chainId) => {
    // Handle chain change by updating network info and refreshing page
    window.location.reload();
  };
  
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature!");
      return false;
    }
    
    setIsLoading(true);
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const accounts = await provider.listAccounts();
      
      setWalletAddress(accounts[0]);
      setChainId(network.chainId);
      setConnected(true);
      setProvider(provider);
      setSigner(signer);
      
      // Fetch token balance
      fetchTokenBalance(provider, accounts[0]);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Function to truncate wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Create a value object with all the context data
  const value = {
    connected,
    walletAddress,
    formatAddress,
    tokenBalance,
    provider,
    signer,
    chainId,
    isLoading,
    connectWallet,
    fetchTokenBalance
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};