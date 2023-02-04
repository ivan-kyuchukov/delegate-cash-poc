// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IDelegationRegistry} from "./IDelegationRegistry.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseURI;
    address private delegationRegistryAddress;

    constructor(address _delegationRegistryAddress) ERC721("MyNFT", "MNFT") {
        delegationRegistryAddress = _delegationRegistryAddress;
    }

    function setMetadataBase(string memory _newBase) external {
        baseURI = _newBase;
    }

    function _mint(address _vault) public returns (uint256 newTokenId) {
        _tokenIds.increment();
        newTokenId = _tokenIds.current();

        address requester = msg.sender;

        if (_vault != address(0)) {
            bool isDelegateValid = IDelegationRegistry(
                delegationRegistryAddress
            ).checkDelegateForAll(msg.sender, _vault);
            require(isDelegateValid, "Invalid Delegate-Vault Pairing");
            requester = _vault;
        }

        _safeMint(requester, newTokenId);
        return newTokenId;
    }
}
