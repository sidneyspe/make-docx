import * as fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Create document
const doc = new Document();

// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
doc.addSection({
  properties: {},
  children: [
    new Paragraph({
      children: [
        new TextRun('Hello World'),
        new TextRun({
          text: 'Foo Bar',
          bold: true,
        }),
        new TextRun({
          text: '\tGithub is the best',
          bold: true,
        }),
      ],
    }),
  ],
});

// Used to export the file into a .docx file
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('output/report.docx', buffer);
});

// Done! A file called 'My First Document.docx' will be in your file system.
