import {ethers} from 'ethers'

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const TokenAddress = "0xYourTokenAddress"; // Replace with your ERC20 token address
    const Coinflip = await ethers.getContractFactory("Coinflip");
    const coinflip = await Coinflip.deploy(TokenAddress);

    console.log("Coinflip contract deployed to:", coinflip.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
