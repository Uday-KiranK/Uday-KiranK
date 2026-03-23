import fs from "fs";

const username = "Uday-KiranK";

async function getStats() {
// 🔥 fetch ALL repos (not just first page)
let page = 1;
let allRepos = [];

while (true) {
const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`);
const data = await res.json();

```
if (data.length === 0) break;

allRepos = allRepos.concat(data);
page++;
```

}

const repoCount = allRepos.length;

// load template
let svg = fs.readFileSync("svgs/stats-template.svg", "utf-8");

// replace values
svg = svg.replaceAll("{{TOTAL_CONTRIBUTIONS}}", "--");
svg = svg.replaceAll("{{REPOS_CREATED}}", repoCount.toString());
svg = svg.replaceAll("{{CURRENT_STREAK}}", "--");
svg = svg.replaceAll("{{COMMITS_THIS_YEAR}}", "--");
svg = svg.replaceAll("{{LONGEST_STREAK}}", "--");
svg = svg.replaceAll("{{PULL_REQUESTS}}", "--");

fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();
