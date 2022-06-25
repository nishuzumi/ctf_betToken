import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deploy} = hre.deployments
    const [owner] = await hre.ethers.getUnnamedSigners()
    await deploy('BetToken',{
        from: owner.address,
    })
};
export default func;