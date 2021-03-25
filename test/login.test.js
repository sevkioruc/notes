const puppeteer = require('puppeteer');

let browser, page;
beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false
	});
	page = await browser.newPage();
	await page.goto('http://localhost:3000');
});

test('We can launch a browser', async () => {
	const text = await page.$eval('.login', el => el.innerText);
	expect(text).toEqual('Login');
});

afterEach(async () => {
	await browser.close();
});
