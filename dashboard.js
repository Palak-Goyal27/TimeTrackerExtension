const PRODUCTIVE_SITES = ["leetcode.com", "github.com", "stackoverflow.com"];
const UNPRODUCTIVE_SITES = ["youtube.com", "facebook.com", "instagram.com"];

chrome.storage.local.get("sites", ({ sites }) => {
  const report = document.getElementById("report");
  let productive = 0, unproductive = 0;

  for (let [domain, seconds] of Object.entries(sites || {})) {
    const minutes = (seconds / 60).toFixed(1);
    const type = PRODUCTIVE_SITES.includes(domain) ? "Productive" :
                 UNPRODUCTIVE_SITES.includes(domain) ? "Unproductive" : "Neutral";

    if (type === "Productive") productive += seconds;
    else if (type === "Unproductive") unproductive += seconds;

    report.innerHTML += `<p><strong>${domain}</strong>: ${minutes} mins (${type})</p>`;
  }

  const total = productive + unproductive;
  const score = total ? ((productive / total) * 100).toFixed(1) : 0;
  report.innerHTML += `<hr><p><strong>Productivity Score:</strong> ${score}%</p>`;
});
