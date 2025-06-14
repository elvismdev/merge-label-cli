#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { program } = require('commander');

program
	.requiredOption('--logo <path>', 'Path to logo image (JPG or PNG)')
	.requiredOption('--label <path>', 'Path to 4x6 shipping label PDF')
	.requiredOption('--output <path>', 'Output PDF path (4x8 layout)')
	.parse(process.argv);

const options = program.opts();

(async () => {
	try {
		// Load logo and label files
		const logoBytes = fs.readFileSync(path.resolve(options.logo));
		const labelBytes = fs.readFileSync(path.resolve(options.label));

		const pdfDoc = await PDFDocument.create();
		const pageWidth = 4 * 72;
		const pageHeight = 8 * 72;
		const page = pdfDoc.addPage([pageWidth, pageHeight]);

		// Embed the logo
		let logoImage;
		if (options.logo.toLowerCase().endsWith('.png')) {
			logoImage = await pdfDoc.embedPng(logoBytes);
		} else {
			logoImage = await pdfDoc.embedJpg(logoBytes);
		}

		const horizontalPadding = 0.25 * 72; // 0.25 inch padding on left and right
        const maxLogoWidth = pageWidth - (2 * horizontalPadding);
        const logoDims = logoImage.scaleToFit(maxLogoWidth, 2 * 72);

        page.drawImage(logoImage, {
            x: (pageWidth - logoDims.width) / 2, // center horizontally
            y: pageHeight - logoDims.height - ((2 * 72 - logoDims.height) / 2),
            width: logoDims.width,
            height: logoDims.height,
        });

		// Load and place the shipping label
		const labelPdf = await PDFDocument.load(labelBytes);
		const [labelPage] = await labelPdf.getPages();
        const embeddedPage = await pdfDoc.embedPage(labelPage);

        page.drawPage(embeddedPage, {
            x: 0,
            y: 0,
            width: pageWidth,
            height: 6 * 72,
        });


		const pdfBytes = await pdfDoc.save();
		fs.writeFileSync(path.resolve(options.output), pdfBytes);
		console.log(`✅ Created: ${options.output}`);
	} catch (err) {
		console.error('❌ Error:', err.message);
		process.exit(1);
	}
})();
