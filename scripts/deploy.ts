import hre, { ethers } from "hardhat";

export async function deployContracts() {
  await hre.run("compile");

  const [deployer, hotWallet, coldWallet] = await ethers.getSigners();
  console.log(
    "Deployer: ",
    deployer.address,
    "Hot Wallet Address: ",
    hotWallet.address,
    "Cold Wallet Address: ",
    coldWallet.address
  );

  const NFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy("0x00000000000076A84feF008CDAbe6409d2FE638B"); // DelegationRegistry contract
  await nft.deployed();

  console.log(`NFT deployed to ${nft.address}`);
}
