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
const csv_array = [];

results.reduce((listResult, item) => {
  return item.suites.reduce((listSuite, suite) => {
    return suite.tests.reduce((listTest, test) => {
      const output = {
        title: test.fullTitle,
        passes: test.state,
        duration: test.duration,
      };
      csv_array.push(output);
    }, []);
  }, []);
}, []);

csv
  .writeRecords(csv_array)
  .then(() => console.log('The CSV file was written successfully'));
