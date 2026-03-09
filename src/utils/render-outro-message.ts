import type { Options } from "../types";
import chalk from "chalk";
import { SOLIDITY_FRAMEWORKS } from "./consts";

export function renderOutroMessage(options: Options) {
  let message = `
  \n
  ${chalk.bold.green("Congratulations!")} Your project has been scaffolded! 🎉

  ${chalk.bold("Next steps:")}
  
  ${chalk.dim("cd")} ${options.project}
  `;

  if (!options.install) {
    message += `
    \t${chalk.bold("Install dependencies & format files")}
    \t${chalk.dim("yarn")} install && ${chalk.dim("yarn")} format
    `;
  }

  if (
    options.solidityFramework === SOLIDITY_FRAMEWORKS.HARDHAT ||
    options.solidityFramework === SOLIDITY_FRAMEWORKS.FOUNDRY
  ) {
    message += `
    \t${chalk.bold("Run locally:")}
    \t  1. Start the local chain: ${chalk.dim("yarn")} chain
    \t  2. In another terminal, deploy to the local node: ${chalk.dim("yarn")} deploy --network localhost
    \t  3. Run contract tests (with the chain running): ${chalk.dim("yarn")} test
    \t  4. Start the frontend: ${chalk.dim("yarn")} start
    `;

    const deployTestnet =
      options.solidityFramework === SOLIDITY_FRAMEWORKS.HARDHAT
        ? "yarn deploy --network hederaTestnet"
        : "yarn deploy --network hedera_testnet";
    message += `
    \t${chalk.bold("Deploy to Hedera testnet:")}
    \t  Set your deployer key (e.g. ${chalk.dim("yarn")} generate), then: ${chalk.dim(deployTestnet)}
    \t  After deploy, verify on Hashscan (no args needed): ${chalk.dim("yarn")} verify:testnet
    \t  For mainnet: ${chalk.dim("yarn")} verify:mainnet
    `;
  } else {
    message += `
    \t${chalk.bold("Start the frontend")}: ${chalk.dim("yarn")} start
    `;
  }

  message += `
  ${chalk.bold.green("Thanks for using Scaffold-HBAR 🙏, Happy Building!")}
  `;

  console.log(message);
}
