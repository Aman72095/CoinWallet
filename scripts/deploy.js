const hre = require("hardhat");

// Function to get the balance of an address in Ether
async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Function to log balances of multiple addresses
async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

// Function to log details of Coins
async function consoleCoins(coins) {
  for (const coin of coins) {
    const timestamp = new Date(coin.timestamp * 1000).toLocaleString();
    const name = coin.name;
    const from = coin.from;
    const message = coin.message;
    console.log(
      `At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const CoinWallet = await hre.ethers.getContractFactory("CoinWallet");
  const contract = await CoinWallet.deploy();

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log("Before sending coins");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).sendCoin("Amit", "Great coin!", amount);
  await contract.connect(from2).sendCoin("Ravi", "Thanks for the info!", amount);
  await contract.connect(from3).sendCoin("Ileana", "Keep it up!", amount);

  console.log("After sending coins");
  await consoleBalances(addresses);

  const coins = await contract.getCoins();
  await consoleCoins(coins);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



