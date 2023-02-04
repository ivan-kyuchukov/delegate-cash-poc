# Delegate.cash POC

This project demonstrates a basic Delegate.cash use case. A cold wallet gives permissions to hot wallet to execute transactions.
This happens through the delegate.cash website, use your hot wallet to delegate to your cold wallet address.

Run following tasks:

```shell
npx hardhat deploy-contracts

npx hardhat verify {NFTAddress} {NFT constructor parameter (DelegationLegacy contract)} --network mumbai

npx hardhat call // should call mint NFT for the cold wallet (msg.sender = hot wallet)
// or you can execute through the polygonscan site
```
