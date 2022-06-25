// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
interface IBetToken {
  function airdrop (  ) external;
  function airdroprecord ( address ) external view returns ( bool );
  function balances ( address ) external view returns ( uint256 );
  function bet ( uint256 value, uint256 mod ) external;
  function checkWin ( address candidate ) external;
  function logger ( address ) external view returns ( uint256 );
  function seal ( address to, uint256 amount ) external;
  function transferTo ( address to, uint256 amount ) external pure;
}
