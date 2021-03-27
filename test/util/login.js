async function login(page) {
	await page.type("input[type='email']", 'sevkioruc@g.com');
	await page.type("input[type='password']", '123456789');

	await page.click('.btn-primary');
}

module.exports = { login };
