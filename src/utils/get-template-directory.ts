import { downloadTemplate } from "giget";
import fs from "fs";
import os from "os";
import path from "path";
import type { Options } from "../types";
import { DEFAULT_TEMPLATE_REPO } from "./consts";

export type TemplateDirectoryResult = {
  templateDir: string;
  /** Call after copy to remove a temp dir; no-op when using local templates. */
  cleanup: () => Promise<void>;
};

/**
 * Resolves the template directory for scaffolding.
 * - In dev mode: uses local templates/.
 * - Otherwise: fetches DEFAULT_TEMPLATE_REPO (e.g. buidler-labs/scaffold-eth-2#dev) to a temp dir.
 *   (Community templates are fetched separately in copyTemplateFiles; this provides the base layer.)
 */
export async function getTemplateDirectory(
  options: Options,
  localTemplatesPath: string,
): Promise<TemplateDirectoryResult> {
  if (options.dev) {
    return { templateDir: localTemplatesPath, cleanup: async () => {} };
  }

  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "create-hbar-template-"));
  await downloadTemplate(`gh:${DEFAULT_TEMPLATE_REPO}`, { dir: tmpDir });

  return {
    templateDir: tmpDir,
    cleanup: async () => {
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
    },
  };
}
