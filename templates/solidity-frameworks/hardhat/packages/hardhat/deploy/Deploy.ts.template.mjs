import { withDefaults } from "../../../../../../utils.js";

const defaultDeploymentsLogic = `
  await deploy("HederaToken", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  await deploy("HtsTokenCreator", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const creator = await get("HtsTokenCreator");
  if (creator?.address) {
    const signer = await hre.ethers.getSigner(deployer);
    const contract = await hre.ethers.getContractAt("HtsTokenCreator", creator.address, signer);
    const name = "HTS Token";
    const symbol = "HTST";
    const initialSupply = hre.ethers.parseUnits("10000", 6);
    const decimals = 6;
    const hbarValue = 100_000_000n;
    const tokenAddress = await contract.createToken(name, symbol, initialSupply, decimals, { value: hbarValue });
    console.log("Created HTS token:", tokenAddress);
  }
`;

const content = ({ preContent, deploymentsLogic }) => `import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
${preContent[0] ? preContent[0] + "\n" : ""}

/**
 * Single deploy script that runs all deployment steps in order.
 * Other demo templates can inject different deployments via deploymentsLogic.
 */
const deployAll: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  ${(deploymentsLogic[0] || defaultDeploymentsLogic).trim()}
};

deployAll.tags = ["HederaToken", "HtsTokenCreator", "HtsToken"];
export default deployAll;
`;

export default withDefaults(content, {
  preContent: "",
  deploymentsLogic: defaultDeploymentsLogic,
});
