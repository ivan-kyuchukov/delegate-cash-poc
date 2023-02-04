import hre, { ethers } from "hardhat";

export async function callNFT() {
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

  const nftAddress = "0xBC614264bbac3fAF6b63400D20F30cE963ae7b05";

  const nft = await ethers.getContractAt("MyNFT", nftAddress);
  const tx = await nft
    .connect(hotWallet)
    ._mint(coldWallet.address, { gasLimit: 100000 });
  tx.wait(10);

  console.log(
    "Cold Wallet NFT Balance: ",
    await nft.balanceOf(coldWallet.address)
  );
}
