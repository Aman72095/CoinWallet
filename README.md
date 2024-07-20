# TipJar Dapp

## Description

The TipJar contract is a simple Ethereum smart contract that allows users to send tips along with their names and messages. All the interactions with the smart contract can be made using the front-end of the project.

## Getting Started

### Installation
To use this project, you'll need to have Node.js and Hardhat installed.

1. Clone the repository:
   git clone `repository url`
   
   cd tipjar
   
3. Install dependencies:
    npm install

### Usage
Deploying the Contract
1. Install the dependencies:

   `npm install`
  
2. Open two additional terminals in your VS Code.

3. In the second terminal, start the Hardhat local blockchain:

    `npx hardhat node`

4. In the third terminal, deploy the contract to the local blockchain:

    `npx hardhat run --network localhost scripts/deploy.js`

5. In the first terminal, start the front-end application:

     `npm run dev`
   
6.  After this, the project will be running on your localhost, typically at `http://localhost:3000/.`

### Interacting with Front-end

* You just need to press the connect button and do note that your metamask should be on the same network as hardhat RPC-URL.
* After this your metamask will ask you to confirm the connection.
* When successfully connected we will be able to tip by insert the values from the live smart contract on blockchain.

## Contact
For any questions or suggestions, feel free to open an issue or contact the repository owner.

Mail - vermashiv1910@gmail.com 

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
