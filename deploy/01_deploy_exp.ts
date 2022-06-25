import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deploy} = hre.deployments
    const hacker = (await hre.ethers.getUnnamedSigners())[1]
    const betToken = await hre.deployments.get('BetToken')
    await deploy('Exp',{
        from: hacker.address,
        args: [betToken.address]
    })
};
export default func;