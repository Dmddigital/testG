// ERC-404 Contract Debugging Plan
// Contract: 0x72edb94D7dF42c73a5CaED553e4B587A5d0F12dF (Sepolia)

// 1. Check Token Balances and NFT Ownership
const checkBalances = async (contract, address) => {
    // Get token balance
    const tokenBalance = await contract.balanceOf(address);
    console.log(`Token Balance: ${tokenBalance / 10**18} AURA`);
    
    // Get NFT balance
    const nftBalance = await contract.balanceOfNFT(address);
    console.log(`NFT Balance: ${nftBalance} NFTs`);
    
    // Check total NFTs
    const totalNFTs = await contract.totalNFTs();
    console.log(`Total NFTs Minted: ${totalNFTs}`);
    
    // Check if NFTs were properly minted
    if (nftBalance > 0) {
      console.log("Checking individual NFT ownership...");
      // Try to find which NFTs the address owns
      for (let i = 1; i <= totalNFTs; i++) {
        try {
          const owner = await contract.ownerOf(i);
          if (owner.toLowerCase() === address.toLowerCase()) {
            console.log(`Address owns NFT #${i}`);
            
            // Check warrior details
            const warrior = await contract.warriors(i);
            console.log(`Warrior #${i} Power Level: ${warrior.powerLevel}`);
          }
        } catch (error) {
          console.log(`Error checking NFT #${i}: ${error.message}`);
        }
      }
    }
  };
  
  // 2. Debug Transfer Function
  const debugTransfer = async (contract, fromAddress, toAddress, amount) => {
    console.log("Debugging Transfer Function");
    try {
      // Calculate NFT counts before transfer
      const fromBalanceBefore = await contract.balanceOf(fromAddress);
      const fromNFTsBefore = await contract.balanceOfNFT(fromAddress);
      const toBalanceBefore = await contract.balanceOf(toAddress);
      const toNFTsBefore = await contract.balanceOfNFT(toAddress);
      
      console.log("Before Transfer:");
      console.log(`From: ${fromBalanceBefore / 10**18} AURA, ${fromNFTsBefore} NFTs`);
      console.log(`To: ${toBalanceBefore / 10**18} AURA, ${toNFTsBefore} NFTs`);
      
      // Calculate expected NFT transfers
      const fromNFTsAfter = Math.floor((fromBalanceBefore - amount) / 10**18);
      const toNFTsAfter = Math.floor((toBalanceBefore + amount) / 10**18);
      
      console.log("Expected After Transfer:");
      console.log(`From: ${(fromBalanceBefore - amount) / 10**18} AURA, ${fromNFTsAfter} NFTs`);
      console.log(`To: ${(toBalanceBefore + amount) / 10**18} AURA, ${toNFTsAfter} NFTs`);
      
      // Check if NFTs need to be transferred
      const nftTransferNeeded = (fromNFTsBefore > fromNFTsAfter) || (toNFTsAfter > toNFTsBefore);
      console.log(`NFT Transfer Needed: ${nftTransferNeeded}`);
      
      if (nftTransferNeeded) {
        console.log("This transfer would require NFT transfers, which might be causing issues");
      }
    } catch (error) {
      console.log(`Debug Error: ${error.message}`);
    }
  };
  
  // 3. Check For Inconsistencies
  const checkInconsistencies = async (contract, address) => {
    console.log("Checking for Inconsistencies");
    try {
      const tokenBalance = await contract.balanceOf(address);
      const nftBalance = await contract.balanceOfNFT(address);
      const expectedNFTs = Math.floor(tokenBalance / 10**18);
      
      console.log(`Token Balance: ${tokenBalance / 10**18} AURA`);
      console.log(`Actual NFT Balance: ${nftBalance}`);
      console.log(`Expected NFT Balance: ${expectedNFTs}`);
      
      if (nftBalance !== expectedNFTs) {
        console.log("INCONSISTENCY DETECTED: Token balance and NFT count don't match!");
      } else {
        console.log("Token balance and NFT count are consistent.");
      }
    } catch (error) {
      console.log(`Check Error: ${error.message}`);
    }
  };
  
  // 4. Test Small Transfer
  const testSmallTransfer = async (contract, fromAddress, toAddress) => {
    console.log("Testing small transfer (less than 1 whole token)");
    try {
      // Transfer 0.1 tokens
      const smallAmount = web3.utils.toWei('0.1', 'ether');
      
      // Check balances before
      const fromBalanceBefore = await contract.balanceOf(fromAddress);
      const toBalanceBefore = await contract.balanceOf(toAddress);
      
      console.log("Before Transfer:");
      console.log(`From: ${fromBalanceBefore / 10**18} AURA`);
      console.log(`To: ${toBalanceBefore / 10**18} AURA`);
      
      // Estimate gas
      const gasEstimate = await contract.transfer.estimateGas(toAddress, smallAmount, {from: fromAddress});
      console.log(`Estimated Gas: ${gasEstimate}`);
      
      // This transfer should succeed since it's a fractional token (no NFT transfer)
      const result = await contract.transfer(toAddress, smallAmount, {
        from: fromAddress,
        gas: gasEstimate * 2 // Double the estimated gas
      });
      
      console.log("Small Transfer Successful!");
      console.log(`Transaction hash: ${result.tx}`);
    } catch (error) {
      console.log(`Transfer Error: ${error.message}`);
    }
  };
  
  // 5. Check _burnNextNFT Logic
  const checkBurnLogic = async (contract, address) => {
    console.log("Analyzing NFT burn logic");
    try {
      const totalNFTs = await contract.totalNFTs();
      console.log(`Total NFTs: ${totalNFTs}`);
      
      // Check the highest tokenId owned by the address
      let highestTokenId = 0;
      for (let i = totalNFTs; i > 0; i--) {
        try {
          const owner = await contract.ownerOf(i);
          if (owner.toLowerCase() === address.toLowerCase()) {
            highestTokenId = i;
            break;
          }
        } catch (error) {
          // Skip if not found
        }
      }
      
      console.log(`Highest TokenId owned: ${highestTokenId}`);
      
      if (highestTokenId === 0) {
        console.log("No NFTs found for this address, burn logic could be failing");
      }
    } catch (error) {
      console.log(`Burn Logic Check Error: ${error.message}`);
    }
  };
  
  // Run the debugging plan
  const runDebug = async (contractAddress, walletAddress, recipientAddress) => {
    const WarriorERC404 = artifacts.require("WarriorERC404");
    const contract = await WarriorERC404.at(contractAddress);
    
    console.log("===== STARTING ERC-404 DEBUGGING =====");
    
    // Step 1: Check balances
    console.log("\n----- CHECKING BALANCES -----");
    await checkBalances(contract, walletAddress);
    
    // Step 2: Debug transfer function
    console.log("\n----- DEBUGGING TRANSFER FUNCTION -----");
    const transferAmount = web3.utils.toWei('1', 'ether'); // 1 token
    await debugTransfer(contract, walletAddress, recipientAddress, transferAmount);
    
    // Step 3: Check for inconsistencies
    console.log("\n----- CHECKING FOR INCONSISTENCIES -----");
    await checkInconsistencies(contract, walletAddress);
    
    // Step 4: Test small transfer
    console.log("\n----- TESTING SMALL TRANSFER -----");
    await testSmallTransfer(contract, walletAddress, recipientAddress);
    
    // Step 5: Check burn logic
    console.log("\n----- CHECKING BURN LOGIC -----");
    await checkBurnLogic(contract, walletAddress);
    
    console.log("\n===== DEBUGGING COMPLETE =====");
  };
  
  // Example usage (to be run with truffle exec):
  // runDebug(
  //   "0x72edb94D7dF42c73a5CaED553e4B587A5d0F12dF", // Contract address
  //   "0xae5Ca0823107081341cC7aEC9C41BFD1667fBed2", // Your wallet address
  //   "0x..." // Recipient address for testing
  // );
  
  module.exports = async function(callback) {
    try {
      // Fill in a recipient address here
      const recipientAddress = "0xEbcA11a0c0e1C158CCD9a9ca59509d3F47D33655"; 
      
      await runDebug(
        "0xEbcA11a0c0e1C158CCD9a9ca59509d3F47D33655",
        "0xae5Ca0823107081341cC7aEC9C41BFD1667fBed2",
        recipientAddress
      );
      callback();
    } catch (error) {
      console.error(error);
      callback(error);
    }
  };