require('web-streams-polyfill');
const WarriorERC404 = artifacts.require("WarriorERC404");

module.exports = async function(deployer, network, accounts) {
  console.log("Starting deployment of WarriorERC404...");
  
  // Deploy the main contract with the owner address
  await deployer.deploy(WarriorERC404, accounts[0]);
  const warriorContract = await WarriorERC404.deployed();
  
  console.log(`WarriorERC404 deployed to: ${warriorContract.address}`);
  
  // Set the data URI for NFT images
  const baseImageURI = process.env.BASE_IMAGE_URI || "https://warrior404.com/assets/";
  await warriorContract.setDataURI(baseImageURI);
  console.log(`Data URI set to: ${baseImageURI}`);
  
  // Whitelist the deployer to prevent gas issues with transfers
  await warriorContract.setWhitelist(accounts[0], true);
  console.log(`Deployer ${accounts[0]} whitelisted for gas optimization`);
  
  // If on testnet and we have test accounts set up
  if (network === 'development' || network === 'ganache' || network === 'sepolia' || network === 'bsc_testnet') {
    // If we want to send tokens to test accounts (optional)
    if (process.env.TEST_ACCOUNT_1) {
      const testAccount1 = process.env.TEST_ACCOUNT_1;
      
      // Important: Whitelist the recipient first to avoid gas issues!
      await warriorContract.setWhitelist(testAccount1, true);
      console.log(`Test account ${testAccount1} whitelisted`);
      
      const transferAmount = web3.utils.toWei('10', 'ether'); // 10 tokens
      await warriorContract.transfer(testAccount1, transferAmount, { from: accounts[0] });
      console.log(`Transferred 10 tokens to: ${testAccount1}`);
    }
    
    if (process.env.TEST_ACCOUNT_2) {
      const testAccount2 = process.env.TEST_ACCOUNT_2;
      
      // Important: Whitelist the recipient first to avoid gas issues!
      await warriorContract.setWhitelist(testAccount2, true);
      console.log(`Test account ${testAccount2} whitelisted`);
      
      const transferAmount = web3.utils.toWei('10', 'ether'); // 10 tokens
      await warriorContract.transfer(testAccount2, transferAmount, { from: accounts[0] });
      console.log(`Transferred 10 tokens to: ${testAccount2}`);
    }
  }
  
  console.log("Deployment and setup complete!");
};