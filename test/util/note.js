async function createNote(page) {
	await page.click(".create");

	await page.waitForSelector(".title");

	await page.type('.title', 'Note was created by Puppeteer');
	await page.type('.note-area', 'Dummy note content');

	await page.click(".save-btn");
}

module.exports = { createNote };
