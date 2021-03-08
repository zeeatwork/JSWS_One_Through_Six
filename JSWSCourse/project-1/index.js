const Sheet = require('./sheet');
const fetch = require('node-fetch');

async function scrapePage(i) {
  const res = await fetch(
    `https://jobs.github.com/positions.json?page=${i}&search=code`
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
  return rows;
}

(async function() {
  let i = 1;
  let rows = [];
  while(true) {
    const newRows = await scrapePage(i);
    console.log("New Row Length", newRows.length);
    if (newRows.length === 0) break;
    rows = rows.concat(newRows);
    i++;
  }
//add sorting function
//additional filter by keyword (string method includes)
  console.log("Total Row Length", rows.length);

  const sheet = new Sheet();
  await sheet.load();
  await sheet.addRows(rows);
})()




// (async function() {
//   const res = await fetch(
//     "https://jobs.github.com/positions.json?page=20&search=code"
//   );
//   const json = await res.json();
  
//   const rows = json.map(job => {
//     return {
//       Company: job.company,
//       Title: job.title,
//       Location: job.location,
//       Date: job.created_at,
//       URL: job.url,
//     }
//   })
//   // const sheet = new Sheet();
//   // await sheet.load();

//   // await sheet.addRows(rows);

//   // console.log(rows.length, 'length')
// })()