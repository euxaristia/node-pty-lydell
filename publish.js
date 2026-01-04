import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const VARIANTS = fs.readdirSync(
  path.join(import.meta.dirname, "node_modules", "node-pty", "prebuilds")
);

for (const dir of [...VARIANTS, "top"]) {
  console.info();
  console.info(dir);

  const publishResult = childProcess.spawnSync(
    "npm",
    ["publish", "--access=public"],
    {
      cwd: path.join(import.meta.dirname, "packages", dir),
      stdio: "inherit",
    }
  );
  if (publishResult.status !== 0) {
    process.exit(publishResult.status);
  }
}
