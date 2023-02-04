import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const lazyImport = async (module: any) => {
  return await import(module);
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/v1/0b712a9edf00e2f68e4f4f826052e4b60d165037",
      chainId: 80001,
      accounts: [
        `0x${process.env.DEPLOYER}`,
        `0x${process.env.COLD_WALLET}`,
        `0x${process.env.HOT_WALLET}`,
      ],
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 1.5,
    },
  },
  etherscan: {
    apiKey: {
      mumbai: `${process.env.ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com/",
        },
      },
    ],
  },
};

task("deploy-contracts", "Deploys contracts").setAction(async () => {
  const { deployContracts } = await lazyImport("./scripts/deploy");
  await deployContracts();
});

task("verify-contract", "Verify a contract")
  .addParam("contractAddress", "Please provide the contract address")
  .setAction(async (taskArgs, hre, runSuper) => {
    const verify = require("./scripts/verify");
    await verify(taskArgs);
  });

task("call", "Call contracts").setAction(async () => {
  const { callNFT } = await lazyImport("./scripts/call");
  await callNFT();
});

export default config;
