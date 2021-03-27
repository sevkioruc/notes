const puppeteer = require('puppeteer');
const { login } = require('./util/login');
const { createNote } = require('./util/note');

let browser, page;
beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false
	});
	page = await browser.newPage();
	await page.goto('http://localhost:3000');
});

test('Should text equal to Save when opened note dialog for new note', async () => {
	await login(page);

	await page.waitForSelector(".create");
	await page.click(".create");

	await page.waitForSelector(".save-btn");
	const buttonText = await page.$eval('.save-btn', el => el.innerText);

	expect(buttonText).toEqual('Save');
});

test('Should be able save new note', async () => {
	await login(page);

	await page.waitForSelector(".create");

	const previousNotes = await page.$$('.card');

	await createNote(page);

	await page.waitForTimeout(2000);

	const currentNotes = await page.$$('.card');

	expect(currentNotes.length - previousNotes.length).toEqual(1);
});

test('Should text equal to Update when clicked Detail button on note', async () => {
	await login(page);

	await page.waitForSelector('.detail-button');
	await page.click('.detail-button');

	await page.waitForSelector('.update-btn');

	const buttonText = await page.$eval('.update-btn', el => el.innerText);
	expect(buttonText).toEqual('Update');
});

test('Should correctly selected note detail', async () => {
	await login(page);

	await page.waitForSelector('.detail-button');
	await page.click('.detail-button');

	const titleValue = await page.$eval('.title', el => el.value);
	const contentValue = await page.$eval('.note-area', el => el.value);

	expect(titleValue).toEqual('Note was created by Puppeteer');
	expect(contentValue).toEqual('Dummy note content');
});

afterEach(async () => {
	await browser.close();
});
