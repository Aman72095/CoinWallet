import { useState, useEffect } from "react";
import { ethers } from "ethers";
import tip_Jar_Abi from "../artifacts/contracts/TipJar.sol/TipJar.json";

export default function Homepage() {
    const [defaultAccount, setDefaultAccount] = useState(undefined);
    const [ethWallet, setEthWallet] = useState(undefined);
    const [tipJarContract, setTipJarContract] = useState(undefined);
    const [tips, setTips] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");

    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with your deployed contract address
    const abi = tip_Jar_Abi.abi;

    const getTips = async () => {
        try {
            if (tipJarContract) {
                const tipsArray = await tipJarContract.getTips();
                setTips(tipsArray);
            }
        } catch (error) {
            console.error("Error fetching tips:", error);
        }
    };

    const sendTip = async () => {
        try {
            if (tipJarContract && amount) {
                const tx = await tipJarContract.sendTip(name, message, { value: ethers.utils.parseEther(amount) });
                await tx.wait();
                getTips();
                setName("");
                setMessage("");
                setAmount("");
            }
        } catch (error) {
            console.error("Error sending tip:", error);
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
            setTipJarContract(contract);
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
        const initTips = async () => {
            if (tipJarContract) {
                getTips();
            }
        };
        initTips();
    }, [tipJarContract]);

    return (
        <main className="container">
            <header><h1>Welcome to the Tip Jar</h1></header>
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
                        <button onClick={sendTip}>Send Tip</button>
                    </div>
                    <h3>Tips:</h3>
                    {tips.length > 0 ? (
                        tips.map((tip, index) => (
                            <div key={index}>
                                <p><strong>Name:</strong> {tip.name}</p>
                                <p><strong>Message:</strong> {tip.message}</p>
                                <p><strong>From:</strong> {tip.from}</p>
                                <p><strong>Timestamp:</strong> {new Date(tip.timestamp * 1000).toLocaleString()}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No tips yet.</p>
                    )}
                </div>
            )}
            <style jsx>{`
                .container {
                    text-align: center;
                    padding: 20px;
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
                    background-color: #005bb5;
                }
            `}</style>
        </main>
    );
}
