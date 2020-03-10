/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as fs from 'fs';
import moment from 'moment';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';

import * as data from '../input/data.json';

const { stats, results, meta } = data;

const rows_suite = results.map(item =>
  item.suites.map(suite => {
    return new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(suite.title)],
        }),
        new TableCell({
          children: [new Paragraph(suite.passes)],
        }),
        new TableCell({
          children: [new Paragraph(suite.duration)],
        }),
      ],
    });
  })
);

// console.dir(rows_suite);
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
// Create document
const doc = new Document();

const table = new Table({
  rows: array,
});

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
doc.addSection({
  properties: {},
  children: [
    new Paragraph({ text: `Executed Suites: ${stats.suites}` }),
    new Paragraph({ text: `Executed Tests: ${stats.tests}` }),
    new Paragraph({ text: `Passed: ${stats.passes}` }),
    new Paragraph({ text: `Failures: ${stats.failures}` }),
    new Paragraph({
      text: `Started Time: ${moment(stats.start).format(
        'DD/MM/YYYY, h:mm:ss a'
      )}`,
    }),
    new Paragraph({
      text: `Ended Time: ${moment(stats.end).format('DD/MM/YYYY, h:mm:ss a')}`,
    }),
    new Paragraph({ text: `Duration: ${moment(stats.duration)}` }),
    table,
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('output/report.docx', buffer);
});

// Done! A file called 'My First Document.docx' will be in your file system.
