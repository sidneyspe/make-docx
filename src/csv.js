import { createObjectCsvWriter } from 'csv-writer';

import * as data from '../input/data.json';

const csv = createObjectCsvWriter({
  path: './output/out.csv',
  header: [
    { id: 'title', title: 'Title' },
    { id: 'passes', title: 'Passes' },
    { id: 'duration', title: 'Duration' },
  ],
});

const { results } = data;

const rows_suite = results.map(item =>
  item.suites.map(suite => {
    return {
      title: suite.title,
      passes: suite.passes,
      duration: suite.duration,
    };
  })
);

const array = [];
for (const key in rows_suite) {
  if (Object.keys(rows_suite[key]).length > 1) {
    for (const k in rows_suite[key]) {
      array.push(rows_suite[key][k]);
    }
  } else {
    array.push(rows_suite[key][0]);
  }
}

console.log('array', array);

csv
  .writeRecords(array)
  .then(() => console.log('The CSV file was written successfully'));
