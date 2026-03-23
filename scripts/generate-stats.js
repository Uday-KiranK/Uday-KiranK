import fs from "fs";

const username = "Uday-KiranK";

async function getStats() {
  // Fetch repos
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  const reposData = await reposRes.json();

  const repoCount = reposData.length;

  // Load template
  let svg = fs.readFileSync("svgs/stats-template.svg", "utf-8");

  // Replace values
  svg = svg.replaceAll("{{TOTAL_CONTRIBUTIONS}}", "N/A");
  svg = svg.replaceAll("{{REPOS_CREATED}}", repoCount.toString());
  svg = svg.replaceAll("{{CURRENT_STREAK}}", "N/A");
  svg = svg.replaceAll("{{COMMITS_THIS_YEAR}}", "N/A");
  svg = svg.replaceAll("{{LONGEST_STREAK}}", "N/A");
  svg = svg.replaceAll("{{PULL_REQUESTS}}", "N/A");

  fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();
