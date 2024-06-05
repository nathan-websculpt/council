import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "John" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployJohn: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  // const owner = "0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350"; //PROD WALLET
  const owner = "0xf0ADAE0823444d70Eb5826F3C26b3704611c759A"; //todo change to fe wallet

  const council = ["0xf0ADAE0823444d70Eb5826F3C26b3704611c759A", "0xD60dB4d4aDaFa8cB8fFC48c49F9Cf17229AA72B9"];

  await deploy("John", {
    from: deployer,
    // Contract constructor arguments
    args: [owner, council],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const john = await hre.ethers.getContract<Contract>("John", deployer);
  console.log("👋 deployed at address:", await john.getAddress());
};

export default deployJohn;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags John
deployJohn.tags = ["John"];
