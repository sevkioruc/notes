async function createNote(page) {
	await page.click(".create");

	await page.waitForSelector(".title");

	await page.type('.title', 'Note was created by Puppeteer');
	await page.type('.note-area', 'Dummy note content');

	await page.click(".save-btn");
}

async function updateNote(page) {
	await page.waitForSelector('.detail-button');
	await page.click('.detail-button');

	await page.waitForSelector('.title');

	await page.evaluate(() => document.querySelector('.title').value = "")
	await page.evaluate(() => document.querySelector(".note-area").value = "")

	await page.type('.title', 'Updated note title');
	await page.type('.note-area', 'Updated note content');

	await page.waitForSelector('.update-btn');
	await page.click('.update-btn');
}

module.exports = { createNote, updateNote };
