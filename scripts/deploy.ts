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

  const DelegationRegistry = await hre.ethers.getContractFactory(
    "DelegationRegistry"
  );
  const delegationRegistry = await DelegationRegistry.deploy();
  await delegationRegistry.deployed();

  console.log(`DelegationRegistry deployed to ${delegationRegistry.address}`);

  // Cold delegates to hot using the delegation registry
  await delegationRegistry
    .connect(coldWallet)
    .delegateForAll(hotWallet.address, true);

  const NFT = await hre.ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy(delegationRegistry.address);
  await nft.deployed();

  console.log(`NFT deployed to ${nft.address}`);

  await nft.connect(hotWallet)._mint(coldWallet.address);
  await nft.connect(hotWallet)._mint(coldWallet.address);

  console.log(
    "Cold Wallet NFT Balance: ",
    await nft.balanceOf(coldWallet.address)
  );
}
