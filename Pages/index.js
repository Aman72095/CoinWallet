import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Coin_Wallet_Abi from "../artifacts/contracts/CoinWallet.sol/CoinWallet.json";

export default function Homepage() {
    const [defaultAccount, setDefaultAccount] = useState(undefined);
    const [ethWallet, setEthWallet] = useState(undefined);
    const [CoinWalletContract, setCoinWalletContract] = useState(undefined);
    const [coins, setCoins] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");

    const contractAddress = ""; // Replace with your deployed contract address
    const abi = Coin_Wallet_Abi.abi;

    const getCoins = async () => {
        try {
            if (coinwalletContract) {
                const coinsArray = await CoinWalletContract.getcoins();
                setCoins(CoinsArray);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    const sendCoins = async () => {
        try {
            if (CoinWalletContract && amount) {
                const tx = await CoinWalletContract.sendCoin(name, message, { value: ethers.utils.parseEther(amount) });
                await tx.wait();
                getCoins();
                setName("");
                setMessage("");
                setAmount("");
            }
        } catch (error) {
            console.error("Error sending coin:", error);
        }
    };

    const connectWalletHandler = async () => {
        try {
            if (!ethWallet) {
                alert("MetaMask Wallet is required to Connect");
                return;
            }

            const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
            accountHandler(accounts);
            getContract();
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const getContract = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethWallet);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            setCoinWalletContract(contract);
        } catch (error) {
            console.error("Error getting contract:", error);
        }
    };

    const accountHandler = async (accounts) => {
        if (accounts.length > 0) {
            setDefaultAccount(accounts[0]);
        } else {
            setDefaultAccount(undefined);
        }
    };

    const getWallet = async () => {
        if (window.ethereum) {
            setEthWallet(window.ethereum);
        }
    };

    useEffect(() => {
        const init = async () => {
            getWallet();
        };
        init();
    }, []);

    useEffect(() => {
        const initContract = async () => {
            if (ethWallet) {
                getContract();
            }
        };
        initContract();
    }, [ethWallet]);

    useEffect(() => {
        const initCoins = async () => {
            if (CoinWalletContract) {
                getCoins();
            }
        };
        initCoins();
    }, [CoinWalletContract]);

    return (
        <main className="container">
            <header><h1>Welcome to the Coin Wallet</h1></header>
            {ethWallet && !defaultAccount && (
                <button onClick={connectWalletHandler}>Connect Wallet</button>
            )}
            {ethWallet && defaultAccount && (
                <div>
                    <h3>Your Account: {defaultAccount}</h3>
                    <div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" />
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
                        <button onClick={sendCoins}>Send Coin</button>
                    </div>
                    <h3>Coins:</h3>
                    {coins.length > 0 ? (
                        coins.map((coin, index) => (
                            <div key={index}>
                                <p><strong>Name:</strong> {coin.name}</p>
                                <p><strong>Message:</strong> {coin.message}</p>
                                <p><strong>From:</strong> {coin.from}</p>
                                <p><strong>Timestamp:</strong> {new Date(tip.timestamp * 1000).toLocaleString()}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No coins yet.</p>
                    )}
                </div>
            )}
            <style jsx>{`
               .container {
          background-color: #4158D0;
          background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
          ;
          text-align:center;
          position:absolute;
          height:100%;
          width:100%;
        }
                }
                input {
                    margin: 10px;
                    padding: 10px;
                }
                button {
                    padding: 10px 20px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #4158D0;
                }
            `}</style>
        </main>
    );
}
