import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import Coinflip from './components/Coinflip';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const handleConnect = (provider, account) => {
    setProvider(provider);
    setAccount(account);
  };

  return (
    <div className='bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 flex flex-col justify-center items-center min-h-screen p-6'>
      <h1 className='text-5xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
        Coinflip Game
      </h1>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-xl w-full'>
        <WalletConnect onConnect={handleConnect} />
        {provider && account && <Coinflip provider={provider} account={account} />}
      </div>
    </div>
  );
}

export default App;
