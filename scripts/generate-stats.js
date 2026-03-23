import fs from "fs";

const username = "Uday-KiranK";

async function getStats() {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  const stats = {
    repos: data.public_repos,
  };

  // You can expand later with more APIs

  const svg = `
<svg width="860" height="200" viewBox="0 0 860 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="860" height="200" rx="12" fill="#0d0d0d"/>
  <text x="60" y="105" font-family="monospace" font-size="20" fill="#6ee600">${stats.repos}</text>
</svg>
`;

  fs.writeFileSync("svgs/stats.svg", svg);
}

getStats();