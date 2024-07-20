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

// Function to log details of tips
async function consoleTips(tips) {
  for (const tip of tips) {
    const timestamp = new Date(tip.timestamp * 1000).toLocaleString();
    const name = tip.name;
    const from = tip.from;
    const message = tip.message;
    console.log(
      `At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const TipJar = await hre.ethers.getContractFactory("TipJar");
  const contract = await TipJar.deploy();

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log("Before sending tips");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).sendTip("Amit", "Great tip!", amount);
  await contract.connect(from2).sendTip("Ravi", "Thanks for the info!", amount);
  await contract.connect(from3).sendTip("Ileana", "Keep it up!", amount);

  console.log("After sending tips");
  await consoleBalances(addresses);

  const tips = await contract.getTips();
  await consoleTips(tips);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


