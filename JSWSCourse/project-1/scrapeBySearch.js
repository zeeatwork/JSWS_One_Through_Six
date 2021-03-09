const Sheet = require("./sheet");
const fetch = require("node-fetch");

(async function () {
  const res = await fetch(
    "https://jobs.github./positions.json?description=node&location=remote"
  );
  const json = await res.json();

  const rows = json.map((job) => {
    return {
      Company: job.company,
      Title: job.title,
      Location: job.location,
      Date: job.created_at,
      URL: job.url,
    };
  });
  const sheet = new Sheet();
  await sheet.load();

  await sheet.addRows(rows);

  console.log(rows.length, "length");
})();
