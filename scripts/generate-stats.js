import fs from "fs";

const username = "Uday-KiranK";

async function getStats() {
  // 🔥 Fetch basic data
  const res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();

  // 👉 Load your SVG template (IMPORTANT)
  let svg = fs.readFileSync("svgs/stats.svg", "utf-8");

  // 🔥 Replace values (for now some static placeholders)
  svg = svg.replaceAll("{{TOTAL_CONTRIBUTIONS}}", "N/A");
  svg = svg.replaceAll("{{REPOS_CREATED}}", user.public_repos.toString());
  svg = svg.replaceAll("{{CURRENT_STREAK}}", "N/A");
  svg = svg.replaceAll("{{COMMITS_THIS_YEAR}}", "N/A");
  svg = svg.replaceAll("{{LONGEST_STREAK}}", "N/A");
  svg = svg.replaceAll("{{PULL_REQUESTS}}", "N/A");

  // 👉 Write final SVG
  fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();
