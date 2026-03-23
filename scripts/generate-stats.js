```js
const fs = require("fs");
const https = require("https");

const username = "Uday-KiranK";

function fetchRepos(page) {
  return new Promise((resolve, reject) => {
    https.get(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
      {
        headers: {
          "User-Agent": "node"
        }
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }
    ).on("error", reject);
  });
}

async function getStats() {
  let page = 1;
  let totalRepos = 0;

  while (true) {
    const data = await fetchRepos(page);

    if (!Array.isArray(data) || data.length === 0) break;

    totalRepos += data.length;
    page++;
  }

  let svg = fs.readFileSync("svgs/stats-template.svg", "utf-8");
  svg = svg.replace("{{REPO_COUNT}}", totalRepos.toString());

  fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();
```
