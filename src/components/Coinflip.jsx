import React, { useState } from 'react';
import { ethers } from 'ethers';

const Coinflip = ({ provider, account }) => {
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [result, setResult] = useState(null);

  const CONTRACT_ADDRESS = '0xYourContractAddress';
  const ABI = [
    "function flipCoin(bool betOnHeads, uint256 amount) external",
  ];

  const flipCoin = async () => {
    if (!provider || !account) return;

    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    try {
      const amountInWei = ethers.utils.parseUnits(amount, 'ether');

      const tx = await contract.flipCoin(side === 'heads', amountInWei);
      await tx.wait();

      const randomSide = Math.random() > 0.5 ? 'heads' : 'tails';
      const win = side === randomSide;

      if (win) {
        alert(`You won! ${amount} tokens have been doubled.`);
      } else {
        alert('You lost! Better luck next time.');
      }
      setResult(randomSide);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={side} onChange={(e) => setSide(e.target.value)}>
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select>
      <button onClick={flipCoin}>Flip Coin</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default Coinflip;
