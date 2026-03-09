import { execa } from "execa";
import { Options } from "../types";
import path from "path";
import fs from "fs";
import { SOLIDITY_FRAMEWORKS } from "../utils/consts";
import packageJson from "../../package.json";

const foundryLibraries = ["foundry-rs/forge-std", "OpenZeppelin/openzeppelin-contracts", "gnsps/solidity-bytes-utils"];
const createHbarVersion = packageJson.version;

export async function createFirstGitCommit(targetDir: string, options: Options) {
  try {
    await execa("git", ["add", "-A"], { cwd: targetDir });
    await execa("git", ["commit", "-m", `Initial commit with create-hbar @ ${createHbarVersion}`, "--no-verify"], {
      cwd: targetDir,
    });

    if (options.solidityFramework === SOLIDITY_FRAMEWORKS.FOUNDRY) {
      const foundryWorkSpacePath = path.resolve(targetDir, "packages", SOLIDITY_FRAMEWORKS.FOUNDRY);
      const libDir = path.join(foundryWorkSpacePath, "lib");

      // Remove any pre-existing lib directories copied from the template so that
      // `forge install` (which adds git submodules) doesn't fail with
      // "already exists and is not a valid git repo".
      if (fs.existsSync(libDir)) {
        await fs.promises.rm(libDir, { recursive: true, force: true });
        // Stage the removal so the initial commit doesn't reference the old files
        await execa("git", ["add", "-A"], { cwd: targetDir });
        await execa("git", ["commit", "--amend", "--no-edit", "--no-verify"], { cwd: targetDir });
      }

      // forge install foundry libraries as git submodules
      await execa("forge", ["install", ...foundryLibraries], { cwd: foundryWorkSpacePath });
      await execa("git", ["add", "-A"], { cwd: targetDir });
      await execa("git", ["commit", "--amend", "--no-edit"], { cwd: targetDir });
    }
  } catch (e: any) {
    // cast error as ExecaError to get stderr
    throw new Error("Failed to initialize git repository", {
      cause: e?.stderr ?? e,
    });
  }
}
