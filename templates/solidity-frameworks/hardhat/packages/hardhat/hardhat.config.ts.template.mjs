import { withDefaults, stringify, deepMerge } from "../../../../utils.js";

const defaultConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "$$hederaRpcUrl$$",
        // @ts-ignore - custom property for hedera-forking plugin
        chainId: 296,
        // @ts-ignore
        workerPort: 10001,
      },
    },
    hederaTestnet: {
      url: "https://testnet.hashio.io/api",
      accounts: ["$$deployerPrivateKey$$"],
      chainId: 296,
    },
    hedera_testnet: {
      url: "https://testnet.hashio.io/api",
      accounts: ["$$deployerPrivateKey$$"],
      chainId: 296,
    },
    hederaMainnet: {
      url: "https://mainnet.hashio.io/api",
      accounts: ["$$deployerPrivateKey$$"],
      chainId: 295,
    },
  },
  sourcify: {
    enabled: false,
  },
};

const contents = ({ preContent, configOverrides }) => {
  const finalConfig = deepMerge(defaultConfig, configOverrides[0] || {});

  return `import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@hashgraph/system-contracts-forking/plugin";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { task } from "hardhat/config";
import generateTsAbis from "./scripts/generateTsAbis";
${preContent[0] || ""}

// Hedera JSON-RPC URL (testnet default). Set HEDERA_RPC_URL in .env for mainnet.
const hederaRpcUrl = process.env.HEDERA_RPC_URL || "https://testnet.hashio.io/api";
// Deployer key: run \`yarn generate\` or \`yarn account:import\`, or set __RUNTIME_DEPLOYER_PRIVATE_KEY at runtime
const deployerPrivateKey =
  process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const config: HardhatUserConfig = ${stringify(finalConfig, {
  "solidity.compilers.array.settings.optimizer.runs":
    "https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options",
  "namedAccounts.deployer.default": "By default, it will take the first Hardhat account as the deployer",
  "networks.hardhat":
    "Fork Hedera testnet for local testing. Requires @hashgraph/system-contracts-forking plugin.",
})};

// Extend the deploy task
task("deploy").setAction(async (args, hre, runSuper) => {
  await runSuper(args);
  await generateTsAbis(hre);
});

export default config;`;
};

export default withDefaults(contents, {
  preContent: "",
  configOverrides: {},
});
