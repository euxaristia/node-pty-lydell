import childProcess from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [, , topTag, ...restArgs] = process.argv;

if (topTag === undefined) {
  console.error(
    "You must pass the wanted tag name for the top npm package as the only argument."
  );
  process.exit(1);
}

if (restArgs.length !== 0) {
  console.error(`Expected exactly one argument, but got: ${restArgs.length}`);
  process.exit(1);
}

const VARIANTS = fs.readdirSync(
  path.join(import.meta.dirname, "node_modules", "node-pty", "prebuilds")
);

for (const dir of [...VARIANTS, "top"]) {
  console.info();
  console.info(dir);

  const tag = dir === "top" ? topTag : "latest";
  const publishResult = childProcess.spawnSync(
    "npm",
    ["publish", "--access=public", `--tag=${tag}`],
    {
      cwd: path.join(import.meta.dirname, "packages", dir),
      stdio: "inherit",
    }
  );
  if (publishResult.status !== 0) {
    process.exit(publishResult.status);
  }
}
