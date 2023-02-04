import hre, { ethers } from "hardhat";

export async function verify(args: any) {
  await hre.run("compile");

  await hre.run("verify:verify", {
    address: args.contractAddress,
  });
}
