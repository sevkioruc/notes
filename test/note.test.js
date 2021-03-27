const puppeteer = require('puppeteer');
const { login } = require('./util/login');
const { createNote, updateNote } = require('./util/note');

let browser, page;
beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: true
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

test('Should user be able to update the note', async () => {
	await login(page);

	await updateNote(page);

	await page.waitForTimeout(2000);

	const updatedTitleValue = await page.$eval('.card-header', el => el.innerText);
	const updatedContentValue = await page.$eval('.content', el => el.innerText);

	expect(updatedTitleValue).toEqual('Updated note title');
	expect(updatedContentValue).toEqual('Updated note content');
});

test('Should user be able to remove the note', async () => {
	await login(page);

	await page.waitForSelector('.remove-button');
	await page.click('.remove-button');

	await page.waitForTimeout(2000);

	const currentNotes = await page.$$('.card');

	expect(currentNotes.length).toEqual(0);
});

afterEach(async () => {
	await browser.close();
});
