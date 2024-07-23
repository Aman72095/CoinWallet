# CoinWallet 

## Description

The CoinWallet contract is a simple Ethereum smart contract that allows users to send coins along with their names and messages. also it helps in finding out the last transaction details and address.

//Features//

 The application has the following features

* Connect to MetaMask wallet

* Display user's account address
* View user's account balance
* transfer ETH from it
* Last transaction Details like amount of the transaction
## Getting Started

### Setup/Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

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
   
 After this, the project will be running on your localhost. Typically at http://localhost:3000/



### Interacting with Front-end

* You can customize the UI elements, styles, and behavior of the Coin Wallet component according to your project's requirements. Modify the JSX structure, CSS styles, and event handlers to align with your application's design and functionality.
* You just need to press the connect button and do note that your metamask should be on the same network as hardhat RPC-URL.
* After this your metamask will ask you to confirm the connection.
* When successfully connected we will be able to send coin by insert the values from the live smart contract on blockchain.

## Author 

AMAN PATEL

//Video Walkthrough//
https://www.loom.com/share/716a324b999a43718cb3b413dc357054?sid=dd21bc35-760f-4b1d-8621-0978e7626650

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
