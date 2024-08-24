import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

const WalletConnect = ({ onConnect }) => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            try {
                const accounts = await provider.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                onConnect(provider, accounts[0]);
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            console.error('MetaMask not detected');
        }
    };

    return (
        <div className='bg-white p-6 rounded-lg  max-w-sm mx-auto text-center'>
            {account ? (
                <p className='text-lg font-semibold text-gray-800'>
                    Connected as: <span className='text-blue-500'>{account}</span>
                </p>
            ) : (
                <button
                    onClick={connectWallet}
                    className='bg-gradient-to-r from-blue-500 to-teal-500 text-white p-3 rounded-lg font-semibold hover:from-teal-500 hover:to-blue-500 transition-colors'
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnect;
