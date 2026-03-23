import fs from "fs";

const username = "Uday-KiranK";

async function getStats() {
  let page = 1;
  let totalRepos = 0;

  while (true) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) break;

    totalRepos += data.length;
    page++;
  }

  let svg = fs.readFileSync("svgs/stats-template.svg", "utf-8");
  svg = svg.replace("{{REPO_COUNT}}", totalRepos.toString());

  fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();
