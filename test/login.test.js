const puppeteer = require('puppeteer');
const { login } = require('./util/login');

let browser, page;
beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: true
	});
	page = await browser.newPage();
	await page.goto('http://localhost:3000');
});

test('We can launch a browser', async () => {
	const text = await page.$eval('.login', el => el.innerText);
	expect(text).toEqual('Login');
});

test('Should be able authenticate user', async () => {
	await login(page);

	await page.waitForSelector(".create");

	const text = await page.$eval('.create', el => el.innerText);

	expect(text).toEqual('Create');
});

afterEach(async () => {
	await browser.close();
});
