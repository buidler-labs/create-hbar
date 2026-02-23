import { describe, it, expect } from "vitest";
import {
  SOLIDITY_FRAMEWORKS,
  TEMPLATES,
  FRONTENDS,
  SOLIDITY_FRAMEWORK_OPTIONS,
  WALLETS,
  NETWORKS,
  PACKAGE_MANAGERS,
  BRAND_COLORS,
  DEFAULT_OPTIONS,
  EXIT_CODES,
  HEDERA_NETWORKS,
  BASE_DIR,
  SOLIDITY_FRAMEWORKS_DIR,
  EXAMPLE_CONTRACTS_DIR,
  GLOBAL_ARGS_DEFAULTS,
} from "../../src/utils/consts";

describe("backward-compatible constants", () => {
  it("SOLIDITY_FRAMEWORKS retains the original object shape", () => {
    expect(SOLIDITY_FRAMEWORKS.HARDHAT).toBe("hardhat");
    expect(SOLIDITY_FRAMEWORKS.FOUNDRY).toBe("foundry");
  });

  it("directory name constants are unchanged", () => {
    expect(BASE_DIR).toBe("base");
    expect(SOLIDITY_FRAMEWORKS_DIR).toBe("solidity-frameworks");
    expect(EXAMPLE_CONTRACTS_DIR).toBe("example-contracts");
  });

  it("GLOBAL_ARGS_DEFAULTS has solidityFramework empty string", () => {
    expect(GLOBAL_ARGS_DEFAULTS.solidityFramework).toBe("");
  });
});

describe("HEDERA_NETWORKS", () => {
  it("testnet has chain ID 296", () => {
    expect(HEDERA_NETWORKS.testnet.chainId).toBe(296);
  });

  it("mainnet has chain ID 295", () => {
    expect(HEDERA_NETWORKS.mainnet.chainId).toBe(295);
  });

  it("local has chain ID 298", () => {
    expect(HEDERA_NETWORKS.local.chainId).toBe(298);
  });

  it("testnet RPC URL points to Hashio testnet relay", () => {
    expect(HEDERA_NETWORKS.testnet.rpcUrl).toBe("https://testnet.hashio.io/api");
  });

  it("mainnet RPC URL points to Hashio mainnet relay", () => {
    expect(HEDERA_NETWORKS.mainnet.rpcUrl).toBe("https://mainnet.hashio.io/api");
  });

  it("local RPC URL points to localhost JSON-RPC port", () => {
    expect(HEDERA_NETWORKS.local.rpcUrl).toBe("http://localhost:7546");
  });

  it("local mirror URL points to localhost mirror port", () => {
    expect(HEDERA_NETWORKS.local.mirrorUrl).toBe("http://localhost:5551/api/v1");
  });
});

describe("EXIT_CODES", () => {
  it("SUCCESS is 0", () => expect(EXIT_CODES.SUCCESS).toBe(0));
  it("GENERIC is 1", () => expect(EXIT_CODES.GENERIC).toBe(1));
  it("BAD_ARGS is 2", () => expect(EXIT_CODES.BAD_ARGS).toBe(2));
  it("DIR_CONFLICT is 3", () => expect(EXIT_CODES.DIR_CONFLICT).toBe(3));
  it("NETWORK_ERROR is 4", () => expect(EXIT_CODES.NETWORK_ERROR).toBe(4));
  it("INSTALL_FAILED is 5", () => expect(EXIT_CODES.INSTALL_FAILED).toBe(5));
  it("CANCELLED is 130 (SIGINT standard)", () => expect(EXIT_CODES.CANCELLED).toBe(130));
  it("all codes are unique", () => {
    const codes = Object.values(EXIT_CODES);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe("BRAND_COLORS", () => {
  it("hederaTeal is the correct Hedera brand hex", () => {
    expect(BRAND_COLORS.hederaTeal).toBe("#0031FF");
  });

  it("hederaPurple is the correct Hedera accent hex", () => {
    expect(BRAND_COLORS.hederaPurple).toBe("#8259EF");
  });

  it("all color values start with #", () => {
    for (const color of Object.values(BRAND_COLORS)) {
      expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe("TEMPLATES", () => {
  it("includes the blank starter", () => {
    expect(TEMPLATES.map(t => t.value)).toContain("blank");
  });

  it("includes all five built-in templates", () => {
    const values = TEMPLATES.map(t => t.value);
    expect(values).toContain("blank");
    expect(values).toContain("hts-fungible");
    expect(values).toContain("hts-nft");
    expect(values).toContain("hcs-dao");
    expect(values).toContain("defi-swap");
  });

  it("every template has a non-empty label", () => {
    for (const t of TEMPLATES) {
      expect(t.label.length).toBeGreaterThan(0);
    }
  });
});

describe("FRONTENDS", () => {
  it("includes nextjs-app as the first option", () => {
    expect(FRONTENDS[0].value).toBe("nextjs-app");
  });

  it("includes the none option for contracts-only scaffolds", () => {
    expect(FRONTENDS.map(f => f.value)).toContain("none");
  });
});

describe("SOLIDITY_FRAMEWORK_OPTIONS", () => {
  it("lists foundry before hardhat", () => {
    expect(SOLIDITY_FRAMEWORK_OPTIONS[0].value).toBe("foundry");
    expect(SOLIDITY_FRAMEWORK_OPTIONS[1].value).toBe("hardhat");
  });

  it("includes a none option", () => {
    expect(SOLIDITY_FRAMEWORK_OPTIONS.map(sf => sf.value)).toContain("none");
  });
});

describe("WALLETS", () => {
  it("does not include hashconnect (deprecated as of 2026)", () => {
    expect(WALLETS.map(w => w.value)).not.toContain("hashconnect");
  });

  it("includes walletconnect as the first option", () => {
    expect(WALLETS[0].value).toBe("walletconnect");
  });

  it("includes metamask", () => {
    expect(WALLETS.map(w => w.value)).toContain("metamask");
  });
});

describe("NETWORKS", () => {
  it("lists testnet first", () => {
    expect(NETWORKS[0].value).toBe("testnet");
  });

  it("includes local node option", () => {
    expect(NETWORKS.map(n => n.value)).toContain("local");
  });
});

describe("PACKAGE_MANAGERS", () => {
  it("lists all four package managers", () => {
    const values = PACKAGE_MANAGERS.map(pm => pm.value);
    expect(values).toContain("npm");
    expect(values).toContain("pnpm");
    expect(values).toContain("yarn");
    expect(values).toContain("bun");
  });
});

describe("DEFAULT_OPTIONS", () => {
  it("defaults to testnet network", () => {
    expect(DEFAULT_OPTIONS.network).toBe("testnet");
  });

  it("defaults to walletconnect wallet", () => {
    expect(DEFAULT_OPTIONS.wallet).toContain("walletconnect");
  });

  it("defaults to blank template", () => {
    expect(DEFAULT_OPTIONS.template).toBe("blank");
  });

  it("defaults install to true", () => {
    expect(DEFAULT_OPTIONS.install).toBe(true);
  });

  it("default project name is my-hedera-dapp", () => {
    expect(DEFAULT_OPTIONS.project).toBe("my-hedera-dapp");
  });
});
