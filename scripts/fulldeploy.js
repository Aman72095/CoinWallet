const hre = require("hardhat");

async function main() {
  const CoinWalllet = await hre.ethers.getContractFactory("CoinWallet");
  const contract = await CoinWallet.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
