import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const lazyImport = async (module: any) => {
  return await import(module);
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

task("deploy-contracts", "Deploys contracts").setAction(async () => {
  const { deployContracts } = await lazyImport("./scripts/deploy");
  await deployContracts();
});

export default config;
